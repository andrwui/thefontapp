package scanner

import (
	"fmt"
	"io/fs"
	"os"
	"path/filepath"
	"strings"

	"golang.org/x/image/font/sfnt"
	"thefontapp/internal/constants"
	"thefontapp/internal/helper/paths"

	lfm "thefontapp/internal/font/local/model"
)

func GetLocalFonts() []lfm.FontFamily {

	fmt.Print("loading fonts\n")

	fontVariants := scanFontVariants(constants.FontDirs)

	fontFamilyMap := make(map[string][]lfm.FontVariant)

	for _, font := range fontVariants {
		fontFamilyMap[font.FamilyName] = append(fontFamilyMap[font.FamilyName], font)
	}

	var fontFamilies []lfm.FontFamily
	for familyName, variants := range fontFamilyMap {

		hasReadonly := false

		for _, variant := range variants {
			if variant.Readonly {
				hasReadonly = true
			}
		}

		fontFamilies = append(fontFamilies, lfm.FontFamily{
			Name:        familyName,
			Variants:    variants,
			HasReadonly: hasReadonly,
		})
	}
	return fontFamilies
}

func scanFontVariants(dirs []string) []lfm.FontVariant {
	var fonts []lfm.FontVariant
	for _, dir := range dirs {

		if strings.Contains(dir, "~/") {
			dir = paths.ExpandHomeDir(dir)
		}
		err := filepath.Walk(dir, func(path string, info fs.FileInfo, err error) error {
			if err != nil {
				fmt.Printf("[LOG] Error accessing path %s: %v\n", path, err)
				return nil
			}

			if !info.IsDir() {
				if font, err := parseFont(path); err == nil {
					fonts = append(fonts, font)
				}
			}
			return nil
		})
		if err != nil {
			fmt.Printf("Error walking directory %s: %v\n", dir, err)
		}
	}
	return fonts
}

func parseFont(path string) (lfm.FontVariant, error) {
	file, err := os.Open(path)
	if err != nil {
		return lfm.FontVariant{}, err
	}
	defer file.Close()

	stat, err := file.Stat()
	if err != nil {
		return lfm.FontVariant{}, err
	}

	if stat.IsDir() {
		return lfm.FontVariant{}, fmt.Errorf("not a font file")
	}

	data := make([]byte, stat.Size())
	if _, err := file.Read(data); err != nil {
		return lfm.FontVariant{}, err
	}

	fnt, err := sfnt.Parse(data)
	if err != nil {
		return lfm.FontVariant{}, err
	}

	var family string

	family, err = fnt.Name(nil, sfnt.NameIDTypographicFamily)
	if err != nil {

		family, err = fnt.Name(nil, sfnt.NameIDFamily)
		if err != nil {
			return lfm.FontVariant{}, err
		}
	}

	var subfamily string

	subfamily, err = fnt.Name(nil, sfnt.NameIDTypographicSubfamily)
	if err != nil {

		subfamily, err = fnt.Name(nil, sfnt.NameIDSubfamily)
		if err != nil {
			return lfm.FontVariant{}, err
		}

	}

	return lfm.FontVariant{
		VariantName: string(subfamily),
		FamilyName:  string(family),
		Path:        path,
		Readonly:    strings.HasPrefix(path, "/usr/"),
	}, nil
}

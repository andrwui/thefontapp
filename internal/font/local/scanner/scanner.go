package scanner

import (
	"errors"
	"io/fs"
	"os"
	"path/filepath"
	"strings"

	"thefontapp/internal/helper"

	"golang.org/x/image/font/sfnt"

	lfm "thefontapp/internal/font/local/model"
)

func ScanFontFamilies(dir string) ([]lfm.FontFamily, error) {

	fontVariants, err := ScanFontVariants(dir)
	if err != nil {
		return nil, err
	}

	fontFamilyMap := make(map[string][]lfm.FontVariant)

	for _, font := range fontVariants {
		fontFamilyMap[font.FamilyName] = append(fontFamilyMap[font.FamilyName], font)
	}

	var fontFamilies []lfm.FontFamily

	for familyName, variants := range fontFamilyMap {

		hasReadonly := false
		italicWeigths := make([]int, 0)

		for _, variant := range variants {
			if variant.Readonly {
				hasReadonly = true
			}
			//todo
			italicWeigths = append(italicWeigths)

		}

		fontFamilies = append(fontFamilies, lfm.FontFamily{
			Name:        familyName,
			Variants:    variants,
			HasReadonly: hasReadonly,
		})
	}
	return fontFamilies, nil
}

func ScanFontVariants(dir string) ([]lfm.FontVariant, error) {

	fonts := make([]lfm.FontVariant, 0)

	dir = helper.ExpandHomeDir(dir)

	err := filepath.Walk(dir, func(path string, info fs.FileInfo, err error) error {
		if err != nil {
			return err
		}

		if !info.IsDir() {

			font, err := parseFont(path)

			if err != nil {
				return nil
			}

			fonts = append(fonts, font)
		}

		return nil
	})
	if err != nil {
		return nil, err
	}

	return fonts, nil
}

func parseFont(path string) (lfm.FontVariant, error) {

	if filepath.Ext(path) != ".ttf" && filepath.Ext(path) != ".otf" {
		return lfm.FontVariant{}, errors.New("Not a ttf or otf font")
	}

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
		return lfm.FontVariant{}, errors.New("not a font file")
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

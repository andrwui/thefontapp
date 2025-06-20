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
		italicWeights := make([]int, 0)
		weights := make([]int, 0)

		for _, variant := range variants {
			if variant.Readonly {
				hasReadonly = true
			}

			weight := fontWeight(variant.VariantName)
			if strings.Contains(strings.ToLower(variant.VariantName), "italic") {
				italicWeights = append(italicWeights, weight)
			} else {
				weights = append(weights, weight)
			}
		}

		fontFamilies = append(fontFamilies, lfm.FontFamily{
			Name:                   familyName,
			Variants:               variants,
			HasReadonly:            hasReadonly,
			AvailableWeights:       weights,
			AvailableItalicWeights: italicWeights,
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

func fontWeight(variant string) int {
	v := strings.ToLower(variant)
	switch {
	case strings.Contains(v, "thin"):
		return 100
	case strings.Contains(v, "extralight"), strings.Contains(v, "ultralight"):
		return 200
	case strings.Contains(v, "light"):
		return 300
	case strings.Contains(v, "regular"), strings.Contains(v, "normal"):
		return 400
	case strings.Contains(v, "medium"):
		return 500
	case strings.Contains(v, "semibold"), strings.Contains(v, "demibold"):
		return 600
	case strings.Contains(v, "bold"):
		return 700
	case strings.Contains(v, "extrabold"), strings.Contains(v, "ultrabold"), strings.Contains(v, "heavy"):
		return 800
	case strings.Contains(v, "black"), strings.Contains(v, "heavyblack"):
		return 900
	default:
		return 400
	}
}

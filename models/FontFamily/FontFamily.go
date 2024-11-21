package fontfamily

import (
	"fmt"
	"io/fs"
	"os"
	"path/filepath"
	"strings"
	"thefontapp/helper"

	"golang.org/x/image/font/sfnt"
)

type FontVariant struct {
	VariantName string `json:"name"`
	FamilyName  string
	Path        string `json:"path"`
	Readonly    bool   `json:"readonly"`
}

type FontFamily struct {
	Id                     int           `json:"id"`
	Name                   string        `json:"name"`
	Variants               []FontVariant `json:"variants"`
	AvailableWeights       []int         `json:"availableWeights"`
	AvailableItalicWeights []int         `json:"availableItalicWeights"`
	HasReadonly            bool          `json:"hasReadonly"`
}

func (ff *FontFamily) GetName() string {
	return ff.Name
}

func FindFonts(dirs []string) []FontVariant {
	var fonts []FontVariant
	for _, dir := range dirs {

		if strings.Contains(dir, "~/") {
			dir = helper.ExpandHomeDir(dir)
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

func parseFont(path string) (FontVariant, error) {
	file, err := os.Open(path)
	if err != nil {
		return FontVariant{}, err
	}
	defer file.Close()

	stat, err := file.Stat()
	if err != nil {
		return FontVariant{}, err
	}

	if stat.IsDir() {
		return FontVariant{}, fmt.Errorf("not a font file")
	}

	data := make([]byte, stat.Size())
	if _, err := file.Read(data); err != nil {
		return FontVariant{}, err
	}

	fnt, err := sfnt.Parse(data)
	if err != nil {
		return FontVariant{}, err
	}

	family, err := fnt.Name(nil, sfnt.NameIDFamily)
	if err != nil {
		return FontVariant{}, err
	}

	subfamily, err := fnt.Name(nil, sfnt.NameIDSubfamily)
	if err != nil {
		return FontVariant{}, err
	}

	return FontVariant{
		VariantName: string(subfamily),
		FamilyName:  string(family),
		Path:        path,
		Readonly:    strings.HasPrefix(path, "/usr/"),
	}, nil
}

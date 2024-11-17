package main

import (
	"context"
	"fmt"
	"io"
	"io/fs"
	"os"
	"path/filepath"
	"slices"
	"strings"

	"golang.org/x/image/font/sfnt"

	"thefontapp/models"
)

type App struct {
	ctx context.Context
}

func NewApp() *App {
	return &App{}
}

func (a *App) startup(ctx context.Context) {
	a.ctx = ctx
}

func (a *App) GetFonts() []models.FontFamily {
	fontDirs := []string{
		"/usr/share/fonts",
		"/usr/local/share/fonts",
		"~/.fonts",
		"~/.local/share/fonts",
	}

	fontVariants := findFonts(fontDirs)

	fontFamilyMap := make(map[string][]models.FontVariant)

	for _, font := range fontVariants {
		fontFamilyMap[font.FamilyName] = append(fontFamilyMap[font.FamilyName], font)
	}

	var fontFamilies []models.FontFamily
	for familyName, variants := range fontFamilyMap {

		hasReadonly := false

		for _, variant := range variants {
			if variant.Readonly {
				hasReadonly = true
			}
		}

		weights := map[string]int{
			"thin":               100,
			"hairline":           100,
			"extralight":         200,
			"ultralight":         200,
			"light":              300,
			"normal":             400,
			"regular":            400,
			"italic":             400,
			"medium":             500,
			"semibold":           600,
			"demibold":           600,
			"bold":               700,
			"extrabold":          800,
			"ultrabold":          800,
			"black":              900,
			"heavy":              900,
			"extra light":        200,
			"ultra light":        200,
			"semi bold":          600,
			"demi bold":          600,
			"extra bold":         800,
			"ultra bold":         800,
			"thin italic":        100,
			"hairline italic":    100,
			"extralight italic":  200,
			"ultralight italic":  200,
			"light italic":       300,
			"normal italic":      400,
			"medium italic":      500,
			"semibold italic":    600,
			"demibold italic":    600,
			"bold italic":        700,
			"extrabold italic":   800,
			"ultrabold italic":   800,
			"black italic":       900,
			"heavy italic":       900,
			"extra light italic": 200,
			"ultra light italic": 200,
			"semi bold italic":   600,
			"demi bold italic":   600,
			"extra bold italic":  800,
			"ultra bold italic":  800,
		}

		var availableWeights []int
		var availableItalicWeights []int
		for _, variant := range variants {
			variantName := strings.ToLower(variant.VariantName)

			val, ok := weights[variantName]

			if ok {
				availableWeights = append(availableWeights, val)
				if strings.Contains(variantName, "italic") {
					availableItalicWeights = append(availableItalicWeights, val)
				}
			}

		}
		slices.Sort(availableWeights)
		fontFamilies = append(fontFamilies, models.FontFamily{
			Name:                   familyName,
			Variants:               variants,
			AvailableWeights:       slices.Compact(availableWeights),
			AvailableItalicWeights: availableItalicWeights,
			HasReadonly:            hasReadonly,
		})
	}

	return fontFamilies
}

func findFonts(dirs []string) []models.FontVariant {
	var fonts []models.FontVariant
	for _, dir := range dirs {
		dir = expandHomeDir(dir)
		err := filepath.Walk(dir, func(path string, info fs.FileInfo, err error) error {
			if err != nil {
				fmt.Printf("Error accessing path %s: %v\n", path, err)
				return nil // Continue walking the directory tree
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

func expandHomeDir(path string) string {
	if path[:2] == "~/" {
		home, _ := os.UserHomeDir()
		return filepath.Join(home, path[2:])
	}
	return path
}

func parseFont(path string) (models.FontVariant, error) {
	file, err := os.Open(path)
	if err != nil {
		return models.FontVariant{}, err
	}
	defer file.Close()

	stat, err := file.Stat()
	if err != nil {
		return models.FontVariant{}, err
	}

	if stat.IsDir() {
		return models.FontVariant{}, fmt.Errorf("not a font file")
	}

	data := make([]byte, stat.Size())
	if _, err := file.Read(data); err != nil {
		return models.FontVariant{}, err
	}

	fnt, err := sfnt.Parse(data)
	if err != nil {
		return models.FontVariant{}, err
	}

	family, err := fnt.Name(nil, sfnt.NameIDFamily)
	if err != nil {
		return models.FontVariant{}, err
	}

	subfamily, err := fnt.Name(nil, sfnt.NameIDSubfamily)
	if err != nil {
		return models.FontVariant{}, err
	}

	return models.FontVariant{
		VariantName: string(subfamily),
		FamilyName:  string(family),
		Path:        path,
		Readonly:    strings.HasPrefix(path, "/usr/"),
	}, nil
}

func (a *App) DeleteFamily(f models.FontFamily) error {

	for _, p := range f.Variants {
		fmt.Printf("%s %s %s\n", "[LOG]", "Deleting file:", p.Path)
		err := os.Remove(p.Path)
		if err != nil {
			fmt.Println(err)
			return err
		}
	}

	return nil
}

func (a *App) InstallFont(path string) {
	var fontsPath = expandHomeDir("~/.local/share/fonts")
	var fileName = filepath.Base(path)
	var destPath = filepath.Join(fontsPath, fileName)

	fmt.Println(destPath)

	inputFile, err := os.Open(path)

	if err != nil {
		panic(err)
	}
	defer inputFile.Close()

	outputFile, err := os.Create(destPath)
	if err != nil {
		panic(err)
	}
	defer outputFile.Close()

	_, err = io.Copy(outputFile, inputFile)
	if err != nil {
		panic(err)
	}

	inputFile.Close()

}

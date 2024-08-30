package main

import (
	"context"
	"fmt"
	"io/fs"
	"os"
	"os/exec"
	"path/filepath"
	"slices"
	"strings"

	"golang.org/x/image/font/sfnt"
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

type FontVariant struct {
	VariantName string `json:"name"`
	familyName  string
	Path        string `json:"path"`
	Readonly    bool   `json:"readonly"`
}

type FontFamily struct {
	Name                   string        `json:"name"`
	Variants               []FontVariant `json:"variants"`
	AvailableWeights       []int         `json:"availableWeights"`
	AvailableItalicWeights []int         `json:"availableItalicWeights"`
	HasReadonly            bool          `json:"hasReadonly"`
}

func (a *App) GetFonts() []FontFamily {
	fontDirs := []string{
		"/usr/share/fonts",
		"/usr/local/share/fonts",
		"~/.fonts",
		"~/.local/share/fonts",
	}

	fontVariants := findFonts(fontDirs)

	fontFamilyMap := make(map[string][]FontVariant)

	for _, font := range fontVariants {
		fontFamilyMap[font.familyName] = append(fontFamilyMap[font.familyName], font)
	}

	var fontFamilies []FontFamily
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
			fmt.Printf("Font name: %s, Variant name: %s\n", variant.familyName, variantName)

			val, ok := weights[variantName]

			if ok {
				availableWeights = append(availableWeights, val)
				if strings.Contains(variantName, "italic") {
					availableItalicWeights = append(availableItalicWeights, val)
				}
			}

		}
		slices.Sort(availableWeights)
		fontFamilies = append(fontFamilies, FontFamily{
			Name:                   familyName,
			Variants:               variants,
			AvailableWeights:       slices.Compact(availableWeights),
			AvailableItalicWeights: availableItalicWeights,
			HasReadonly:            hasReadonly,
		})
	}

	return fontFamilies
}

func findFonts(dirs []string) []FontVariant {
	var fonts []FontVariant
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

	font, err := sfnt.Parse(data)
	if err != nil {
		return FontVariant{}, err
	}

	family, err := font.Name(nil, sfnt.NameIDFamily)
	if err != nil {
		return FontVariant{}, err
	}

	subfamily, err := font.Name(nil, sfnt.NameIDSubfamily)
	if err != nil {
		return FontVariant{}, err
	}

	return FontVariant{
		VariantName: string(subfamily),
		familyName:  string(family),
		Path:        path,
		Readonly:    strings.HasPrefix(path, "/usr/"),
	}, nil
}

func (a *App) DeleteFamily(f FontFamily) error {

	var paths []string

	for _, v := range f.Variants {
		paths = append(paths, v.Path)
	}

	if f.HasReadonly {

		args := []string{"rm"}
		args = append(args, paths...)

		cmd := exec.Command("pkexec", args...)

		if output, err := cmd.CombinedOutput(); err != nil {
			return fmt.Errorf("pkexec error: %s, %w", string(output), err)
		}
	} else {

		for _, p := range paths {
			err := os.Remove(p)
			if err != nil {
				fmt.Println(err)
				return err
			}
		}

	}

	return nil
}

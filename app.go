package main

import (
	"context"
	"fmt"
	"io"
	"net/http"
	"os"
	"path/filepath"

	"thefontapp/helper"
	ff "thefontapp/models/FontFamily"
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

func (a *App) GetFonts() []ff.FontFamily {
	fontDirs := []string{
		"/usr/share/fonts",
		"/usr/local/share/fonts",
		"~/.fonts",
		"~/.local/share/fonts",
	}

	fontVariants := ff.FindFonts(fontDirs)

	fontFamilyMap := make(map[string][]ff.FontVariant)

	for _, font := range fontVariants {
		fontFamilyMap[font.FamilyName] = append(fontFamilyMap[font.FamilyName], font)
	}

	var fontFamilies []ff.FontFamily
	for familyName, variants := range fontFamilyMap {

		hasReadonly := false

		for _, variant := range variants {
			if variant.Readonly {
				hasReadonly = true
			}
		}

		fontFamilies = append(fontFamilies, ff.FontFamily{
			Name:        familyName,
			Variants:    variants,
			HasReadonly: hasReadonly,
		})
	}

	return fontFamilies
}

func (a *App) DeleteFamily(paths []string) error {

	for _, p := range paths {
		fmt.Printf("%s %s %s\n", "[LOG]", "Deleting file:", p)
		err := os.Remove(p)
		if err != nil {
			fmt.Println(err)
			return err
		}
	}

	return nil
}

func (a *App) InstallFont(path string) {
	var fontsPath = helper.ExpandHomeDir("~/.local/share/fonts")
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

func (a *App) InstallGoogleFont(url string, path string) {

	file, err := os.Create(path)
	if err != nil {
		panic(err)
	}

	defer file.Close()

	response, err := http.Get(url)
	if err != nil {
		panic(err)
	}

	defer response.Body.Close()

	_, err = io.Copy(file, response.Body)
	if err != nil {
		panic(err)
	}

}

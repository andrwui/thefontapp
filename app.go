package main

import (
	"context"
	"thefontapp/internal/archive"
	gman "thefontapp/internal/font/google/manager"
	lman "thefontapp/internal/font/local/manager"
	lfmodel "thefontapp/internal/font/local/model"
	lfscanner "thefontapp/internal/font/local/scanner"
	"thefontapp/internal/font/local/sources"
	"thefontapp/internal/settings"
)

type App struct {
	ctx context.Context
}

func NewApp() *App {
	return &App{}
}

func (a *App) startup(ctx context.Context) {
	a.ctx = ctx
	settings.InitSettings()
	sources.InitSources()
}

func (a *App) GetLocalFonts() ([]lfmodel.FontFamily, error) {
	fonts := make([]lfmodel.FontFamily, 0)

	sysFontSources, err := sources.GetSystemFontSource()
	if err != nil {
		return nil, err
	}

	usrFontSources, err := sources.GetUserFontSource()
	if err != nil {
		return nil, err
	}

	customFontSources, err := sources.GetCustomFontSources()
	if err != nil {
		return nil, err
	}

	sysFamilies, err := lfscanner.ScanFontFamilies(sysFontSources.Path)
	if err != nil {
		return nil, err
	}

	usrFamilies, err := lfscanner.ScanFontFamilies(usrFontSources.Path)
	if err != nil {
		return nil, err
	}

	for _, source := range customFontSources {
		sourceFonts, err := lfscanner.ScanFontFamilies(source.Path)
		if err != nil {
			return nil, err
		}

		fonts = append(fonts, sourceFonts...)

	}

	fonts = append(fonts, sysFamilies...)
	fonts = append(fonts, usrFamilies...)

	return fonts, nil

}

func (a *App) InstallLocalFont(fontPath, destPath string) error {
	return lman.InstallLocalFont(fontPath, destPath)

}
func (a *App) DeleteFamily(paths []string) error {
	return lman.DeleteFamily(paths)
}

func (a *App) InstallGoogleFont(url string, path string) error {
	return gman.InstallGoogleFont(url, path)
}

func (a *App) GetLocalFontDirectories() ([]sources.Source, error) {
	return sources.GetAllLocalFontSources()
}

func (a *App) ListArchiveContents(archivePath string) ([]string, error) {
	return archive.ListArchiveContents(archivePath)
}

func (a *App) CopyArchiveContents(archivePath string, filePaths []string, destPath string) error {
	return archive.CopyArchiveContents(archivePath, filePaths, destPath)
}

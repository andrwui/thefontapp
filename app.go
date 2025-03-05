package main

import (
	"context"
	"fmt"

	appconfig "thefontapp/internal/app_config"
	"thefontapp/internal/archive"
	gfman "thefontapp/internal/font/google/manager"
	lfman "thefontapp/internal/font/local/manager"
	lfmod "thefontapp/internal/font/local/model"
	lfsca "thefontapp/internal/font/local/scanner"
	"thefontapp/internal/helper/paths"
)

type App struct {
	ctx context.Context
}

func NewApp() *App {
	return &App{}
}

func (a *App) startup(ctx context.Context) {
	a.ctx = ctx
	a.CleanTmpDir()
}

func (a *App) GetLocalFonts() []lfmod.FontFamily {
	return lfsca.GetLocalFonts()
}

func (a *App) InstallLocalFont(fontPath, destPath string) error {
	return lfman.InstallLocalFont(fontPath, destPath)

}
func (a *App) DeleteFamily(paths []string) error {
	return lfman.DeleteFamily(paths)
}

func (a *App) InstallGoogleFont(url string, path string) error {
	return gfman.InstallGoogleFont(url, path)
}

func (a *App) GetLocalFontDirectories() ([]string, error) {
	return appconfig.GetLocalFontDirectories()
}

func (a *App) ListArchiveFiles(archivePath string) ([]string, error) {

	tmpDir, err := paths.GetTempPath()
	if err != nil {
		return nil, err
	}

	fmt.Println(tmpDir)
	err = archive.ExtractZipFile(archivePath, tmpDir)
	if err != nil {
		return nil, err
	}

	tmpFiles, err := paths.GetDirectoryFiles(tmpDir)
	if err != nil {
		return nil, err
	}
	fmt.Println(tmpFiles)

	return tmpFiles, nil
}

func (a *App) CleanTmpDir() error {
	return paths.CleanTmpDir()

}

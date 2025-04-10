package main

import (
	"context"
	appconfig "thefontapp/internal/app_config"
	"thefontapp/internal/archive"
	gfman "thefontapp/internal/font/google/manager"
	lfman "thefontapp/internal/font/local/manager"
	lfmod "thefontapp/internal/font/local/model"
	lfsca "thefontapp/internal/font/local/scanner"
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

func (a *App) ListArchiveContents(archivePath string) ([]string, error) {
	return archive.ListArchiveContents(archivePath)
}

func (a *App) CopyArchiveContents(archivePath string, filePaths []string, destPath string) error {
	return archive.CopyArchiveContents(archivePath, filePaths, destPath)
}

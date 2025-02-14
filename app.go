package main

import (
	"context"

	arc "thefontapp/internal/font/common/archive"
	cfm "thefontapp/internal/font/common/manager"
	gfman "thefontapp/internal/font/google/manager"
	lfman "thefontapp/internal/font/local/manager"
	lfm "thefontapp/internal/font/local/model"
	lfs "thefontapp/internal/font/local/scanner"
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

func (a *App) GetLocalFonts() []lfm.FontFamily {
  return lfs.GetLocalFonts()
}


func (a *App) InstallLocalFont(path string) {
  lfman.InstallLocalFont(path)

}
func (a *App) DeleteFamily(paths []string) error {
  return cfm.DeleteFamily(paths)
}


func (a *App) InstallGoogleFont(url string, path string) {
  gfman.InstallGoogleFont(url, path)
}

func (a *App)RetrieveZipFileNames(path string) ([]string, error) {
  return arc.RetrieveZipFiles(path)

}


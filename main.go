package main

import (
	"embed"

	"github.com/wailsapp/wails/v2"
	"github.com/wailsapp/wails/v2/pkg/options"
	ff "thefontapp/models/FontFamily"
)

//go:embed all:frontend/dist
var assets embed.FS

func main() {
	// Create an instance of the app structure
	app := NewApp()

	// Create application with options
	err := wails.Run(&options.App{
		Title:            "My Waybar-like App",
		Assets:           assets,
		BackgroundColour: &options.RGBA{R: 27, G: 38, B: 54, A: 1},
		OnStartup:        app.startup,
		DragAndDrop:      &options.DragAndDrop{EnableFileDrop: true},

		Bind: []interface{}{
			app,
			&ff.FontFamily{},
			&ff.FontVariant{},
		},
	})

	if err != nil {
		println("Error:", err.Error())
	}
}

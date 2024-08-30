package main

import (
	"embed"

	"github.com/wailsapp/wails/v2"
	"github.com/wailsapp/wails/v2/pkg/options"
	"github.com/wailsapp/wails/v2/pkg/options/assetserver"
)

//go:embed all:frontend/dist
var assets embed.FS

func main() {
	// Create an instance of the app structure
	app := NewApp()

	// Create application with options
	err := wails.Run(&options.App{
		Title:             "My Waybar-like App",
		Width:             1920, // Full-screen width for 1080p
		Height:            30,   // Height of the bar
		MinWidth:          1920,
		MinHeight:         30,
		MaxWidth:          1920,
		MaxHeight:         30,
		DisableResize:     true,
		AlwaysOnTop:       true,
		Fullscreen:        false,
		StartHidden:       false,
		HideWindowOnClose: false,
		Assets:            assets,
		},
		BackgroundColour: &options.RGBA{R: 27, G: 38, B: 54, A: 1},
		OnStartup:        app.startup,
		Bind: []interface{}{
			app,
			&FontFamily{},
			&FontVariant{},
		},
	})

	if err != nil {
		println("Error:", err.Error())
	}
}

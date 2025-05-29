package main

import (
	"embed"
	"github.com/wailsapp/wails/v2"
	"github.com/wailsapp/wails/v2/pkg/options"
	"github.com/wailsapp/wails/v2/pkg/options/assetserver"
	"mime"
	"net/http"
	"os"
	"path/filepath"
	"strings"
	lfm "thefontapp/internal/font/local/model"
)

//go:embed all:frontend/dist
var assets embed.FS

type FileLoader struct {
	http.Handler
}

func NewFileLoader() *FileLoader {
	return &FileLoader{}
}

func (h *FileLoader) ServeHTTP(res http.ResponseWriter, req *http.Request) {
	var err error

	requestedPath := req.URL.Path
	if strings.HasPrefix(requestedPath, "/wails/") {
		requestedPath = strings.TrimPrefix(requestedPath, "/wails/")
	} else {
		requestedPath = strings.TrimPrefix(requestedPath, "/")
	}

	fileData, err := os.ReadFile(requestedPath)
	if err != nil {
		res.WriteHeader(http.StatusBadRequest)
		return
	}

	ext := filepath.Ext(requestedPath)
	contentType := mime.TypeByExtension(ext)
	if contentType != "" {
		res.Header().Set("Content-Type", contentType)
	} else {
		switch strings.ToLower(ext) {
		case ".ttf":
			res.Header().Set("Content-Type", "font/ttf")
		case ".otf":
			res.Header().Set("Content-Type", "font/otf")
		case ".woff":
			res.Header().Set("Content-Type", "font/woff")
		case ".woff2":
			res.Header().Set("Content-Type", "font/woff2")
		default:
			res.Header().Set("Content-Type", "application/octet-stream")
		}
	}

	res.WriteHeader(http.StatusOK)
	res.Write(fileData)
}

func main() {
	app := NewApp()

	err := wails.Run(&options.App{
		Title: "thefontapp",
		AssetServer: &assetserver.Options{
			Assets:  assets,
			Handler: NewFileLoader(),
		},
		BackgroundColour: &options.RGBA{R: 8, G: 8, B: 8, A: 1},
		OnStartup:        app.startup,
		DragAndDrop:      &options.DragAndDrop{EnableFileDrop: true},

		Bind: []interface{}{
			app,
			&lfm.FontFamily{},
			&lfm.FontVariant{},
		},
	})
	if err != nil {
		println("Error:", err)
	}
}

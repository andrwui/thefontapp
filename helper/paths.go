package helper

import (
	"os"
	"path/filepath"
)

func ExpandHomeDir(path string) string {
	home, _ := os.UserHomeDir()
	if path[:2] == "~/" {
		return filepath.Join(home, path[2:])
	} else {
		return filepath.Join(home, path)
	}
}

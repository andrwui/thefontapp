package paths

import (
	"fmt"
	"os"
	"path/filepath"
	"strings"
)

func ExpandHomeDir(path string) string {
	if strings.HasPrefix(path, "~/") {
		home, err := os.UserHomeDir()
		if err != nil {
			return path
		}
		return filepath.Join(home, path[2:])
	}
	return path
}

func GetFileExtension(filepath string) string {
	lastDotIndex := strings.LastIndex(filepath, ".")

	if lastDotIndex < 0 || lastDotIndex == len(filepath)-1 {
		return ""
	}
	return filepath[lastDotIndex:]
}

func GetTempPath() (string, error) {
	tempDir := os.TempDir()

	appTempDir := filepath.Join(tempDir, "thefontapp")

	err := os.MkdirAll(appTempDir, 0755)
	if err != nil {
		return "", err
	}

	return appTempDir, nil
}

func CleanTmpDir() error {

	tmpPath, err := GetTempPath()
	if err != nil {
		return err
	}

	err = os.RemoveAll(tmpPath)
	if err != nil {
		return err
	}

	err = os.Mkdir(tmpPath, 0755)
	if err != nil {
		return err
	}

	return nil

}

func GetDirectoryFiles(rootDir string) ([]string, error) {

	var files []string
	fmt.Printf("ROOTDIR: %s", rootDir)

	err := filepath.Walk(rootDir, func(path string, info os.FileInfo, err error) error {
		if err != nil {
			return err
		}

		if !info.IsDir() {
			cleanPath := filepath.ToSlash(path)
			files = append(files, cleanPath)
		}

		return nil
	})

	return files, err
}

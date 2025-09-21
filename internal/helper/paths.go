package helper

import (
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

func GetTempPath() (string, error) {
	tempDir := os.TempDir()
	os.UserHomeDir()

	appTempDir := filepath.Join(tempDir, "thefontapp")

	err := os.MkdirAll(appTempDir, 0755)
	if err != nil {
		return "", err
	}

	return appTempDir, nil
}

func GetAppDataDir() (string, error) {
	appname := "thefontapp"

	configDir, err := os.UserConfigDir()
	if err != nil {
		return "", err
	}

	return filepath.Join(configDir, appname), nil

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

func IsDirectoryReadOnly(dir string) bool {
	testFile := filepath.Join(dir, ".test_permission")

	err := os.WriteFile(testFile, []byte("test"), 0600)
	if err != nil {

		if os.IsPermission(err) {
			return true
		}

		return false
	}

	os.Remove(testFile)
	return false
}

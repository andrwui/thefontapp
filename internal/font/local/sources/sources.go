package sources

import (
	"encoding/json"
	"errors"
	"io"
	"os"
	"path/filepath"
	"runtime"
	"thefontapp/internal/constants/filemodes"
	"thefontapp/internal/helper"
)

type Source struct {
	Name           string `json:"name"`
	Path           string `json:"path"`
	Icon           string `json:"icon"`
	DirReadonly    bool   `json:"dir_readonly"`
	SourceReadonly bool   `json:"source_readonly"`
}

func GetSystemFontSource() (Source, error) {

	var path string

	name := "System fonts"
	icon := "monitor"
	dirReadonly := true
	sourceReadonly := true

	source := Source{
		Name:           name,
		Icon:           icon,
		DirReadonly:    dirReadonly,
		SourceReadonly: sourceReadonly,
	}

	switch runtime.GOOS {
	case "linux":
		path = "/usr/share/fonts"

	case "windows":
		path = filepath.Join(os.Getenv("SystemRoot"), "Fonts")

	case "darwin":
		path = "/Library/Fonts"

	default:
		return source, errors.New("Your operative system is not supported yet.")
	}

	source.Path = path
	return source, nil

}

func GetUserFontSource() (Source, error) {

	var path string

	name := "User fonts"
	icon := "user"
	dirReadonly := false
	sourceReadonly := false

	source := Source{
		Name:           name,
		Icon:           icon,
		DirReadonly:    dirReadonly,
		SourceReadonly: sourceReadonly,
	}

	switch runtime.GOOS {
	case "linux":
		path = filepath.Join(os.Getenv("HOME"), ".local", "share", "fonts")

	case "windows":
		path = filepath.Join(os.Getenv("LocalAppData"), "Microsoft", "Windows", "Fonts")

	case "darwin":
		path = filepath.Join(os.Getenv("HOME"), "Library", "Fonts")

	default:
		return source, errors.New("Your operative system is not supported yet.")
	}

	source.Path = path

	return source, nil

}

func InitSources() {

	sourcesFileName := "sources.json"

	appDataDir, err := helper.GetAppDataDir()
	if err != nil {
		panic(err)
	}

	if _, err := os.Stat(appDataDir); errors.Is(err, os.ErrNotExist) {
		err = os.MkdirAll(appDataDir, filemodes.OS_USER_RWX)
		if err != nil {
			panic(err)
		}
	}

	sourcesFilePath := filepath.Join(appDataDir, sourcesFileName)

	if _, err := os.Stat(sourcesFilePath); errors.Is(err, os.ErrNotExist) {
		err := os.WriteFile(sourcesFilePath, []byte("[]"), os.FileMode(filemodes.OS_USER_RWX))
		if err != nil {
			panic(err)
		}
	}
}

func GetJsonSourcesFile() (*os.File, error) {
	sourcesFileName := "sources.json"

	appDataDir, err := helper.GetAppDataDir()
	if err != nil {
		return nil, err
	}

	if _, err := os.Stat(appDataDir); errors.Is(err, os.ErrNotExist) {
		err = os.MkdirAll(appDataDir, filemodes.OS_USER_RWX)
		if err != nil {
			return nil, err
		}
	}

	sourcesFilePath := filepath.Join(appDataDir, sourcesFileName)

	if _, err := os.Stat(sourcesFilePath); errors.Is(err, os.ErrNotExist) {
		err := os.WriteFile(sourcesFilePath, []byte("[]"), os.FileMode(filemodes.OS_USER_RWX))
		if err != nil {
			return nil, err
		}
	}

	file, err := os.Open(sourcesFilePath)

	return file, nil

}

func AddFontSource(name, path, icon string) error {
	file, err := GetJsonSourcesFile()
	if err != nil {
		return err
	}

	defer file.Close()

	oldSources := make([]Source, 0)

	oldData, err := io.ReadAll(file)
	if err != nil && err != io.EOF {
		return err
	}

	if len(oldData) > 0 {
		if err := json.Unmarshal(oldData, &oldSources); err != nil {
			return err
		}
	}

	newSource := Source{
		Name:           name,
		Path:           path,
		Icon:           icon,
		DirReadonly:    helper.IsDirectoryReadOnly(path),
		SourceReadonly: false,
	}

	newSources := append(oldSources, newSource)

	err = file.Truncate(0)
	if err != nil {
		return err
	}

	_, err = file.Seek(0, io.SeekStart)
	if err != nil {
		return err
	}

	newData, err := json.Marshal(newSources)
	if err != nil {
		return err
	}

	file.Write(newData)

	return nil

}

func GetCustomFontSources() ([]Source, error) {

	sources := make([]Source, 0)

	file, err := GetJsonSourcesFile()
	if err != nil {
		return nil, err
	}

	fileData, err := io.ReadAll(file)
	if err != nil {
		return nil, err
	}

	if len(fileData) == 0 {
		return sources, nil
	}

	err = json.Unmarshal(fileData, &sources)
	if err != nil {
		return nil, err
	}

	return sources, nil

}

func GetAllLocalFontSources() ([]Source, error) {

	sources := make([]Source, 0)

	sysSource, err := GetSystemFontSource()
	if err != nil {
		return nil, err
	}

	usrSource, err := GetUserFontSource()
	if err != nil {
		return nil, err
	}

	customSources, err := GetCustomFontSources()

	sources = append(sources, sysSource)
	sources = append(sources, usrSource)
	sources = append(sources, customSources...)

	return sources, nil
}

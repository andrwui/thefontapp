package settings

import (
	"encoding/json"
	"errors"
	"io"
	"os"
	"path/filepath"
	"sync"
	"thefontapp/internal/constants/filemodes"
	"thefontapp/internal/helper"
)

var (
	settingsInstance *Settings
	settingsFilePath string
	once             sync.Once
	mtx              sync.RWMutex
)

type Settings struct {
	TrialFonts []string `json:"trial_fonts"`
}

func InitSettings() {
	once.Do(func() {

		settingsFilename := "settings.json"

		defaultSettings := Settings{
			TrialFonts: make([]string, 0),
		}

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

		settingsFilePath = filepath.Join(appDataDir, settingsFilename)

		if _, err := os.Stat(settingsFilePath); errors.Is(err, os.ErrNotExist) {
			defaultSettingsBytes, err := json.MarshalIndent(defaultSettings, "", "	")
			if err != nil {
				panic(err)
			}

			err = os.WriteFile(settingsFilePath, defaultSettingsBytes, os.FileMode(filemodes.OS_USER_RWX))
			if err != nil {
				panic(err)
			}
		}

		loadedSettings, err := loadSettingsFromFile()
		if err != nil {
			panic(err)
		}
		settingsInstance = loadedSettings

	})

}

func GetSettings() Settings {
	mtx.RLock()
	defer mtx.RUnlock()

	if settingsInstance == nil {
		InitSettings()
	}

	return *settingsInstance
}

func UpdateSettings(updateFn func(*Settings)) error {
	mtx.Lock()
	defer mtx.RUnlock()

	if settingsInstance == nil {
		InitSettings()
	}

	updateFn(settingsInstance)

	return saveSettingsToFile(settingsInstance)

}

func loadSettingsFromFile() (*Settings, error) {
	file, err := os.Open(settingsFilePath)
	if err != nil {
		return nil, err
	}

	defer file.Close()

	fileBytes, err := io.ReadAll(file)
	if err != nil {
		return nil, err
	}

	var loadedSettings Settings
	err = json.Unmarshal(fileBytes, &loadedSettings)
	if err != nil {
		return nil, err
	}

	return &loadedSettings, nil

}

func saveSettingsToFile(s *Settings) error {
	data, err := json.MarshalIndent(s, "", "	")
	if err != nil {
		return err
	}

	tmpFilePath := settingsFilePath + ".tmp"

	err = os.WriteFile(tmpFilePath, data, os.FileMode(filemodes.OS_USER_RWX))
	if err != nil {
		return err
	}

	err = os.Rename(tmpFilePath, settingsFilePath)
	if err != nil {
		return err
	}

	return nil
}

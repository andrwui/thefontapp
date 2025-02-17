package appconfig

import (
	"thefontapp/internal/constants"
)

func GetLocalFontDirectories() ([]string, error) {
	return constants.FontDirs, nil

}

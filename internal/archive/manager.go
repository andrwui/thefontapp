package archive

import (
	"github.com/gen2brain/go-unarr"
	"os"
	"path/filepath"
	"thefontapp/internal/helper"
)

func ListArchiveContents(path string) ([]string, error) {

	a, err := unarr.NewArchive(path)
	if err != nil {
		return nil, err
	}

	return a.List()

}

func CopyArchiveContents(archivePath string, filePaths []string, destPath string) error {

	a, err := unarr.NewArchive(archivePath)
	if err != nil {
		return err
	}

	for _, filePath := range filePaths {

		err = a.EntryFor(filePath)
		if err != nil {
			return err
		}

		data, err := a.ReadAll()
		if err != nil {
			return err
		}

		filename := filepath.Base(filePath)

		destFilePath := helper.ExpandHomeDir(filepath.Join(destPath, filename))

		err = os.WriteFile(destFilePath, data, 0664)
		if err != nil {
			return err
		}
	}

	return nil
}

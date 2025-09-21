package manager

import (
	"io"
	"os"
	"path"
	"path/filepath"

	"thefontapp/internal/helper"
)

func InstallLocalFont(fontPath string, destPath string) error {
	destPath = path.Join(helper.ExpandHomeDir(destPath), filepath.Base(fontPath))

	inputFile, err := os.Open(fontPath)

	if err != nil {
		return err
	}
	defer inputFile.Close()

	outputFile, err := os.Create(filepath.Join(destPath))
	if err != nil {
		return err
	}
	defer outputFile.Close()

	_, err = io.Copy(outputFile, inputFile)
	if err != nil {
		return err
	}

	inputFile.Close()

	return nil
}

func DeleteFamily(paths []string) error {

	for _, p := range paths {
		err := os.Remove(p)
		if err != nil {
			return err
		}
	}

	return nil
}

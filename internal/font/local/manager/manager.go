package manager

import (
	"fmt"
	"io"
	"os"
	"path"
	"path/filepath"

	"thefontapp/internal/helper/paths"
)

func InstallLocalFont(fontPath string, destPath string) error {
	destPath = path.Join(paths.ExpandHomeDir(destPath), filepath.Base(fontPath))

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
		fmt.Printf("%s %s %s\n", "[LOG]", "Deleting file:", p)
		err := os.Remove(p)
		if err != nil {
			fmt.Println(err)
			return err
		}
	}

	return nil
}

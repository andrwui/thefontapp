package manager

import (
	"fmt"
	"io"
	"os"
	"path/filepath"

	"thefontapp/internal/helper/paths"
)

func InstallLocalFont(path string) {
	var fontsPath = paths.ExpandHomeDir("~/.local/share/fonts")
	var fileName = filepath.Base(path)
	var destPath = filepath.Join(fontsPath, fileName)

	fmt.Println(destPath)

	inputFile, err := os.Open(path)

	if err != nil {
		panic(err)
	}
	defer inputFile.Close()

	outputFile, err := os.Create(destPath)
	if err != nil {
		panic(err)
	}
	defer outputFile.Close()

	_, err = io.Copy(outputFile, inputFile)
	if err != nil {
		panic(err)
	}

	inputFile.Close()

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

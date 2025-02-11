package manager

import (
  "path/filepath"
  "fmt"
  "os"
  "io"

  "thefontapp/internal/common/paths"
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

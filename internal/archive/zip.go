package archive

import (
	"archive/zip"
	"fmt"
	"io"
	"os"
	"path"
	"strings"
)

func ExtractZipFile(zipPath string, outdir string) error {
	reader, err := zip.OpenReader(zipPath)
	if err != nil {
		return err
	}
	defer reader.Close()

	for _, file := range reader.File {
		if file.FileInfo().IsDir() {
			continue
		}

		fileToMove, err := file.Open()
		if err != nil {
			return err
		}
		defer fileToMove.Close()

		_, filename := path.Split(file.Name)
		finalPath := path.Join(outdir, filename)

		counter := 1
		for {
			if _, err := os.Stat(finalPath); os.IsNotExist(err) {
				break
			}
			ext := path.Ext(filename)
			nameWithoutExt := strings.TrimSuffix(filename, ext)
			finalPath = path.Join(outdir, fmt.Sprintf("%s_%d%s", nameWithoutExt, counter, ext))
			counter++
		}

		destination, err := os.Create(finalPath)
		if err != nil {
			return err
		}
		defer destination.Close()

		_, err = io.Copy(destination, fileToMove)
		if err != nil {
			return err
		}
	}
	return nil
}

package archive

import (
	"archive/zip"
)

func RetrieveZipFiles(path string) ([]string, error) {

  fileNames := make([]string, 0)

  reader, err := zip.OpenReader(path)
  if err != nil {
    return nil, err
  }
  defer reader.Close()

  for _, file := range reader.File {
    fileNames = append(fileNames, file.Name)
  }

  return fileNames, nil


}

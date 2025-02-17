package manager

import (
	"io"
	"net/http"
	"os"
)

func InstallGoogleFont(url string, path string) error {

	file, err := os.Create(path)
	if err != nil {
		return err
	}

	defer file.Close()

	response, err := http.Get(url)
	if err != nil {
		return err
	}

	defer response.Body.Close()

	_, err = io.Copy(file, response.Body)
	if err != nil {
		return err
	}

	return nil
}

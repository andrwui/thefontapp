package manager

import (
  "os"
  "net/http"
  "io"
)

func InstallGoogleFont(url string, path string) {

	file, err := os.Create(path)
	if err != nil {
		panic(err)
	}

	defer file.Close()

	response, err := http.Get(url)
	if err != nil {
		panic(err)
	}

	defer response.Body.Close()

	_, err = io.Copy(file, response.Body)
	if err != nil {
		panic(err)
	}

}

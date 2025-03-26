package archive

import (
	"github.com/gen2brain/go-unarr"
)

func ListArchiveContents(path string) ([]string, error) {

	a, err := unarr.NewArchive(path)
	if err != nil {
		return nil, err
	}

	return a.List()

}

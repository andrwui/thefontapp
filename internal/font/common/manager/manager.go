package common

import(
  "fmt"
  "os"
)

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

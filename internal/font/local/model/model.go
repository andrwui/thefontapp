package font

type FontVariant struct {
	VariantName string `json:"name"`
	FamilyName  string
	Path        string `json:"path"`
	Readonly    bool   `json:"readonly"`
}

type FontFamily struct {
	Id                     int           `json:"id"`
	Name                   string        `json:"name"`
	Variants               []FontVariant `json:"variants"`
	AvailableWeights       []int         `json:"availableWeights"`
	AvailableItalicWeights []int         `json:"availableItalicWeights"`
	HasReadonly            bool          `json:"hasReadonly"`
}

func (ff *FontFamily) GetName() string {
	return ff.Name
}


export type RawGoogleFontsResponse = {
  kind: string
  items: Array<GoogleFont>
}

export type GoogleFont = {
  family: string
  variants: Array<string>
  subsets: Array<string>
  version: string
  lastModified: string
  files: {
    regular?: string
    italic?: string
    '100'?: string
    '200'?: string
    '300'?: string
    '500'?: string
    '600'?: string
    '700'?: string
    '800'?: string
    '900'?: string
    '100italic'?: string
    '200italic'?: string
    '300italic'?: string
    '500italic'?: string
    '600italic'?: string
    '700italic'?: string
    '800italic'?: string
    '900italic'?: string
  }
  category: 'serif' | 'sans-serif' | 'monospace' | 'display' | 'handwriting'
  kind: string
  menu: string
  colorCapabilities?: Array<string>
}

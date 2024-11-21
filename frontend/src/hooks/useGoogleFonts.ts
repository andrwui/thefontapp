import { GOOGLE_FONTS_API_KEY } from 'constants/GoogleFonts'
import { useEffect, useState } from 'react'
import { GoogleFont, RawGoogleFontsResponse } from 'types/GoogleFont'

const useGoogleFonts = () => {
  const [googleFonts, setGoogleFonts] = useState<GoogleFont[]>([] as GoogleFont[])
  const [isLoading, setIsLoading] = useState<boolean>()

  useEffect(() => {
    setIsLoading(true)
    fetch(`https://www.googleapis.com/webfonts/v1/webfonts?key=${GOOGLE_FONTS_API_KEY}`, {
      headers: {
        Accept: 'application/json',
        Origin: window.location.origin,
      },
    })
      .then(data => {
        console.log(data)
        return data.json()
      })
      .then((json: RawGoogleFontsResponse) => {
        console.log(json)
        setGoogleFonts(json.items)
        setIsLoading(false)
      })
  }, [])

  return { googleFonts, isLoading }
}

export default useGoogleFonts

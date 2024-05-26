import { useState, useEffect } from 'react'

function useGetData (url: string, token: string) {
  const [data, setData] = useState<any>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      setError(null)

      try {
        const response = await fetch(url, {
          headers: token ? { Authorization: `Bearer ${token}` } : {}
        })

        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.status}`)
        }

        const responseData = await response.json()
        setData(responseData)
      } catch (error:any) {
        setError(error)
      } finally {
        setIsLoading(false)
      }
    }

    if (url) {
      fetchData()
    }
  }, [url, token]) // Re-run effect when url or token changes

  return { data, isLoading, error }
}

export default useGetData

import {useEffect, useState} from "react";

const useContacts = () => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {

    const getContacts = async () => {
      setLoading(true)
      try {
        const response = await fetch('https://randomuser.me/api/?results=10')
        const {results, error} = await response.json()
        if (error) {
          throw new Error(error)
        }
        setData(results)
        setError(false)
      } catch (e) {
        setError(true)
      } finally {
        setLoading(false)
      }
    }

    getContacts()

  }, [])

  return {
    data,
    loading,
    error
  }
}

export default useContacts
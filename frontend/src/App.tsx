import { useEffect } from 'react'
import HomePage from './HomePage'

type AppProps = {name: string}
// React.CSSProperties
export default function App({name}: AppProps) {

  useEffect(() => {
    
    /* async function fetchData() {
      console.log(import.meta.env.VITE_API_URL)
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}`)
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log(data);
      }
      catch (error) {
        console.error('Error fetching data:', error)
      }
    }
    fetchData(); */
  }, [])

  return (
    <>
      <HomePage />
    </>
  )
}


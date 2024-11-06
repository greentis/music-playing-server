import { useState, useEffect } from 'react'

// React.CSSProperties
type AppProps = {name: string}

export default function App({name}: AppProps) {

  useEffect(() => {
    
    async function fetchData() {
      console.log(import.meta.env.VITE_API_URL)
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/posts`)
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
    fetchData();
  }, [])

  return (
    <>
    <h1>Hello, {name}!</h1>
    </>
  )
}


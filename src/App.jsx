import { useState } from 'react'
import Navbar from './components/Navbar'
import Maneger from './components/Maneger'
import Footer from './components/Footer'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Navbar />
      <div className='min-h-[78.5vh]'>
      <Maneger/>
      </div>
      <Footer/>
    </>
  )
}

export default App

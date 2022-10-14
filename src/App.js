import './App.css';
import { useEffect, useState } from 'react'
import MainContext from './MainContext';
import Sidebar from './components/Sidebar';
import Content from './components/Content';
import BrandsData from './brands.json'
import Copied from './components/Copied'
import {
  BrowserRouter,
  Route,
  Routes
} from "react-router-dom";
import Collection from "./components/Collection";
import {forceCheck} from "react-lazyload"

function App() {

  const brandsArray = []
  Object.keys(BrandsData).map(key => {
    brandsArray.push(BrandsData[key])
  })

  const [brands, setBrands] = useState(brandsArray)
  const [selectedBrands, setSelectedBrands] = useState([])
  const [copied, setCopied] = useState(false)
  const [search, setSearch] = useState('')

  useEffect(() => {
    if (copied) {
      const timeout = setTimeout(() => {
        setCopied(false)
      }, 1000)
      return () => {
        clearTimeout(timeout)
      }
    }
  })

  useEffect(() => {
    setBrands(brandsArray.filter(brand => brand.title.toLowerCase().includes(search)))
  }, [search])

useEffect(()=>{
  forceCheck()
},[brands])

  const data = {
    brands,
    setSelectedBrands,
    selectedBrands,
    setCopied,
    search,
    setSearch
  }


  return (
    <>
      <MainContext.Provider value={data}>
        {copied && <Copied color={copied} />}
        <Sidebar />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Content />}></Route>
            <Route path="/collection/:slugs" element={<Collection />}></Route>
          </Routes>
        </BrowserRouter>
      </MainContext.Provider>
    </>
  );
}

export default App;

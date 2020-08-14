import React from 'react';
import Searchbar from './components/Searchbar';
import Results from './components/Results';
import TitlePage from './components/TitlePage.js'
import './styles.css'
import { useSelector } from 'react-redux'



function App() {

  const { query, loader } = useSelector(state => state)

  return (
    <>
      <Searchbar />
      
      {loader && 
            <div className="flex justify-center items-center opacity-25 fixed w-full h-full bg-black">
                <div className="loader"></div>
            </div>
            }
      {!query ? <TitlePage /> : <Results /> }
    </>
  );
}

export default App;

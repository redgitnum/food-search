import React from 'react';
import Searchbar from './Searchbar';
import Results from './Results';
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
      {!query ? 
        
        <div className="pt-24 px-10 flex flex-col text-lg font-semibold text-gray-900 justify-center items-center text-center">          
          <div>Search for something...</div>
          <div className="text-sm text-gray-600">it can be any food product name, food category or even barcode</div>
        </div> : 
        <Results />
        }
      
    </>
  );
}

export default App;

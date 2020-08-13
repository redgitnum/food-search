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
          <div>Search for any food product...</div>
          <div className="text-sm text-gray-600">it can be a product name, brand, food type, etc.</div>
          <div className="mt-4 p-2 border-4 border-red-900 rounded-md bg-red-200">Disclaimer
            <div className="text-sm text-red-700">
            The data provided to you by this app are retrieved from the <a className="underline" target="_blank" href="https://world.openfoodfacts.org/">Open Food Facts database</a>. 
            No guarantees can be made for the accuracy, completeness, or reliability of the information provided. 
            The data are provided “as is” and the originating source for the data 
            (Open Food Facts) is not liable for any damages arising out of the use of the data.
            </div>
          </div>
        </div> : 
        <Results />
        }
      
    </>
  );
}

export default App;

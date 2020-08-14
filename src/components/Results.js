import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { modalChange, foodIndexChange } from '../features'
import SearchResults from './ResultComponents/SearchResults';
import LicenseFooter from './ResultComponents/LicenseFooter';
import * as Category from './ResultComponents/Categories'

export default function() {
    const dispatch = useDispatch()
    const { data, modal, foodIndex} = useSelector(state => state) 

    return(
        <>
        {data.count ?
        <div className="pt-16 flex flex-col bg-gray-100">
            {modal ?
            <div className="flex flex-col w-full h-full bg-orange-500 max-w-screen-md mx-auto">
                <div id="fast-back-button" className="py-1 pl-3 bg-gray-100 flex text-lg sm:text-2xl font-medium justify-start items-center cursor-pointer" onClick={() => {
                    dispatch(modalChange(false))
                    dispatch(foodIndexChange(null))
                    }}>
                &#10554; back to results
                </div>
                {!data.products[foodIndex].complete ?
                    <div id="entry-incomplete" className="p-3 bg-red-300 font-semibold text-lg">
                        This product page is not complete. 
                        You can help to complete it by going to <a href={data.products[foodIndex].url} rel="noopener noreferrer" target="_blank" className="underline">Open Food Facts product page</a> and editing or adding more data.
                    </div>
                : null}
                <Category.ResultTitle />
                <Category.BasicInfo />
                <Category.Warnings />
                <Category.NovaGroup />
                <Category.NutritionLevels />
                <Category.NutriScore />
                <Category.NutriFacts />
                <Category.Ingredients />
                <Category.Images />
                <Category.FooterButtons />
                <LicenseFooter />
            </div>
            :
            <SearchResults />
            } 
        </div>
        :
            (data !== 'pending' ?
            <div className="pt-24 px-10 flex flex-col text-lg font-semibold text-gray-900 justify-center items-center text-center">          
                <div>No products found</div>
                <div className="text-sm text-gray-600">try to type a different phrase...</div>
            </div>
            : <div className="pt-24 px-10 flex flex-col text-lg font-semibold text-gray-900 justify-center items-center text-center">          
                <div>Searching...</div>
            </div>)
    }
    </>
    )
}
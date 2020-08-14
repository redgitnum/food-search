import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {ReactComponent as PlaceholderImg} from '../../assets/placeholder.svg';
import { fetchFood, modalChange, foodIndexChange } from '../../features'
import LicenseFooter from './LicenseFooter';



const SearchResults = () => {
    const dispatch = useDispatch()

    const { data, query, page} = useSelector(state => state)

    const [ tempPage, setTempPage ] = useState(page)

    const searchResults = () => {
        return data.count && data.products.map((product, index) => {
            return(
                <div className="mb-6 mx-2 shadow-md w-40 h-48 cursor-pointer" key={product.code} onClick={() => {
                    dispatch(modalChange(true))
                    dispatch(foodIndexChange(index))
                    document.body.scrollTop = 0;
                    document.documentElement.scrollTop = 0;
                    }}>
                    <div className="h-32 w-full">
                        {product.image_small_url ? 
                        <img className="object-contain w-full h-full" src={product.image_small_url}></img>
                        :
                        <PlaceholderImg className="object-contain w-full h-full text-white"/>
                        }
                        
                    </div>
                    <div className="flex justify-center py-px px-1 bg-gray-300 h-16 overflow-hidden font-semibold leading-tight text-center">
                        {product.product_name_en || product.product_name || product.brands}
                    </div>
                </div>
            )
        })
    }

    const pagination = () => {
        let maxPage = Math.ceil(data.count/20) || 1;
        return (
            <div className="flex justify-center">
                <div className="bg-gray-200">
                    <div className="flex">
                    <div className="p-2 rounded-md rounded-b-none rounded-r-none bg-blue-400 text-3xl cursor-pointer" onClick={() => {
                        if(page!=1){ 
                            dispatch(fetchFood({
                                value: query, 
                                page: page - 1
                            }))
                        }
                            }}>&#10508;</div>
                        <form className=" w-20 border-t border-b border-blue-400 text-4xl" id="new-page" onLoad={(e) => e.target.reset()} onSubmit={(e) => {
                            e.preventDefault()
                            Number(e.target.page.value) != page &&
                            dispatch(fetchFood({
                                value: query, 
                                page: Number(e.target.page.value)
                            }))
                            }}>
                            <input 
                                name="page" 
                                type="number" 
                                min="1" 
                                max={Math.ceil(maxPage).toString()} 
                                className="appearance-hide text-center w-full"
                                value={tempPage}
                                onChange={(e) => setTempPage(e.target.value >= maxPage ? maxPage : e.target.value)}>
                            </input>
                        </form>
                    <div className="p-2 rounded-md rounded-b-none rounded-l-none bg-blue-400 text-3xl cursor-pointer" onClick={() => {
                        if(page!= maxPage){ 
                        dispatch(fetchFood({
                                value: query, 
                                page: page + 1
                            }))
                        }
                        }}>&#10509;</div>
                    </div>
                    <button type="submit" form="new-page" className="w-full bg-green-200 rounded-md rounded-t-none cursor-pointer">Go to</button>
                </div>
            </div>
        )
    }

    return ( 
        <>
            {data.count && 
            <div className="p-2 pl-4">
                <div className="font-bold text-4xl text-red-700">{query}<span className="text-4xl text-black font-hairline">: page {page}</span></div>
                <div className="font-semibold text-xl">{data.count} search results on {Math.ceil(data.count/20)} {data.count<21 ? 'page' : 'pages'}</div>
            </div>
            }
            <div className="pt-6 flex flex-wrap content-around justify-center bg-gray-200">
                {searchResults()}
            </div>
            <div className=" py-4 font-semibold text-xl text-gray-800 text-center">
                {pagination()}
            </div>
            <LicenseFooter />
        </>
     );
} 


export default SearchResults;
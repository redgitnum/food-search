import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import placeholder from './front_fr.42.400.jpg'
import placeholder2 from './front_fr.70.400.jpg'
import {ReactComponent as PlaceholderImg} from './placeholder.svg';
import { fetchFood } from './features'



export default function() {
    const dispatch = useDispatch()

    const { data, query, page} = useSelector(state => state)

    const [modal, setModal] = useState(false)
    const [foodIndex, setFoodIndex] = useState(null)
    const [newPage, setNewPage] = useState(page)

    
    


    const searchResults = () => {
        return data.products && data.products.map((product, index) => {
            return(
                <div className="mb-6 mx-2 shadow-md w-40 h-48 cursor-pointer" key={product.code} onClick={() => {
                    setModal(true)
                    setFoodIndex(index)
                    }}>
                    <div className="h-32 w-full">
                        {product.image_small_url ? 
                        <img className="object-contain w-full h-full" src={product.image_small_url}></img>
                        :
                        <PlaceholderImg className="object-contain w-full h-full text-white"/>
                        }
                        
                    </div>
                    <div className="bg-gray-300 h-16 overflow-hidden font-semibold leading-tight text-center">
                        {product.product_name}
                    </div>
                </div>
            )
        })
    }

    const pagination = () => {
        let maxPage = Math.ceil(data.count/20);
        return (
            <div className="flex justify-center">
                <div className="bg-gray-200">
                    <div className="flex">
                    <div className="p-2 rounded-md rounded-b-none rounded-r-none bg-blue-400 text-3xl cursor-pointer" onClick={() => {
                        if(page!=1){ 
                            setNewPage(page - 1)
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
                            <input name="page" value={newPage} onChange={(e) => setNewPage(Number(e.target.value))} type="number" min="1" max={Math.ceil(maxPage).toString()} className="appearance-hide text-center w-full"></input>
                        </form>
                    <div className="p-2 rounded-md rounded-b-none rounded-l-none bg-blue-400 text-3xl cursor-pointer" onClick={() => {
                        if(page!= maxPage){ 
                        setNewPage(page + 1)
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

    return(
        <div className="pt-16 flex flex-col bg-gray-100">
            
            {modal ?
            <div className="flex flex-col w-full h-full bg-orange-500">
                <div id="up-button" className="py-1 pl-3 bg-gray-100 flex text-lg font-medium justify-start items-center cursor-pointer" onClick={() => {
                    setModal(false)
                    setFoodIndex(null)
                    }}>
                &#10554; back to results
                </div>
                <div id="title" className="flex p-3 justify-between">
                    <div className="flex flex-col justify-between font-semibold pr-2">
                        <h2 className="text-white text-lg ">
                        Pizza Guseppe z mięsem wołowym i warzywami, 
                        głęboko mrożona - Dr. Oetker - 420 g
                        </h2>
                        <p className="text-sm text-gray-900">EAN: 5900437005577</p>
                    </div>
                    <div>
                        <div className="w-32 border-solid border-2 border-white h-32 p-px rounded-md shadow-card bg-gray-300 overflow-hidden">
                            <img className="object-contain h-full w-full" src={placeholder}></img>
                        </div>
                    </div>
                </div>
                <div id="basic-info" className="flex flex-wrap bg-gray-200 m-3 overflow-hidden gap-px rounded-md shadow-card">
                    <div className="flex flex-col items-center bg-green-bright flex-auto w-32 p-2">
                        <div className="text-xs text-gray-800 font-bold">QUANTITY</div>
                        <div className="text-xl font-semibold">420 g</div>
                    </div>
                    <div className="flex flex-col items-center bg-green-bright flex-auto w-32 p-2">
                        <div className="text-xs text-gray-800 font-bold">BRANDS</div>
                        <div className="text-xl font-semibold">Dr Oetker</div>
                    </div>
                    <div className="flex flex-col items-center bg-green-bright flex-auto w-32 p-2">
                        <div className="text-xs text-gray-800 font-bold">STORES</div>
                        <div className="text-xl font-semibold">Dino</div>
                    </div>
                    <div className="flex flex-col items-center bg-green-bright flex-auto w-32 p-2">
                        <div className="text-xs text-gray-800 font-bold">COUNTRIES SOLD IN</div>
                        <div className="text-xl font-semibold">Polska</div>
                    </div>
                </div>
                <div id="warnings" className="flex flex-wrap m-3 bg-gray-200 overflow-hidden gap-px rounded-md shadow-card">
                    <div className="flex flex-col items-center bg-red-500 flex-auto w-32 p-2">
                        <div className="text-xs text-gray-200 font-bold">INGREDIENTS ANALYSIS</div>
                        <div className="flex flex-wrap gap-2 p-2 justify-center">
                            <div className="bg-red-700 rounded-md p-px px-2 shadow-pill text-gray-100 text-sm font-semibold">Palm-oil</div>
                            <div className="bg-red-700 rounded-md p-px px-2 shadow-pill text-gray-100 text-sm font-semibold">Non-vegan</div>
                            <div className="bg-red-700 rounded-md p-px px-2 shadow-pill text-gray-100 text-sm font-semibold">Non-vegetarian</div>
                        </div>
                    </div>
                    <div className="flex flex-col items-center bg-red-500 flex-auto w-32 p-2">
                        <div className="text-xs text-gray-200 font-bold">ADDITIVES</div>
                        <div className="flex flex-wrap gap-2 p-2 justify-center">
                            <div className="bg-red-700 rounded-md p-px px-2 shadow-pill text-gray-100 text-sm text-center font-semibold">E14XX - Modified Starch</div>
                            <div className="bg-red-700 rounded-md p-px px-2 shadow-pill text-gray-100 text-sm text-center font-semibold">E160a - Alpha-carotene</div>
                        </div>
                    </div>
                </div>
                <div id="nova-group" className="flex flex-wrap m-3 bg-gray-200 overflow-hidden gap-px rounded-md shadow-card">
                    <div className="bg-orange-300 w-full p-2">
                        <div className="text-2xl text-gray-900 text-center font-semibold">NOVA group</div>
                        <div className="bg-red-700 flex justify-center w-20 h-20 my-1 mx-auto rounded-full text-5xl text-gray-300 font-bold">4</div>
                        <div className="text-sm text-gray-900 text-center font-semibold">4 - Ultra processed food and drink products </div>
                    </div>
                </div>
                <div id="nutrition-levels" className="flex flex-wrap m-3 bg-gray-200 overflow-hidden gap-px rounded-md shadow-card">
                    <div className="bg-teal-500 w-full p-2">
                        <div className="text-2xl text-gray-200 text-center font-semibold">Nutrition levels for 100g</div>
                    </div>
                    <div className="flex flex-wrap gap-px text-gray-200 bg-gray-200 flex-auto">
                        <div className="flex flex-col justify-between flex-1 text-center font-semibold text-sm bg-teal-500 p-2 pb-4">
                            <div>FAT</div>
                            <div className="text-xl pt-2">11.2g</div>
                        </div>
                        <div className="flex flex-col justify-between flex-1 text-center font-semibold text-sm bg-teal-500 p-2 pb-4">
                            <div>SUGARS</div>
                            <div className="text-xl pt-2">11.2g</div>
                        </div>
                        <div className="flex flex-col justify-between flex-1 text-center font-semibold text-sm bg-teal-500 p-2 pb-4">
                            <div>SATURATED FAT</div>
                            <div className="text-xl pt-2">11.2g</div>
                        </div>
                        <div className="flex flex-col justify-between flex-1 text-center font-semibold text-sm bg-teal-500 p-2 pb-4">
                            <div>SALT</div>
                            <div className="text-xl pt-2">11.2g</div>
                        </div>
                    </div>
                </div>
                <div id="nutri-score" className="flex flex-wrap m-3 mb-10 bg-gray-200 gap-px rounded-md shadow-card">
                    <div className="bg-teal-500 w-full p-2 rounded-md rounded-b-none">
                        <div className="text-2xl text-gray-200 text-center font-semibold">Nutrition levels for 100g</div>
                    </div>
                    <div className="flex flex-wrap col-gap-px flex-auto text-5xl font-semibold text-center">
                        <div className="bg-nutri-a flex-1 text-white text-opacity-75 pb-1 rounded-md rounded-t-none rounded-r-none">A</div>
                        <div className="bg-nutri-b flex-1 text-white transform scale-125 text-opacity-100 pb-1 rounded-md border-4 border-white">B</div>
                        <div className="bg-nutri-c flex-1 text-white text-opacity-75 pb-1">C</div>
                        <div className="bg-nutri-d flex-1 text-white text-opacity-75 pb-1">D</div>
                        <div className="bg-nutri-e flex-1 text-white text-opacity-75 pb-1 rounded-md rounded-t-none rounded-l-none">E</div>
                    </div>
                </div>
                <table id="nutri-facts" className="table-auto bg-white text-sm">
                    <thead className="bg-gray-300">
                        <tr>
                        <th className="px-1 text-left font-semibold">Nutrition facts</th>
                        <th className="px-1 text-right font-semibold">As sold for 100g / 100ml</th>
                        <th className="px-3 text-right font-semibold">As sold per serving (420g)</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                        <td className="border px-2">Energy (kJ)</td>
                        <td className="border px-2 text-right">?</td>
                        <td className="border px-2 text-right">?</td>
                        </tr>
                        <tr className="">
                        <td className="border px-2">Energy (kcal)</td>
                        <td className="border px-2 text-right">237 kcal</td>
                        <td className="border px-2 text-right">995 kcal</td>
                        </tr>
                        <tr>
                        <td className="border px-2">Energy</td>
                        <td className="border px-2 text-right">992 kj (237 kcal)</td>
                        <td className="border px-2 text-right">4170 kj (995 kcal)</td>
                        </tr>
                    </tbody>
                    </table>
                <div id="ingredients" className="m-3">
                    <h2 className="text-white text-lg mb-1">
                    Ingredients
                    </h2>
                    <span className="text-gray-100 text-sm">
                    Mąka pszenna, woda, 9,1% ser Edamski, 8,0% warzywa w zmiennych proporcjach (bakłażany grillowane, cebula czerwona, papryka czerwona, papryka żółta, marchew), 4,5% mięso wołowe smażone (wołowina, woda, sól, przyprawy, dekstroza, hydrolizowane białka roślinne, zioła, ekstrakt drożdżowy, czosnek w proszku, cebula w proszku, ekstrakt przypraw), koncentrat pomidorowy, śmietana, tłuszcz palmowy, olej rzepakowy, drożdże piekarskie, sól, cukier, przyprawy, skrobia modyfikowana, mleko odtłuszczone w proszku, aromat, barwnik (karoteny), ekstrakt z chilli. Możliwa obecność soi, gorczycy.
                    </span>
                </div>
                <div id="images" className="m-3">
                    <h2 className="text-white text-lg mb-2">
                    Images
                    </h2>
                    <div className="mb-2 border-solid border-2 border-white h-full w-full p-px rounded-md shadow-card bg-gray-300 overflow-hidden">
                        <img className="object-contain h-full w-full" src={placeholder2}></img>
                    </div>
                    <div className="mb-2 border-solid border-2 border-white h-full w-full p-px rounded-md shadow-card bg-gray-300 overflow-hidden">
                        <img className="object-contain h-full w-full" src={placeholder}></img>
                    </div>
                    <div className="mb-2 border-solid border-2 border-white h-full w-full p-px rounded-md shadow-card bg-gray-300 overflow-hidden">
                        <img className="object-contain h-full w-full" src={placeholder}></img>
                    </div>
                </div>
                <div id="up-button" className="h-16 bg-gray-300 flex text-4xl text-center font-bold justify-center items-center cursor-pointer" onClick={() => {
                     document.body.scrollTop = 0;
                     document.documentElement.scrollTop = 0;
                }}>
                &#8593; up
                </div>
                <div id="back-button" className="h-16 bg-gray-700 flex text-4xl text-gray-100 text-center font-bold justify-evenly items-center cursor-pointer" onClick={() => {
                    setModal(false)
                    setFoodIndex(null)
                    document.body.scrollTop = 0;
                    document.documentElement.scrollTop = 0;
                    }}>
                &#10554; results
                </div>
            </div>
            :
            <>
            <div className="p-2 pl-4">
                <div className="font-bold text-4xl text-red-700">{query}</div>
                <div className="font-semibold text-xl">search results</div>
            </div>
            <div className="pt-6 flex flex-wrap content-around justify-center bg-gray-200">
                {searchResults()}
            </div>
            <div className=" py-4 font-semibold text-xl text-gray-800 text-center">
                {pagination()}
            </div>
            </>
            }
            
        </div>
    )
}
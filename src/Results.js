import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import placeholder from './front_fr.42.400.jpg'
import placeholder2 from './front_fr.70.400.jpg'

export default function() {
    const [modal, setModal] = useState(true)
    const [foodIndex, setFoodIndex] = useState(null)

    const { data, query, loader } = useSelector(state => state)

    return(
        <div className="pt-16 flex flex-col bg-gray-100">
            {loader && 
            <div className="flex justify-center items-center opacity-25 fixed w-full h-full bg-black">
                <div className="loader"></div>
            </div>
            }
            {modal ?
            <div className="flex flex-col w-full h-full bg-orange-500">
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
                <div id="nutri-score" className="flex flex-wrap m-3 bg-gray-200 gap-px rounded-md shadow-card">
                    <div className="bg-teal-500 w-full p-2 rounded-md rounded-b-none">
                        <div className="text-2xl text-gray-200 text-center font-semibold">Nutrition levels for 100g</div>
                    </div>
                    <div className="flex flex-wrap col-gap-px bg-gray-200 flex-auto text-5xl font-semibold text-center">
                        <div className="bg-nutri-a flex-1 text-white text-opacity-75 pb-1 rounded-md rounded-t-none rounded-r-none">A</div>
                        <div className="bg-nutri-b flex-1 text-white transform scale-150 text-opacity-100 pb-1">B</div>
                        <div className="bg-nutri-c flex-1 text-white text-opacity-75 pb-1">C</div>
                        <div className="bg-nutri-d flex-1 text-white text-opacity-75 pb-1">D</div>
                        <div className="bg-nutri-e flex-1 text-white text-opacity-75 pb-1">E</div>
                    </div>
                </div>
                <div id="nutri-facts">
                </div>
                <div id="ingredients">
                </div>
                <div id="images">
                </div>
            </div>
            :
            <>
            <div className="p-2 pl-4">
                <div className="font-bold text-4xl text-red-700">pizza</div>
                <div className="font-semibold text-xl">search results</div>
            </div>
            <div className="pt-6 flex flex-wrap content-around justify-center bg-gray-200">
                <div className="mb-6 mx-2 shadow-md w-40 h-48">
                    <div className="h-32 w-full">
                        <img className="object-contain w-full h-full" src={placeholder}></img>
                    </div>
                    <div className="bg-gray-300 h-16 overflow-hidden font-semibold leading-tight text-center">
                        Pizza Guseppe z mięsem wołowym i warzywami - 420gdwadaw d dhwajkd awhd aw 
                    </div>
                </div>
                <div className="mb-6 mx-2 shadow-md w-40 h-48">
                    <div className="h-32 w-full overflow-hidden">
                        <img className="object-contain w-full h-full" src={placeholder2}></img>
                    </div>
                    <div className="bg-gray-300 h-16 overflow-hidden font-semibold leading-tight text-center">
                        Pizza Guseppe z mięsem wołowym i warzywami - 420gdwadaw d dhwajkd awhd aw 
                    </div>
                </div>
                <div className="mb-6 mx-2 shadow-md w-40 h-48">
                    <div className="h-32 w-full overflow-hidden">
                        <img className="object-contain w-full h-full" src={placeholder2}></img>
                    </div>
                    <div className="bg-gray-300 h-16 overflow-hidden font-semibold leading-tight text-center">
                        Pizza Guseppe z mięsem wołowym i warzywami - 420gdwadaw d dhwajkd awhd aw 
                    </div>
                </div>
                <div className="mb-6 mx-2 shadow-md w-40 h-48">
                    <div className="h-32 w-full overflow-hidden">
                        <img className="object-contain w-full h-full" src={placeholder2}></img>
                    </div>
                    <div className="bg-gray-300 h-16 overflow-hidden font-semibold leading-tight text-center">
                        Pizza Guseppe z mięsem wołowym i warzywami - 420gdwadaw d dhwajkd awhd aw 
                    </div>
                </div>
                <div className="mb-6 mx-2 shadow-md w-40 h-48">
                    <div className="h-32 w-full overflow-hidden">
                        <img className="object-contain w-full h-full" src={placeholder2}></img>
                    </div>
                    <div className="bg-gray-300 h-16 overflow-hidden font-semibold leading-tight text-center">
                        Pizza Guseppe z mięsem wołowym i warzywami - 420gdwadaw d dhwajkd awhd aw 
                    </div>
                </div>
            </div>
            <div className=" py-4 font-semibold text-xl text-gray-800 text-center">
                1,2,3,...,498,499
            </div>
            </>
            }
            
        </div>
    )
}
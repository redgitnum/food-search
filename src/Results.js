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
            <div className="flex flex-col w-full h-full bg-orange-400">
                <div id="title" className="flex">
                    <div>
                        <h2>
                        Pizza Guseppe z mięsem wołowym i warzywami, 
                        głęboko mrożona - Dr. Oetker - 420 g
                        </h2>
                        <p>EAN: 5900437005577</p>
                    </div>
                    <div>
                        <div>
                            <img src={placeholder}></img>
                        </div>
                    </div>
                </div>
                <div id="basic-info">
                    <div className="flex flex-wrap m-2 p-2 rounded shadow-md">
                        <div className="bg-green-500 w-1/2 m-1">
                            <div>QUANTITY</div>
                            <div>420 g</div>
                        </div>
                        <div className="bg-green-500 w-1/2 m-1">
                            <div>BRANDS</div>
                            <div>Dr Oetker</div>
                        </div>
                        <div className="bg-green-500 w-1/2">
                            <div>STORES</div>
                            <div>Dino</div>
                        </div>
                        <div className="bg-green-500 w-1/2">
                            <div>COUNTRIES SOLD IN</div>
                            <div>Polska</div>
                        </div>
                    </div>
                </div>
                <div id="warnings">
                </div>
                <div id="nova-group">
                </div>
                <div id="nutrition-levels">
                </div>
                <div id="nutri-score">
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
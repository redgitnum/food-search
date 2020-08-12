import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import placeholder from './front_fr.42.400.jpg'
import placeholder2 from './front_fr.70.400.jpg'
import {ReactComponent as PlaceholderImg} from './placeholder.svg';
import { fetchFood, modalChange } from './features'



export default function() {
    const dispatch = useDispatch()

    const { data, query, page, modal} = useSelector(state => state)

    const [foodIndex, setFoodIndex] = useState(null)
    const [newPage, setNewPage] = useState(page)

    const warningColor = (data) => {
        switch(data) {
            case 'high' : return 'bg-nutri-e';
            case 'moderate' : return 'bg-nutri-d';
            default : return 'bg-nutri-a'
        }
    }    

    const nutriScoreGrade = (realScore, divScore) => {
        if(realScore === divScore) {
            return 'font-bold text-opacity-100 text-6xl'
        }
        return 'text-gray-800 text-opacity-25'
    }
    


    const searchResults = () => {
        return data.count && data.products.map((product, index) => {
            return(
                <div className="mb-6 mx-2 shadow-md w-40 h-48 cursor-pointer" key={product.code} onClick={() => {
                    dispatch(modalChange(true))
                    setFoodIndex(index)
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
                    <div className="bg-gray-300 h-16 overflow-hidden font-semibold leading-tight text-center">
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
            <div className="flex flex-col w-full h-full bg-orange-500 z-50">
                <div id="up-button" className="py-1 pl-3 bg-gray-100 flex text-lg font-medium justify-start items-center cursor-pointer" onClick={() => {
                    dispatch(modalChange(false))
                    setFoodIndex(null)
                    }}>
                &#10554; back to results
                </div>
                <div id="title" className="flex p-3 justify-between">
                    <div className="flex flex-col justify-center items-center font-semibold pr-2">
                        <h2 className="text-white text-xl pr-6">
                        {data.products[foodIndex].product_name_en || data.products[foodIndex].product_name || data.products[foodIndex].brands }
                        </h2>
                    </div>
                    <div>
                        <div className="w-32 border-solid border-2 border-white h-32 p-px rounded-md shadow-card bg-gray-300 overflow-hidden">
                        {data.products[foodIndex].image_small_url ? 
                        <img className="object-contain w-full h-full" src={data.products[foodIndex].image_small_url}></img>
                        :
                        <PlaceholderImg className="object-contain w-full h-full text-white"/>
                        }
                        </div>
                    </div>
                </div>
                <div id="basic-info" className="flex flex-wrap bg-gray-200 m-3 overflow-hidden gap-px rounded-md shadow-card">
                    <div className="flex flex-col items-center bg-green-bright flex-auto w-32 p-2">
                        <div className="text-xs text-gray-800 font-bold">QUANTITY</div>
                        <div className="text-xl font-semibold text-center">{data.products[foodIndex].quantity ? data.products[foodIndex].quantity : '-'}</div>
                    </div>
                    <div className="flex flex-col items-center bg-green-bright flex-auto w-32 p-2">
                        <div className="text-xs text-gray-800 font-bold">BRANDS</div>
                        <div className="text-xl font-semibold text-center">{data.products[foodIndex].brands ? data.products[foodIndex].brands : '-'}</div>
                    </div>
                    <div className="flex flex-col items-center bg-green-bright flex-auto w-32 p-2">
                        <div className="text-xs text-gray-800 font-bold">STORES</div>
                        <div className="text-xl font-semibold text-center">{data.products[foodIndex].stores ? data.products[foodIndex].stores.split(',').join(', ') : '-'}</div>
                    </div>
                    <div className="flex flex-col items-center bg-green-bright flex-auto w-32 p-2">
                        <div className="text-xs text-gray-800 font-bold">COUNTRIES SOLD IN</div>
                        <div className="text-xl font-semibold text-center">
                            {(() => {
                                let countriesString = data.products[foodIndex].countries_tags.map(country => country[3].toUpperCase() + country.slice(4)) || []
                                return(
                                    <div>{countriesString.join(', ')}</div>
                                )
                            })()}
                        </div>
                    </div>
                </div>
                <div id="warnings" className="flex flex-wrap m-3 bg-gray-200 overflow-hidden gap-px rounded-md shadow-card">
                    <div className="flex flex-col items-center bg-red-500 flex-auto w-32 p-2">
                        <div className="text-xs text-gray-200 font-bold">INGREDIENTS ANALYSIS</div>
                        <div className="flex flex-wrap gap-2 p-2 justify-center">
                            {data.products[foodIndex].ingredients_analysis_tags && data.products[foodIndex].ingredients_analysis_tags.map(item => 
                                <div className="bg-red-700 rounded-md p-px px-2 shadow-pill text-gray-100 text-sm text-center font-semibold">{item.slice(3)}</div>
                            )}
                        </div>
                    </div>
                    <div className="flex flex-col items-center bg-red-500 flex-auto w-32 p-2">
                        <div className="text-xs text-gray-200 font-bold">ADDITIVES</div>
                        <div className="flex flex-wrap gap-2 p-2 justify-center">
                            {data.products[foodIndex].additives_tags && data.products[foodIndex].additives_tags.map(additive => 
                                <div className="bg-red-700 rounded-md p-px px-2 shadow-pill text-gray-100 text-sm text-center font-semibold">{additive.slice(3)}</div>
                            )}
                        </div>
                    </div>
                </div>
                {data.products[foodIndex].nova_groups_tags && 
                <div id="nova-group" className="flex flex-wrap m-3 bg-gray-200 overflow-hidden gap-px rounded-md shadow-card">
                    <div className="bg-orange-300 w-full p-2">
                        <div className="text-2xl text-gray-900 text-center font-semibold">NOVA group</div>
                        <div className="bg-red-700 flex justify-center w-20 h-20 my-1 mx-auto rounded-full text-5xl text-gray-300 font-bold">
                            {data.products[foodIndex].nova_groups_tags[0].slice(3,4)}
                        </div>
                        <div className="text-sm text-gray-900 text-center font-semibold">
                            {data.products[foodIndex].nova_groups_tags[0].slice(4).split('-').join(' ')}
                        </div>
                    </div>
                </div> 
                }
                <div id="nutrition-levels" className="flex flex-wrap m-3 bg-gray-200 overflow-hidden gap-px rounded-md shadow-card">
                    <div className="bg-teal-500 w-full p-2">
                        <div className="text-2xl text-gray-200 text-center font-semibold">Nutrition levels for 100g</div>
                    </div>
                    <div className="flex flex-wrap gap-px text-white bg-gray-200 justify-evenly text-center flex-auto font-bold">
                        <div className={`flex flex-col justify-between flex-1 text-xs ${warningColor(data.products[foodIndex].nutrient_levels.fat)} p-2 pb-4`}>
                            <div>FAT</div>
                            <div className="text-xl pt-2">{data.products[foodIndex].nutriments.fat}g</div>
                        </div>
                        <div className={`flex flex-col justify-between flex-1 text-xs ${warningColor(data.products[foodIndex].nutrient_levels.sugars)} p-2 pb-4`}>
                            <div>SUGARS</div>
                            <div className="text-xl pt-2">{data.products[foodIndex].nutriments.sugars}g</div>
                        </div>
                        <div className={`flex flex-col justify-between flex-1 text-xs ${warningColor(data.products[foodIndex].nutrient_levels['saturated-fat'])} p-2 pb-4`}>
                            <div>SATURATED FAT</div>
                            <div className="text-xl pt-2">{data.products[foodIndex].nutriments['saturated-fat']}g</div>
                        </div>
                        <div className={`flex flex-col justify-between flex-1 text-xs ${warningColor(data.products[foodIndex].nutrient_levels.salt)} p-2 pb-4`}>
                            <div>SALT</div>
                            <div className="text-xl pt-2">{data.products[foodIndex].nutriments.salt}g</div>
                        </div>
                    </div>
                </div>
                <div id="nutri-score" className="flex flex-wrap m-3 mb-10 bg-gray-200 gap-px rounded-md shadow-card">
                    <div className="bg-teal-500 w-full p-2 rounded-md rounded-b-none">
                        <div className="text-2xl text-gray-200 text-center font-semibold">Nutri-score</div>
                    </div>
                    <div className="flex flex-wrap col-gap-px flex-auto text-4xl font-semibold text-center">
                        <div className="flex items-center justify-center bg-nutri-a flex-1 pb-1 rounded-md rounded-t-none rounded-r-none">
                            <div className={`text-white text-opacity-75 ${nutriScoreGrade(data.products[foodIndex].nutriscore_grade, 'a')}`}>A</div>
                        </div>
                        <div className="flex items-center justify-center bg-nutri-b flex-1 pb-1">
                            <div className={`text-white text-opacity-75 ${nutriScoreGrade(data.products[foodIndex].nutriscore_grade, 'b')}`}>B</div>
                        </div>
                        <div className="flex items-center justify-center bg-nutri-c flex-1 pb-1">
                            <div className={`text-white text-opacity-75 ${nutriScoreGrade(data.products[foodIndex].nutriscore_grade, 'c')}`}>C</div>
                        </div>
                        <div className="flex items-center justify-center bg-nutri-d flex-1 pb-1">
                            <div className={`text-white text-opacity-75 ${nutriScoreGrade(data.products[foodIndex].nutriscore_grade, 'd')}`}>D</div>
                        </div>
                        <div className="flex items-center justify-center bg-nutri-e flex-1 pb-1 rounded-md rounded-t-none rounded-l-none">
                            <div className={`text-white text-opacity-75 ${nutriScoreGrade(data.products[foodIndex].nutriscore_grade, 'e')}`}>E</div>
                        </div>
                    </div>
                </div>
                <table id="nutri-facts" className="table-auto bg-white text-sm">
                    <thead className="bg-gray-400">
                        <tr>
                        <th className="px-1 text-left font-semibold">Nutrition facts</th>
                        <th className="px-1 text-right font-semibold">As sold for {data.products[foodIndex].nutrition_data_prepared_per || '100g'}</th>
                        <th className="px-3 text-right font-semibold">As sold per serving ({data.products[foodIndex].serving_size})</th>
                        </tr>
                    </thead>
                    <tbody className="bg-gray-300">
                    <tr className="border-b-2 border-white">
                        <td className="px-2">Energy (kJ)</td>
                        <td className="px-2 text-right">{data.products[foodIndex].nutriments['energy-kj_100g'] !== undefined ? data.products[foodIndex].nutriments['energy-kj_100g'] + ' kj' : '?'}</td>
                        <td className="px-2 text-right">{data.products[foodIndex].nutriments['energy-kj_serving'] !== undefined ? data.products[foodIndex].nutriments['energy-kj_serving'] + ' kj' : '?'}</td>
                        </tr>
                        <tr className="border-b-2 border-white">
                        <td className="px-2">Energy (kcal)</td>
                        <td className="px-2 text-right">{data.products[foodIndex].nutriments['energy-kcal_100g'] !== undefined ? data.products[foodIndex].nutriments['energy-kcal_100g'] + ' kcal' : '?'}</td>
                        <td className="px-2 text-right">{data.products[foodIndex].nutriments['energy-kcal_serving'] !== undefined ? data.products[foodIndex].nutriments['energy-kcal_serving'] + ' kcal' : '?'}</td>
                        </tr>
                        <tr className="border-b-2 border-white">
                        <td className="px-2">Energy</td>
                        <td className="px-2 text-right">{data.products[foodIndex].nutriments['energy-kj_100g'] !== undefined ? data.products[foodIndex].nutriments['energy-kj_100g'] + ' kj' : '?'}, {data.products[foodIndex].nutriments['energy-kcal_100g'] !== undefined ? data.products[foodIndex].nutriments['energy-kcal_100g'] + ' kcal' : '?'}</td>
                        <td className="px-2 text-right">{data.products[foodIndex].nutriments['energy-kj_serving'] !== undefined ? data.products[foodIndex].nutriments['energy-kj_serving'] + ' kj, ' : '?'}, {data.products[foodIndex].nutriments['energy-kcal_serving'] !== undefined ? data.products[foodIndex].nutriments['energy-kcal_serving'] + ' kcal' : '?'}</td>
                        </tr>
                        <tr>
                        <td className="px-2">Fat</td>
                        <td className="px-2 text-right">{data.products[foodIndex].nutriments.fat_100g !== undefined ? data.products[foodIndex].nutriments.fat_100g + ' g' : '?'}</td>
                        <td className="px-2 text-right">{data.products[foodIndex].nutriments.fat_serving !== undefined ? data.products[foodIndex].nutriments.fat_serving + ' g' : '?'}</td>
                        </tr>
                        <tr className="bg-gray-200 border-b-2 border-white">
                        <td className="px-2 pl-3">- Saturated fat</td>
                        <td className="px-2 text-right">{data.products[foodIndex].nutriments['saturated-fat_100g'] !== undefined ? data.products[foodIndex].nutriments['saturated-fat_100g'] + ' g' : '?'}</td>
                        <td className="px-2 text-right">{data.products[foodIndex].nutriments['saturated-fat_serving'] !== undefined ? data.products[foodIndex].nutriments['saturated-fat_serving'] + ' g' : '?'}</td>
                        </tr>
                        <tr>
                        <td className="px-2">Carbohydrates</td>
                        <td className="px-2 text-right">{data.products[foodIndex].nutriments.carbohydrates_100g !== undefined ? data.products[foodIndex].nutriments.carbohydrates_100g + ' g' : '?'}</td>
                        <td className="px-2 text-right">{data.products[foodIndex].nutriments.carbohydrates_serving !== undefined ? data.products[foodIndex].nutriments.carbohydrates_serving + ' g' : '?'}</td>
                        </tr>
                        <tr className="bg-gray-200 border-b-2 border-white">
                        <td className="px-2">- Sugars</td>
                        <td className="px-2 text-right">{data.products[foodIndex].nutriments.sugars_100g !== undefined ? data.products[foodIndex].nutriments.sugars_100g + ' g' : '?'}</td>
                        <td className="px-2 text-right">{data.products[foodIndex].nutriments.sugars_serving !== undefined ? data.products[foodIndex].nutriments.sugars_serving + ' g' : '?'}</td>
                        </tr>
                        <tr className="border-b-2 border-white">
                        <td className="px-2">Fibers</td>
                        <td className="px-2 text-right">{data.products[foodIndex].nutriments.fibers_100g !== undefined ? data.products[foodIndex].nutriments.fibers_100g + ' g' : '?'}</td>
                        <td className="px-2 text-right">{data.products[foodIndex].nutriments.fibers_serving !== undefined ? data.products[foodIndex].nutriments.fibers_serving + ' g' : '?'}</td>
                        </tr>
                        <tr className="border-b-2 border-white">
                        <td className="px-2">Proteins</td>
                        <td className="px-2 text-right">{data.products[foodIndex].nutriments.proteins_100g !== undefined ? data.products[foodIndex].nutriments.proteins_100g + ' g' : '?'}</td>
                        <td className="px-2 text-right">{data.products[foodIndex].nutriments.proteins_serving !== undefined ? data.products[foodIndex].nutriments.proteins_serving + ' g' : '?'}</td>
                        </tr>                       
                        <tr>
                        <td className="px-2">Salt</td>
                        <td className="px-2 text-right">{data.products[foodIndex].nutriments.salt_100g !== undefined ? data.products[foodIndex].nutriments.salt_100g + ' g' : '?'}</td>
                        <td className="px-2 text-right">{data.products[foodIndex].nutriments.salt_serving !== undefined ? data.products[foodIndex].nutriments.salt_serving + ' g' : '?'}</td>
                        </tr>
                        <tr className="bg-gray-200">
                        <td className="px-2">- Sodium</td>
                        <td className="px-2 text-right">{data.products[foodIndex].nutriments.sodium_100g !== undefined ? data.products[foodIndex].nutriments.sodium_100g + ' g' : '?'}</td>
                        <td className="px-2 text-right">{data.products[foodIndex].nutriments.sodium_serving !== undefined ? data.products[foodIndex].nutriments.sodium_serving + ' g' : '?'}</td>
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
                    dispatch(modalChange(false))
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
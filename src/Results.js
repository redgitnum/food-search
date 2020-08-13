import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {ReactComponent as PlaceholderImg} from './placeholder.svg';
import { fetchFood, modalChange } from './features'



export default function() {
    const dispatch = useDispatch()

    const { data, query, page, modal} = useSelector(state => state)

    const [foodIndex, setFoodIndex] = useState(null)
    const [newPage, setNewPage] = useState(page)

    useEffect(() => {
        setNewPage(page)
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    }, [page])

    const warningColor = (data) => {
        switch(data) {
            case 'high' : return 'bg-nutri-e';
            case 'moderate' : return 'bg-nutri-d';
            case 'low' : return 'bg-nutri-a';
            default : return 'bg-gray-500'
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
                            <input name="page" value={newPage} onChange={(e) => {
                                if(e.target.value >= maxPage) {
                                    setNewPage(maxPage)
                                } else setNewPage(Number(e.target.value))
                                
                                }} type="number" min="1" max={Math.ceil(maxPage).toString()} className="appearance-hide text-center w-full"></input>
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
        <>
        {data.count ?
        <div className="pt-16 flex flex-col bg-gray-100">
            {modal ?
            <div className="flex flex-col w-full h-full bg-orange-500 max-w-screen-md mx-auto">
                <div id="fast-back-button" className="py-1 pl-3 bg-gray-100 flex text-lg sm:text-2xl font-medium justify-start items-center cursor-pointer" onClick={() => {
                    dispatch(modalChange(false))
                    setFoodIndex(null)
                    }}>
                &#10554; back to results
                </div>
                {!data.products[foodIndex].complete ?
                    <div id="entry-incomplete" className="p-3 bg-red-300 font-semibold text-lg">
                        This product page is not complete. 
                        You can help to complete it by going to <a href={data.products[foodIndex].url} target="_blank" className="underline">Open Food Facts product page</a> and editing or adding more data.
                    </div>
                : null}
                <div id="title" className="flex p-3 justify-between sm:justify-center">
                    <div className="flex flex-col justify-center items-center font-semibold pr-2">
                        <h2 className="text-white text-xl sm:text-3xl pr-6">
                        {data.products[foodIndex].product_name_en || data.products[foodIndex].product_name || data.products[foodIndex].brands }
                        </h2>
                    </div>
                    <div>
                        <div className="w-32 h-32 sm:w-48 sm:h-48 border-solid border-2 border-white p-px rounded-md shadow-card bg-gray-300 overflow-hidden">
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
                {(data.products[foodIndex].ingredients_analysis_tags && data.products[foodIndex].additives_tags) &&
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
                }
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
                            <div>FAT</div>                                                                          {/* removing extra zeroes below*/}
                            <div className="text-xl pt-2">{data.products[foodIndex].nutriments.fat !== undefined ? +Number(data.products[foodIndex].nutriments.fat).toFixed(3) + 'g' : '-'}</div>
                        </div>
                        <div className={`flex flex-col justify-between flex-1 text-xs ${warningColor(data.products[foodIndex].nutrient_levels.sugars)} p-2 pb-4`}>
                            <div>SUGARS</div>
                            <div className="text-xl pt-2">{data.products[foodIndex].nutriments.sugars !== undefined ? +Number(data.products[foodIndex].nutriments.sugars).toFixed(3) + 'g' : '-'}</div>
                        </div>
                        <div className={`flex flex-col justify-between flex-1 text-xs ${warningColor(data.products[foodIndex].nutrient_levels['saturated-fat'])} p-2 pb-4`}>
                            <div>SATURATED FAT</div>
                            <div className="text-xl pt-2">{data.products[foodIndex].nutriments['saturated-fat'] !== undefined ? +Number(data.products[foodIndex].nutriments['saturated-fat']).toFixed(3) + 'g' : '-'}</div>
                        </div>
                        <div className={`flex flex-col justify-between flex-1 text-xs ${warningColor(data.products[foodIndex].nutrient_levels.salt)} p-2 pb-4`}>
                            <div>SALT</div>
                            <div className="text-xl pt-2">{data.products[foodIndex].nutriments.salt !== undefined ? +Number(data.products[foodIndex].nutriments.salt).toFixed(3) + 'g' : '-'}</div>
                        </div>
                    </div>
                </div>
                {data.products[foodIndex].nutriscore_grade !== undefined && 
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
                }
                <table id="nutri-facts" className="table-auto w-full bg-white text-sm">
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
                        <td className="px-2 text-right">{data.products[foodIndex].nutriments['energy-kj_100g'] !== undefined ? +Number(data.products[foodIndex].nutriments['energy-kj_100g']).toFixed(2) + ' kj' : '?'}</td>
                        <td className="px-2 text-right">{data.products[foodIndex].nutriments['energy-kj_serving'] !== undefined ? +Number(data.products[foodIndex].nutriments['energy-kj_serving']).toFixed(2) + ' kj' : '?'}</td>
                        </tr>
                        <tr className="border-b-2 border-white">
                        <td className="px-2">Energy (kcal)</td>
                        <td className="px-2 text-right">{data.products[foodIndex].nutriments['energy-kcal_100g'] !== undefined ? +Number(data.products[foodIndex].nutriments['energy-kcal_100g']).toFixed(2) + ' kcal' : '?'}</td>
                        <td className="px-2 text-right">{data.products[foodIndex].nutriments['energy-kcal_serving'] !== undefined ? +Number(data.products[foodIndex].nutriments['energy-kcal_serving']).toFixed(2) + ' kcal' : '?'}</td>
                        </tr>
                        <tr className="border-b-2 border-white">
                        <td className="px-2">Energy</td>
                        <td className="px-2 text-right">{data.products[foodIndex].nutriments['energy-kj_100g'] !== undefined ? +Number(data.products[foodIndex].nutriments['energy-kj_100g']).toFixed(2) : '?'} kj, {data.products[foodIndex].nutriments['energy-kcal_100g'] !== undefined ? +Number(data.products[foodIndex].nutriments['energy-kcal_100g']).toFixed(2) : '?'} kcal</td>
                        <td className="px-2 text-right">{data.products[foodIndex].nutriments['energy-kj_serving'] !== undefined ? +Number(data.products[foodIndex].nutriments['energy-kj_serving']).toFixed(2) : '?'} kj, {data.products[foodIndex].nutriments['energy-kcal_serving'] !== undefined ? +Number(data.products[foodIndex].nutriments['energy-kcal_serving']).toFixed(2) : '?'} kcal</td>
                        </tr>
                        <tr>
                        <td className="px-2">Fat</td>
                        <td className="px-2 text-right">{data.products[foodIndex].nutriments.fat_100g !== undefined ? +Number(data.products[foodIndex].nutriments.fat_100g).toFixed(2) + ' g' : '?'}</td>
                        <td className="px-2 text-right">{data.products[foodIndex].nutriments.fat_serving !== undefined ? +Number(data.products[foodIndex].nutriments.fat_serving).toFixed(2) + ' g' : '?'}</td>
                        </tr>
                        <tr className="bg-gray-200 border-b-2 border-white">
                        <td className="px-2 pl-3">- Saturated fat</td>
                        <td className="px-2 text-right">{data.products[foodIndex].nutriments['saturated-fat_100g'] !== undefined ? +Number(data.products[foodIndex].nutriments['saturated-fat_100g']).toFixed(2) + ' g' : '?'}</td>
                        <td className="px-2 text-right">{data.products[foodIndex].nutriments['saturated-fat_serving'] !== undefined ? +Number(data.products[foodIndex].nutriments['saturated-fat_serving']).toFixed(2) + ' g' : '?'}</td>
                        </tr>
                        <tr>
                        <td className="px-2">Carbohydrates</td>
                        <td className="px-2 text-right">{data.products[foodIndex].nutriments.carbohydrates_100g !== undefined ? +Number(data.products[foodIndex].nutriments.carbohydrates_100g).toFixed(2) + ' g' : '?'}</td>
                        <td className="px-2 text-right">{data.products[foodIndex].nutriments.carbohydrates_serving !== undefined ? +Number(data.products[foodIndex].nutriments.carbohydrates_serving).toFixed(2) + ' g' : '?'}</td>
                        </tr>
                        <tr className="bg-gray-200 border-b-2 border-white">
                        <td className="px-2">- Sugars</td>
                        <td className="px-2 text-right">{data.products[foodIndex].nutriments.sugars_100g !== undefined ? +Number(data.products[foodIndex].nutriments.sugars_100g).toFixed(2) + ' g' : '?'}</td>
                        <td className="px-2 text-right">{data.products[foodIndex].nutriments.sugars_serving !== undefined ? +Number(data.products[foodIndex].nutriments.sugars_serving).toFixed(2) + ' g' : '?'}</td>
                        </tr>
                        <tr className="border-b-2 border-white">
                        <td className="px-2">Fibers</td>
                        <td className="px-2 text-right">{data.products[foodIndex].nutriments.fibers_100g !== undefined ? +Number(data.products[foodIndex].nutriments.fibers_100g).toFixed(2) + ' g' : '?'}</td>
                        <td className="px-2 text-right">{data.products[foodIndex].nutriments.fibers_serving !== undefined ? +Number(data.products[foodIndex].nutriments.fibers_serving).toFixed(2) + ' g' : '?'}</td>
                        </tr>
                        <tr className="border-b-2 border-white">
                        <td className="px-2">Proteins</td>
                        <td className="px-2 text-right">{data.products[foodIndex].nutriments.proteins_100g !== undefined ? +Number(data.products[foodIndex].nutriments.proteins_100g).toFixed(2) + ' g' : '?'}</td>
                        <td className="px-2 text-right">{data.products[foodIndex].nutriments.proteins_serving !== undefined ? +Number(data.products[foodIndex].nutriments.proteins_serving).toFixed(2) + ' g' : '?'}</td>
                        </tr>                       
                        <tr>
                        <td className="px-2">Salt</td>
                        <td className="px-2 text-right">{data.products[foodIndex].nutriments.salt_100g !== undefined ? +Number(data.products[foodIndex].nutriments.salt_100g).toFixed(2) + ' g' : '?'}</td>
                        <td className="px-2 text-right">{data.products[foodIndex].nutriments.salt_serving !== undefined ? +Number(data.products[foodIndex].nutriments.salt_serving).toFixed(2) + ' g' : '?'}</td>
                        </tr>
                        <tr className="bg-gray-200">
                        <td className="px-2">- Sodium</td>
                        <td className="px-2 text-right">{data.products[foodIndex].nutriments.sodium_100g !== undefined ? +Number(data.products[foodIndex].nutriments.sodium_100g).toFixed(2) + ' g' : '?'}</td>
                        <td className="px-2 text-right">{data.products[foodIndex].nutriments.sodium_serving !== undefined ? +Number(data.products[foodIndex].nutriments.sodium_serving).toFixed(2) + ' g' : '?'}</td>
                        </tr>
                    </tbody>
                    </table>
                {data.products[foodIndex].ingredients_text && 
                <div id="ingredients" className="m-3">
                    <h2 className="text-white text-lg mb-1">
                    Ingredients
                    </h2>
                    <span className="text-gray-200 text-sm font-semibold">
                    {data.products[foodIndex].ingredients_text}
                    </span>
                    {data.products[foodIndex].allergens_tags.length ? 
                    <div className="text-white text-md font-bold mt-2">
                    Substances or products causing allergies or intolerances: {(data.products[foodIndex].allergens_tags.map(allergen => allergen.slice(3))).join(', ')}
                    </div>
                    : null
                    }
                </div>
                }
                {(  
                    data.products[foodIndex].image_url || 
                    data.products[foodIndex].image_nutrition_url ||
                    data.products[foodIndex].image_ingredients_url 
                ) &&
                <div id="images" className="m-3">
                    <h2 className="text-white text-lg mb-2">
                    Images
                    </h2>
                    {data.products[foodIndex].image_url && 
                    <div className="mb-2 mx-auto border-solid border-2 border-white h-full w-full max-w-md p-px rounded-md shadow-card bg-gray-300 overflow-hidden">
                        <img className="mx-auto object-contain h-auto w-auto" src={data.products[foodIndex].image_url}></img>
                    </div>
                    }
                    {data.products[foodIndex].image_nutrition_url &&
                    <div className="mb-2 mx-auto border-solid border-2 border-white h-full w-full max-w-md p-px rounded-md shadow-card bg-gray-300 overflow-hidden">
                        <img className="mx-auto  object-contain h-auto w-auto" src={data.products[foodIndex].image_nutrition_url}></img>
                    </div>
                    }
                    {data.products[foodIndex].image_ingredients_url &&
                    <div className="mb-2 mx-auto border-solid border-2 border-white h-full w-full max-w-md p-px rounded-md shadow-card bg-gray-300 overflow-hidden">  
                        <img className="mx-auto  object-contain h-auto w-auto" src={data.products[foodIndex].image_ingredients_url}></img>   
                    </div>
                    }
                </div>
                }
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
                <div id="creator-credit-search" className="bg-red-300 p-2 font-semibold text-center text-sm">
                    All of the data and images comes from the&nbsp;<a target="_blank" href="https://world.openfoodfacts.org/" className="underline">openfoodfacts.org</a> database. 
                    Those elements are licenced under the&nbsp;
                    <a target="_blank" href="https://creativecommons.org/licenses/by-sa/4.0/" className="underline">Creative Commons Attribution-ShareAlike 4.0 International license</a> and&nbsp;
                    <a target="_blank" href="https://opendatacommons.org/licenses/odbl/1-0/" className="underline">Open Data Commons Open Database License</a>.
                </div>
            </div>
            :
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
            <div id="creator-credit-search" className="bg-red-300 p-2 font-semibold text-center text-sm">
            All of the data and images comes from the&nbsp;<a target="_blank" href="https://world.openfoodfacts.org/" className="underline">openfoodfacts.org</a> database. 
            Those elements are licenced under the&nbsp;
             <a target="_blank" href="https://creativecommons.org/licenses/by-sa/4.0/" className="underline">Creative Commons Attribution-ShareAlike 4.0 International license</a> and&nbsp;
             <a target="_blank" href="https://opendatacommons.org/licenses/odbl/1-0/" className="underline">Open Data Commons Open Database License</a>.
            </div>
            </>
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
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchFood, modalChange } from '../features'

export default function() {
    const dispatch = useDispatch()

    const { query, page } = useSelector(state => state)

    const searchFood = (e) => {
        e.preventDefault()
        dispatch(modalChange(false))
        if(e.target.searchInput.value.trim() !== query || page !== 1) {
            dispatch(fetchFood({
                value: e.target.searchInput.value.trim(), 
                page: 1
            }))
        }
    }
    return(
        <div className="fixed w-full">
            <form onSubmit={searchFood} className='flex relative'>
                <input
                name="searchInput"
                placeholder='searchbar'
                className='h-16 w-full  text-3xl shadow appearance-none border py-2 px-3 text-gray-900 leading-tight focus:outline-none focus:shadow-outline'
                />
                <button type='submit' className="w-16 h-16 absolute right-0">
                    <svg version="1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" enableBackground="new 0 0 48 48">
                        <g fill="#616161">
                            <rect x="34.6" y="28.1" transform="matrix(.707 -.707 .707 .707 -15.154 36.586)" width="4" height="17"/>
                            <circle cx="20" cy="20" r="16"/>
                        </g>
                        <rect x="36.2" y="32.1" transform="matrix(.707 -.707 .707 .707 -15.839 38.239)" fill="#37474F" width="4" height="12.3"/>
                        <circle fill="#64B5F6" cx="20" cy="20" r="13"/>
                        <path fill="#BBDEFB" d="M26.9,14.2c-1.7-2-4.2-3.2-6.9-3.2s-5.2,1.2-6.9,3.2c-0.4,0.4-0.3,1.1,0.1,1.4c0.4,0.4,1.1,0.3,1.4-0.1 C16,13.9,17.9,13,20,13s4,0.9,5.4,2.5c0.2,0.2,0.5,0.4,0.8,0.4c0.2,0,0.5-0.1,0.6-0.2C27.2,15.3,27.2,14.6,26.9,14.2z"/>
                    </svg>
                </button>
            </form>
        </div>
    )
}
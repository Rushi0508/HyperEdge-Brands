import { Input } from '@/components/ui/input'
import React, { useRef } from 'react'

function SearchBar({ setCategories }: any) {
    const inputRef = useRef<any>(null);
    const handleSearch = () => {
        setCategories(inputRef.current.value)
    }
    return (

        <>
            <div className="flex">
                <label htmlFor="search-dropdown" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Your Email</label>
                <button onClick={() => setCategories("AI")} id="dropdown-button" data-dropdown-toggle="dropdown" className="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-s-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600" type="button">AI Recommend
                </button>
                <div className="relative w-full">
                    <input ref={inputRef} type="search" id="search-dropdown" className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 outline-none  rounded-e-lg border-s-gray-50 border-s-[1px] border border-gray-300 focus:ring-[#e53e62] focus:border-[#e53e62]" placeholder="Search categories (Ex-Fitness, Blogs...)" required />
                    <button onClick={handleSearch} type="submit" className="absolute top-0 end-0 p-2.5 text-sm font-medium h-full text-white bg-[#E11D48] rounded-e-lg border border-[#E11D48] hover:bg-[#e53e62] focus:outline-none focus:ring-[#e53e62] dark:bg-[#E11D48] dark:hover:bg-[#E11D48] dark:focus:ring-[#E11D48]">
                        <svg className="w-8 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                        </svg>
                        <span className="sr-only">Search</span>
                    </button>
                </div>
            </div>
        </>

    )
}

export default SearchBar
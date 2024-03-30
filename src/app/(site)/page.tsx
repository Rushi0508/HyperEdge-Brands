'use client'
import { useEffect, useState } from 'react';
import CreatorBox from './components/CreatorBox';
import axios from 'axios';
import toast from 'react-hot-toast';
import Loading from './loading';
import SearchBar from './components/SearchBar';

function page() {
  const [creators, setCreators] = useState<any>(null);
  const [dataLoading, setDataLoading] = useState(true);
  const [categories, setCategories] = useState("")
  useEffect(() => {
    async function fetchCreators() {
      setDataLoading(true)
      try {
        const { data } = await axios.post('/api/creators', { query: categories })
        if (data.hasOwnProperty('success')) {
          setCreators(data.creators)
        } else {
          toast.error("Cannot fetch creators")
        }
      } catch (e) {
        toast.error("Cannot fetch creators")
      } finally {
        setDataLoading(false)
      }
    }
    fetchCreators()
  }, [categories])
  return (
    <>
      <div className='my-5 w-3/5'>
        <SearchBar setCategories={setCategories} />
      </div>
      {
        dataLoading ? <Loading /> :
          <>
            {
              categories == "AI" ?
                <p className='text-sm italic text-gray-500'>Showing cretors based on AI Recommendation</p> :
                <p className='text-sm italic text-gray-500'>Showing {categories ? "" : "all"} creators {categories ? "based on selected categories" : ""}</p>
            }{
              creators?.map((creator: any, index: any) => (
                <CreatorBox key={index} creator={creator} />
              ))

            }
          </>
      }
    </>
  )
}

export default page
import { Button } from '@material-tailwind/react'
import React, { useEffect, useState } from 'react'
import Cards from './Cards'
import { useGetHotelsByLocationHomeMutation } from '../services/getAllHotelsApiSlice'

const LocationWiseHotels = () => {

    const [hotels,setHotels]=useState([])
    const [location,setLocation]=useState('mumbai')

    const [getHotelsByLocationHome] = useGetHotelsByLocationHomeMutation()
    
    const handleGetHotelByLocationHome = async (hotelLocation) => {
      setLocation(hotelLocation)
        const response = await getHotelsByLocationHome({ location: hotelLocation })
            setHotels(response?.data?.response)
    }


    useEffect(()=>{
      handleGetHotelByLocationHome('kochi')
    },[])

  return (
    <div className="">
    <h1
    className="font-bold text-2xl mb-[8px] mt-[24px] font-custom"
    >Take a dip at these top-rated hotels</h1>

    <div className="flex gap-10 shadow-gray-500 w-fit border-b-2">
      <Button
        onClick={()=>{
            handleGetHotelByLocationHome('kochi')
        }}
      size="sm"  className={`bg-transparent  text-black px-0 ${location==='kochi' && 'border-b-2 border-b-black rounded-none'} `}>Mumbai</Button>
      <Button
              onClick={()=>{
                handleGetHotelByLocationHome('delhi')
            }}
      size="sm"  className={`bg-transparent text-black px-0 ${location==='delhi' && 'border-b-2 border-b-black rounded-none'}`}>Delhi</Button>
      <Button 
              onClick={()=>{
                handleGetHotelByLocationHome('chennai')
            }}
      size="sm"  className={`bg-transparent text-black px-0 ${location==='chennai' && 'border-b-2 border-b-black rounded-none'}`}>Chennai</Button>
     
    </div>
      <Cards hotels={hotels}/>
    </div>
  )
}

export default LocationWiseHotels

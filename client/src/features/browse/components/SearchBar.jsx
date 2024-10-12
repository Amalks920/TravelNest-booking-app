import React, { useState } from 'react'
import { Button, Input, Popover, PopoverContent, PopoverHandler, select } from '@material-tailwind/react'
import DatePicker from '../../../components/form/DatePicker'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { selectLocation, selectNoOfAdults, selectNoOfChildrens, updateLocation, updateNoOfGuests, updateSearchResult } from '../../../services/searchSlice'
import SelectCount from './SelectCount'
import { useSearchMutation } from "../services/searchApiSlice";
import { selectCheckIn, selectCheckOut } from '../../../services/searchSlice'


const SearchBar = () => {
  const dispatch=useDispatch()
  const location = useSelector(selectLocation)

  const noOfAdults=useSelector(selectNoOfAdults)
  const noOfChildrens=useSelector(selectNoOfChildrens)
  const checkIn=useSelector(selectCheckIn)
  const checkOut=useSelector(selectCheckOut)


  const [counts, setCounts] = useState([1, 0]);

   const [search,{isError,isLoading}]=useSearchMutation()



   const handleSearch = async () => {
    try {

      console.log(checkIn,checkOut,'chout')
      console.log(noOfChildrens,'noOfCHilrens')
      const response = await search({
        location: location,
        checkIn: checkIn,
        checkOut: checkOut,
        roomType: 'double',
        noOfAdults:noOfAdults,
        noOfChildrens:noOfChildrens
      });
      
      console.log(response);
      dispatch(updateSearchResult(response.data.response));
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

console.log(noOfChildrens)
          
  return (

<div className='flex  mt-[40px] h-[60px] rounded-md shadow-xl bg-white border-2'>
    <div className="border-r-4 w-[28.98%] flex justify-start items-center">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 mr-2 ms-2 mt-1">
        <path fill-rule="evenodd" d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z" clip-rule="evenodd" />
      </svg>
      <Input
      value={location}
      onChange={(e)=>{
          dispatch(updateLocation(e.target.value))
      }}
      variant="standard" label="Location" size='2xl' className='border-none'/>
    </div>
    <div className=" w-[32.4%]  border-r-4 ">
      <div className='flex max-w-[300px]'>
      <div className='w-full'><DatePicker label='checkin'/></div>
      <div className=' w-full'><DatePicker label='checkout'/></div>
      </div>

    </div>

    <div className="w-[24.4%] flex border-2 border-transparent rounded-2xl border-r-4 gap-4 items-center hover:border-2 hover:border-blue-400 hover:cursor-pointer ps-2">
  
  <Popover placement='bottom' className="flex items-center gap-4"> {/* New Parent Div */}
    <svg xmlns="http://www.w3.org/2000/svg" fill='black' viewBox="0 0 640 512" width={20}>
      <path d="M144 0a80 80 0 1 1 0 160A80 80 0 1 1 144 0zM512 0a80 80 0 1 1 0 160A80 80 0 1 1 512 0zM0 298.7C0 239.8 47.8 192 106.7 192l42.7 0c15.9 0 31 3.5 44.6 9.7c-1.3 7.2-1.9 14.7-1.9 22.3c0 38.2 16.8 72.5 43.3 96c-.2 0-.4 0-.7 0L21.3 320C9.6 320 0 310.4 0 298.7zM405.3 320c-.2 0-.4 0-.7 0c26.6-23.5 43.3-57.8 43.3-96c0-7.6-.7-15-1.9-22.3c13.6-6.3 28.7-9.7 44.6-9.7l42.7 0C592.2 192 640 239.8 640 298.7c0 11.8-9.6 21.3-21.3 21.3l-213.3 0zM224 224a96 96 0 1 1 192 0 96 96 0 1 1 -192 0zM128 485.3C128 411.7 187.7 352 261.3 352l117.3 0C452.3 352 512 411.7 512 485.3c0 14.7-11.9 26.7-26.7 26.7l-330.7 0c-14.7 0-26.7-11.9-26.7-26.7z"/>
    </svg>
  
    <PopoverHandler>
      <button>
      <p className='font-custom text-xs'>Guests and Rooms</p>   
      <p className='font-custom font-bold'>
        <span> {counts[0]+counts[1]>1?counts[0]+counts[1]:noOfAdults+noOfChildrens} Guests</span>,
        <span> {0} Rooms</span> 
      
      </p>
      </button>
      </PopoverHandler>


      <PopoverContent className='shadow-gray-400 mt-2 ms-20'>
        <SelectCount counts={counts} setCounts={setCounts}/>
      </PopoverContent>

  </Popover>




</div>





    <Link to={'/search-page'} className=" w-[15%] flex justify-center py-2">
      <Button 
      onClick={()=>{
        handleSearch()
        dispatch(updateNoOfGuests({noOfAdults:counts[0],noOfChildrens:counts[1]}))
      }}
      color='blue' className='w-[90%]'>Search</Button>
    </Link>
</div>
  )
} 

export default SearchBar



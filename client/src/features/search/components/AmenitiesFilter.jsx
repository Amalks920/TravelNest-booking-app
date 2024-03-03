import { Checkbox } from "@material-tailwind/react";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { updateAmenities,selectAminities, removeFromAmenities, clearAmenities } from "../../../services/searchSlice";




const AmenitiesFilter=()=>{
    const dispatch=useDispatch()
   const amenities=useSelector(selectAminities)
    //const [amenities,setAmenities]=useState([]);
    // const acRef=useRef(null)
    // const [isAcChecked,setIsAcChecked]=useState(false)
    // const wifiRef=useRef(null)
    // const [isWifiChecked,setIsWifiChecked]=useState(false)

    useEffect(()=>{
      dispatch(clearAmenities())
    },[])

    return (
        <div className="w-full hidden">
        <div className="flex  justify-left gap-5  ">
          <div className="flex justify-end mt-3 ms-3">
            <input
           // inputRef={acRef}
              className="w-4 h-4 bg-black md:w-3 md:h-3"
              onInput={(e)=>{
                
                const index=amenities.findIndex((el)=>el==='AC')
                console.log(index,'indexx')
                if(index==-1)  dispatch(updateAmenities(e.target.value))
                else dispatch(removeFromAmenities(index))
                // setIsAcChecked(!isAcChecked)
                // console.log(acRef)
                // console.log(acRef.current)
                // if(!isAcChecked) acRef.current=e.target.value
                // else acRef.current=null
                // console.log(acRef)
              }}
              type="checkbox"
              name="amenities"
              value={'AC'}
              size={"sm"}
            />
          </div>
          <h2 className="mt-3  flex justify-between w-[50%] text-[0.9rem] ms-5">
            <span className="flex gap-5"> 
            <svg className="md:w-4 md:h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 22 17"> <path fill="black" fill-rule="evenodd" d="M20.172 0H1.832C.823 0 0 .792 0 1.767v6.422c0 .971.823 1.763 1.832 1.763h18.336C21.177 9.952 22 9.16 22 8.189V1.767C22.004.792 21.181 0 20.172 0zm.712 8.277a.61.61 0 0 1-.617.604H1.737a.61.61 0 0 1-.617-.604V1.683a.61.61 0 0 1 .617-.604h18.526a.61.61 0 0 1 .617.604v6.594h.004zm-2.315-1.85H3.435c-.338 0-.61.218-.61.49 0 .27.272.49.61.49h15.13c.338 0 .61-.22.61-.49 0-.272-.272-.49-.606-.49zm-4.965-3.001H8.049c-.124 0-.224.219-.224.49 0 .27.1.49.224.49h5.553c.124 0 .224-.22.224-.49 0-.271-.1-.49-.222-.49zm-9.03 8.996a3.31 3.31 0 0 0-.291-.559c-.148-.213-.08-.495.154-.63a.529.529 0 0 1 .69.14c.1.145.242.392.38.72.488 1.153.55 2.383-.103 3.545a4.304 4.304 0 0 1-.666.885.534.534 0 0 1-.706.04.43.43 0 0 1-.044-.645 3.39 3.39 0 0 0 .526-.697c.503-.896.454-1.866.06-2.8zm3.599 0a3.31 3.31 0 0 0-.292-.559c-.148-.213-.079-.495.155-.63a.529.529 0 0 1 .69.14c.1.145.241.392.38.72.487 1.153.55 2.383-.103 3.545a4.304 4.304 0 0 1-.667.885.534.534 0 0 1-.706.04.43.43 0 0 1-.043-.645 3.39 3.39 0 0 0 .526-.697c.503-.896.454-1.866.06-2.8zm9.002 0c-.394.933-.443 1.903.06 2.8.135.24.309.472.525.696a.43.43 0 0 1-.043.645.534.534 0 0 1-.706-.04 4.304 4.304 0 0 1-.666-.885c-.653-1.162-.59-2.392-.104-3.545.14-.328.28-.575.38-.72a.529.529 0 0 1 .69-.14c.234.135.303.417.155.63a3.31 3.31 0 0 0-.291.559zm-3.603 0c-.395.933-.443 1.903.06 2.8.135.24.309.472.525.696a.43.43 0 0 1-.043.645.534.534 0 0 1-.706-.04 4.304 4.304 0 0 1-.666-.885c-.653-1.162-.59-2.392-.104-3.545.14-.328.28-.575.38-.72a.529.529 0 0 1 .69-.14c.234.135.303.417.155.63a3.31 3.31 0 0 0-.291.559z"></path> </svg>
               <span className="ms-4 md:text-[0.8rem]">AC</span>
               </span> 
          </h2>
        </div>
        <div className="flex  justify-left gap-5   ">
          <div className="-mb-[100px] mt-3 ms-3">
            <input
              className="w-4 h-4 rounded-md md:w-3 md:h-3"
              onInput={(e)=>{
                const index=amenities.findIndex((el)=>el==='WIFI')
                if(index===-1)  dispatch(updateAmenities(e.target.value))
                else dispatch(dispatch(removeFromAmenities(index)))
               
                console.log(amenities)
              }}
              type="checkbox"
              value={'WIFI'}
              name="amenities"
              size={"sm"}
            />
          </div>

          <h2 className="mt-3  flex justify-between w-[50%] text-[0.9rem] ms-5">
            <span className="flex gap-4">
              <svg
                className="md:w-4 md:h-4"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M8.288 15.038a5.25 5.25 0 0 1 7.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 0 1 1.06 0Z"
                />
              </svg>
              <span className="ms-4 md:text-[0.8rem]">WIFI</span>
            </span>
            
          </h2>
        </div>

        <div className="flex  justify-left gap-5   ">
          <div className="-mb-[100px] mt-3 ms-3">
            <input
              className="w-4 h-4 rounded-md md:w-3 md:h-3"
              onInput={(e)=>{
                const index=amenities.findIndex((el)=>el==='TV')
                if(index===-1)  dispatch(updateAmenities(e.target.value))
                else dispatch(dispatch(removeFromAmenities(index)))
              }}
              type="checkbox"
              value={'TV'}
              name="amenities"
              size={"sm"}
            />
          </div>

          <h2 className="mt-3  flex justify-between w-[50%] text-[0.9rem] ms-5">
            <span className="flex gap-4 ">
              <svg
              className="md:w-4 md:h-4"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M8.288 15.038a5.25 5.25 0 0 1 7.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 0 1 1.06 0Z"
                />
              </svg>
              <span className="ms-4 md:text-[0.8rem]">TV</span>
            </span>
            
          </h2>
        </div>



      </div>
    )
}

export default AmenitiesFilter;
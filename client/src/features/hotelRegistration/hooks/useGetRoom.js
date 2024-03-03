import { useDispatch, useSelector } from "react-redux"
import { selectRoomById } from "../../hotelManagement/services/hotelListSlice"
import { updateEditRoomFormSlice } from "../services/editRoomFormSlice"


const useGetRoom=(room_id)=>{
    if(!room_id) return 
    const dispatch=useDispatch()
    const room=useSelector((state)=>selectRoomById(state,room_id))
      const [{
        roomType,
        noOfRooms,
        amenities,
        rate,
        size,
        bathroomType,
        description,
        images
      }]=room
      console.log(noOfRooms)

      dispatch(updateEditRoomFormSlice({
        roomType,
        noOfRooms,
        amenities,
        rate,
        size,
        bathroomType,
        description,
        images
      }))
      return images
}

export default useGetRoom;
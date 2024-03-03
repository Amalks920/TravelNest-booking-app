import { createSlice } from "@reduxjs/toolkit";

const initialState={
    searchResult:[],
    isSearchBarOpen:false,
    priceRange:{},
    location:'',
    checkIn:'',
    checkOut:'',
    roomType:'',
    aminities:[]
  
}

const searchSlice=createSlice({
    name:'search',
    initialState,

    reducers:{
        updateIsSearchBarOpen:(state,action)=>{
            state.isSearchBarOpen=action.payload
            state.priceRange={}
        },

        updateLocation:(state,action)=>{
            state.location=action.payload
            state.priceRange={}
        },
        updateCheckIn:(state,action)=>{
            state.checkIn=action.payload
            state.priceRange={}
        },
        updateCheckOut:(state,action)=>{
            state.checkOut=action.payload
            state.priceRange={}
        },
        updateRoomType:(state,action)=>{
            state.roomType=action.payload
            state.priceRange={}
        },
        updateSearchResult:(state,action)=>{
            state.searchResult=action.payload
        },
        updatePriceRange:(state,action)=>{
            console.log(action.payload)
            state.priceRange=action.payload;
            
        },
        updateAllDetails:(state,action)=>{
            const {location, checkIn, checkOut, roomType}=action.payload
            state.location=location
            state.checkIn=checkIn
            state.checkOut=checkOut
            state.roomType=roomType
        },
        updateAmenities:(state,action)=>{
           console.log('update amenties')
            state.aminities.push(action.payload)
        },
        removeFromAmenities:(state,action)=>{
            if(state.aminities.length==0) return state.aminities.push(action.payload)
           const arr1= state.aminities.slice(0,Number(action.payload))
           const arr2=state.aminities.slice(Number(action.payload)+1,state.aminities.length+1)
            state.aminities=[...arr1,...arr2]
        },
        clearAmenities:(state,action) =>{
            state.aminities=[]
        }
    }

})

export const selectIsSearchBarOpen=(state)=>state.persistedSlice.search.isSearchBarOpen;
export const selectLocation=(state)=>state.persistedSlice.search.location;
export const selectCheckIn=(state)=>state.persistedSlice.search.checkIn;
export const selectCheckOut=(state)=>state.persistedSlice.search.checkOut;
export const selectRoomType=(state)=>state.persistedSlice.search.roomType;
export const selectSearchResult=(state)=>state.persistedSlice.search.searchResult;
export const selectPriceRange=(state) => state.persistedSlice.search.priceRange;
export const selectAminities=(state) => state.persistedSlice.search.aminities;

export default searchSlice.reducer
export const {updateIsSearchBarOpen,updateLocation,updateCheckIn,
              updateCheckOut,updateRoomType,updateSearchResult,
              updatePriceRange,updateAllDetails,updateAmenities,
              removeFromAmenities,clearAmenities
             }=searchSlice.actions
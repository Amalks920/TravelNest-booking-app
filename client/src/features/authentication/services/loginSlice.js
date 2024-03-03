import { createSlice } from "@reduxjs/toolkit";


const authSlice=createSlice({
    name:'auth',
    initialState:{
        user:{},
        admin:{},
        owner:{}    
    },
    reducers:{

        setCredentials:(state,action)=>{
            const user=action.payload;
            state.user=user
        },

        setOwnerCredentials:(state,action)=>{
        const owner=action.payload
        state.owner=owner
        },

        setAdminCredentials:(state,action)=>{
        const admin=action.payload;
        state.admin=admin
        },

        logout:(state,action)=>{
            state.user={}
        },

        logoutOwner:(state,action)=>{
            state.owner={}
        },

        logoutAdmin:(state,action)=>{
            state.admin={}
        }

    }
})


export const {setCredentials,setOwnerCredentials,setAdminCredentials,logout,logoutOwner,logoutAdmin}=authSlice.actions;

export const selectToken=(state)=>state?.persistedSlice.auth?.user?.accessToken;
export const selectUserName=(state)=>state?.persistedSlice.auth?.user?.username;
export const selectOwnerToken=(state)=>state?.persistedSlice.auth?.owner?.accessToken;
export const selectAdminToken=(state)=>state?.persistedSlice.auth?.admin?.accessToken;

export const selectRole=(state)=>state?.persistedSlice.auth?.user?.role;
export const selectUserId=(state)=>state?.persistedSlice.auth.user.user_id || state?.persistedSlice.auth.user._id ;
export const selectOwnerId=(state)=>state?.persistedSlice.auth.owner.user_id;
export const selectAdminId=(state)=>state?.persistedSlice.auth.admin.user_id;

export default authSlice.reducer;
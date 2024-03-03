import {combineReducers, configureStore} from '@reduxjs/toolkit'
import signupSlice from '../features/authentication/services/signupSlice';
import { apiSlice } from './apiSlice';
import loginSlice from '../features/authentication/services/loginSlice';
import { persistReducer,persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import socketIOReduxMiddleware from 'socket.io-redux';
import io from 'socket.io-client';

import {thunk} from 'redux-thunk';
import verifyEmailSlice from '../features/authentication/services/verifyEmailSlice';
import EditHotelFormSlice from '../features/hotelRegistration/services/EditHotelFormSlice';
import hotelListSlice from '../features/hotelManagement/services/hotelListSlice';
import editRoomFormSlice from '../features/hotelRegistration/services/editRoomFormSlice';
import priceSlice from '../features/browse/services/priceSlice';
import searchSlice from './searchSlice';
import roomsSlice from '../features/browse/services/roomsSlice';
import walletCheckOutSlice from '../features/walletPayment/service/walletCheckOutSlice';
       
// const socket = io.connect('http://localhost:4000');

const persistConfig={
    key:'root',
    storage
}

const rootReducer=combineReducers({
    auth:loginSlice,
    hotels:hotelListSlice,
    checkout:walletCheckOutSlice,
    search:searchSlice,
  
})

const persistedAuthReducer=persistReducer(persistConfig,rootReducer);

const store=configureStore({
    reducer:{
        [apiSlice.reducerPath]:apiSlice.reducer,
        persistedSlice:persistedAuthReducer,
        verify:verifyEmailSlice,
        signup:signupSlice,
       editHotelForm:EditHotelFormSlice,
        editRoomForm:editRoomFormSlice,
        priceSlice:priceSlice,
        roomsInHotel:roomsSlice,
        
    },
    middleware:[thunk],
    middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(apiSlice.middleware),
devTools: true

})

export const persistor=persistStore(store);
export default store;



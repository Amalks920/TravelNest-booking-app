import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ThemeProvider } from "@material-tailwind/react";
import { Provider } from 'react-redux';
import store from './services/store.js';
import {persistor} from './services/store.js'
import { PersistGate } from 'redux-persist/integration/react';
import { Suspense } from "react";
import { BrowserRouter,Routes,Route } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  <BrowserRouter>
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
   <ThemeProvider>
   <Suspense fallback={<h1>Loading....</h1>}>
    <Routes>
      <Route path='/*' element={<App/>}/>
    </Routes>
   </Suspense>
   </ThemeProvider>
   </PersistGate>
   </Provider>
   </BrowserRouter>
  </React.StrictMode>,
)

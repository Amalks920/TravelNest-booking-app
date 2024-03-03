import React from 'react';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Toast({message}){
  const notify = () => toast(message);

  return (
    <div>
      <button onClick={notify}>{message}</button>
      <ToastContainer />
    </div>
  );
}

export default Toast;
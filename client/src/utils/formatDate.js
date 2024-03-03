import { format } from "date-fns";

export const getYesterdayDateString = () => {
    const yesterday = new Date();
    const year = yesterday.getFullYear();
    const month = String(yesterday.getMonth() + 1).padStart(2, "0");
    const day = String(yesterday.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  export const getFutureDateString = (daysAhead) => {
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + daysAhead);
    const year = futureDate.getFullYear();
    const month = String(futureDate.getMonth() + 1).padStart(2, "0");
    const day = String(futureDate.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };


  export const formatDate=(date) =>{
   return  format(date, "yyyy-MM-dd", {
      timeZone: "Asia/Kolkata",
    })
  }

  export const formatTime=(date) =>{
    return  format(date, " HH:mm:ss", {
      timeZone: "Asia/Kolkata",
    }) 
  }
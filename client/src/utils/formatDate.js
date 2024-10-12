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
    return  format(date, " HH:mm", {
      timeZone: "Asia/Kolkata",
    }) 
  }


  export const parseDate = (dateToBeParsed) => {
    if(!dateToBeParsed) return getYesterdayDateString()
    let date = new Date(dateToBeParsed);
    date.setDate(date.getDate());
    return date.toISOString().split('T')[0]; // Convert back to YYYY-MM-DD
  };


  export const getDaysDifference = (startDate, endDate) => {
    const date1 = new Date(startDate);
    const date2 = new Date(endDate);
    
    // Difference in time (milliseconds)
    const diffInTime = date2 - date1;
    
    // Convert time difference from milliseconds to days
    const diffInDays = diffInTime / (1000 * 3600 * 24);
    
    return diffInDays;
  };
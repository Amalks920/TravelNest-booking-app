import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';




const generateInvoicePDF = (bookingData) => {

}

const PrintButton=({booking,componentRef})=>{

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  

    return (
        <button
            onClick={()=>{
              handlePrint()
              generateInvoicePDF(booking[0])
            }}
        class="bg-transparent text-black  border-2 sm:text-sm text-[0.7rem] font-bold border-black 
    sm:w-[150px] sm:h-[40px]    w-[80px] h-[25px]  ms-3 sm:ms-0"
      >
        print
      </button>
    )
}

export default PrintButton;
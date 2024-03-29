const Pagination = ({setPageNumber,length,maxDocumentInAPage,pageNumber}) => {
    const btnNumber=Math.ceil(length/maxDocumentInAPage);
    let pageArr=[];

    for(var i=0;i<btnNumber;i++){
        pageArr.push(i+1)
    }

  return (
    <div class="flex items-center gap-4">
      <button
        disabled
        class="flex items-center gap-2 px-6 py-3 font-sans text-xs font-bold text-center text-gray-900 uppercase align-middle transition-all rounded-lg select-none hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
        type="button"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="2"
          stroke="currentColor"
          aria-hidden="true"
          class="w-4 h-4"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
          ></path>
        </svg>
        Prev
      </button>
      <div class="flex items-center gap-2">

        
{     
pageArr.map((el,index)=>{


  return  <button
            onClick={()=>{
                setPageNumber(el)
            }}
            key={index}
            className={`relative h-10 max-h-[40px] w-10 max-w-[40px] select-none rounded-lg
           ${pageNumber===el?'bg-gray-900  text-white':'bg-white text-gray-800'} text-center align-middle font-sans text-xs font-medium uppercase
            shadow-md shadow-gray-900/10 transition-all hover:shadow-lg
             hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85]
              active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none`}
          type="button"
        >
          <span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
            {el}
          </span>
        </button>

})
        }
        
      </div>
      <button
        class="flex items-center gap-2 px-6 py-3 font-sans text-xs font-bold text-center text-gray-900 uppercase align-middle transition-all rounded-lg select-none hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
        type="button"
      >
        Next
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="2"
          stroke="currentColor"
          aria-hidden="true"
          class="w-3 h-3"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
          ></path>
        </svg>
      </button>
    </div>
  );
};


export default Pagination;

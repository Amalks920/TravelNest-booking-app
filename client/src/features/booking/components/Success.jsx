import { Link } from "react-router-dom";

const Success = () => {
  return (
    <div className="grid grid-flow-row grid-cols-12  w-[50%] min-h-[50vh] -mt-28 shadow-md border-2 py-7">

      <div className="col-span-12 flex flex-col items-center justify-center gap-3">
        <div >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="black"
            class="w-10 h-10"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z"
            />
          </svg>
        </div>

        <div><h2 className="text-xl font-bold text-green-700">Booking Successful</h2></div>
      </div>


      <div className="col-span-12 flex flex-col items-center justify-center">
            <h1 className="text-center w-[60%]">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Delectus, laboriosam. Ipsum et facere reprehenderit nulla ducimus, veritatis labore ipsa molestias sint magni odio, soluta voluptatum architec.
            </h1>
      </div>
      <div className="col-span-12 flex items-center justify-center gap-10">
      
           <button className="border-2 border-black w-1/4 py-1"><Link to={'/home'}>Go To Home</Link> </button>
          <button className="border-2 border-black w-1/4 py-1 bg-black text-white rounded-md"> <Link to={'/bookings'}>Go To Bookings</Link></button>

      </div>

    </div>  
  );
};

export default Success;

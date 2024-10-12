import { Button } from "@material-tailwind/react";
import Cards from "../../features/browse/components/Cards";
import SearchBar from "../../features/browse/components/SearchBar";
import LocationWiseHotels from "../../features/browse/components/LocationWiseHotels";

const HomePage=()=>{
    return (
      <div className="flex flex-col w-[64.81%]">

      <div className=" py-[48px]">
      <h1 className="text-2xl font-bold"
       style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, 'Noto Sans', 'Apple Color Emoji', 'Segoe UI Emoji', sans-serif" }}
      >We compare hotel prices from 100s of sites</h1>
      <p className="mt-2"
       style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, 'Noto Sans', 'Apple Color Emoji', 'Segoe UI Emoji', sans-serif" }}
      >We’ll do the searching. You do the saving.</p>

        <SearchBar/>
      </div>


      <div className="flex justify-between py-[12px]">
          <div>
            <img src="https://imgcy.trivago.com/image/upload/hardcodedimages/mpm-localised-logos-dark/395.png" width={50} alt="img" />
          </div>
          <div>
            <img src="https://imgcy.trivago.com/image/upload/hardcodedimages/mpm-localised-logos-dark/3340.png" width={80}  alt="img" />
          </div>
          <div>
            <img src="https://imgcy.trivago.com/image/upload/hardcodedimages/mpm-localised-logos-dark/626.png" width={85}  alt="img" />
          </div>
          <div>
            <img src="https://imgcy.trivago.com/image/upload/hardcodedimages/mpm-localised-logos-dark/2192.png" width={80}  alt="img" />
          </div>
          <div>
            <img src="https://imgcy.trivago.com/image/upload/hardcodedimages/mpm-localised-logos-dark/14.png" width={70}  alt="img" />
          </div>
          <div>
            <img src="https://imgcy.trivago.com/image/upload/hardcodedimages/mpm-localised-logos-dark/634.png" width={70}  alt="img" />
          </div>
          <div>
            <img src="https://imgcy.trivago.com/image/upload/hardcodedimages/mpm-localised-logos-dark/2452.png" width={50}  alt="img" />
          </div>
          <div>
           <p>+ 100 more</p>
          </div>
      
      </div>

      <div className="py-[24px] flex justify-between gap-10"
      
      >
      <div className="text-center flex flex-col items-center">
            <img src="https://imgcy.trivago.com//hardcodedimages/homepage-landing/usp/SearchDesktop.svg" width={280} alt="img" />
            <h1 
            className="text-xl font-bold"
                   style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, 'Noto Sans', 'Apple Color Emoji', 'Segoe UI Emoji', sans-serif" }}
            >Search simply</h1>
            <p
            className="text-md max-w-[80%]"
                   style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, 'Noto Sans', 'Apple Color Emoji', 'Segoe UI Emoji', sans-serif" }}
            >Search through 5 million hotels in just a few seconds.</p>
          </div>
          <div className="text-center flex flex-col items-center">
            <img src="https://imgcy.trivago.com//hardcodedimages/homepage-landing/usp/CompareDesktop.svg" width={280}  alt="img" />
            <h1
            className="text-xl font-bold"
                   style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, 'Noto Sans', 'Apple Color Emoji', 'Segoe UI Emoji', sans-serif" }}
            >Search simply</h1>
            <p
            className="text-md max-w-[80%]"
                   style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, 'Noto Sans', 'Apple Color Emoji', 'Segoe UI Emoji', sans-serif" }}
            >Compare hotel prices from 100s of sites at once.</p>
          </div>
          <div className="text-center flex flex-col items-center">
            <img src="https://imgcy.trivago.com//hardcodedimages/homepage-landing/usp/SaveDesktop.svg" width={280}  alt="img" />
            <h1
            className="text-xl font-bold"
                   style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, 'Noto Sans', 'Apple Color Emoji', 'Segoe UI Emoji', sans-serif" }}
            >Search simply</h1>
            <p
            className="text-md max-w-[80%]"
                   style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, 'Noto Sans', 'Apple Color Emoji', 'Segoe UI Emoji', sans-serif" }}
            >Discover a great deal to book on our partner sites.</p>
          </div>
      </div>

     <LocationWiseHotels/>
    </div>
        
    )
}

export default HomePage;
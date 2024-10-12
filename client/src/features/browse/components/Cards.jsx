import React, { useState } from 'react';
import { Button } from '@material-tailwind/react';
import { IMAGE_BASE_URL } from '../../../data/constants';

const Cards = ({hotels}) => {
  const allCards = [
    {
      id: 1,
      title: 'Website Review Check',
      description: 'The place is close to Barceloneta Beach and bus stop just 2 min by walk and near to "Naviglio" where you can enjoy the main nightlife in Barcelona.',
      image: 'https://images.unsplash.com/photo-1540553016722-983e48a2cd10?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 2,
      title: 'Website Review Check',
      description: 'The place is close to Barceloneta Beach and bus stop just 2 min by walk and near to "Naviglio" where you can enjoy the main nightlife in Barcelona.',
      image: 'https://images.unsplash.com/photo-1540553016722-983e48a2cd10?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 3,
      title: 'Website Review Check',
      description: 'The place is close to Barceloneta Beach and bus stop just 2 min by walk and near to "Naviglio" where you can enjoy the main nightlife in Barcelona.',
      image: 'https://images.unsplash.com/photo-1540553016722-983e48a2cd10?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 4,
      title: 'Website Review Check',
      description: 'The place is close to Barceloneta Beach and bus stop just 2 min by walk and near to "Naviglio" where you can enjoy the main nightlife in Barcelona.',
      image: 'https://images.unsplash.com/photo-1540553016722-983e48a2cd10?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 5,
      title: 'One&Only The Palm Dubai',
      description: 'One&Only The Palm Dubai',
      image: 'https://imgcy.trivago.com/c_fill,d_dummy.jpeg,e_sharpen:60,f_auto,h_267,q_40,w_400/partner-images/1e/7f/3bd3064388540e0f719635348c90edbfc2abeae2709c491ef83a903e0a2d.jpeg',
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const cardsToShow = 3;

  const nextCards = () => {
    if (currentIndex + cardsToShow < allCards.length) {
      setCurrentIndex(currentIndex + cardsToShow);
    }
  };

  const prevCards = () => {
    if (currentIndex - cardsToShow >= 0) {
      setCurrentIndex(currentIndex - cardsToShow);
    }
  };

  return (
      <div className='flex mb-10 gap-8 max-w-[100%]  overflow-scroll ps-[10px] pt-[12px]'>
       
        {
          hotels.map(({images,hotelName},index)=>{
            return (
              <div className='rounded-2xl max-w-[313px] shadow-2xl min-w-[313px] overflow-x-scroll'>
              <img className='w-full h-[200px]  ' src={IMAGE_BASE_URL+'/'+images[0]} alt="" />
              
              <div className='px-4 pb-2'>
              <h1
                     style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, 'Noto Sans', 'Apple Color Emoji', 'Segoe UI Emoji', sans-serif" }}
              className='font-bold text-lg p-[4px] mb-[4px] line-clamp-1'>{hotelName}</h1>
              <div>
                <span>sdkfl</span>
                <span>ff</span>
              </div>
  
              <div>
                <span>ff</span>
                <span>ff</span>
              </div>
  
              <Button color='blue' className='w-full mt-[16px]'>Check prices</Button>
              </div>
            </div>
            )
          })
        }

      </div>
  );
}

export default Cards;




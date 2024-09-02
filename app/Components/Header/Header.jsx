"use client";
import { GetUserData } from '@/app/API/Slices/Profile';
import Image from 'next/image'
import React, { useState ,useEffect } from 'react'
import { useDispatch } from 'react-redux';

const Header = () => {
  const [userdata, setuserdata] = useState();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(GetUserData()).then((res) => {
      setuserdata(res.payload);
    
    });
  }, []);
  return (
    <div className='header w-full'>
     <div  className='header_content flex items-center justify-end gap-5 py-1.5 px-1.5'>
    
    <div className='px-3 py-2 rounded bg-custom-color'>
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
<path d="M5.67964 8.79403C6.05382 5.49085 8.77095 3 12 3C15.2291 3 17.9462 5.49085 18.3204 8.79403L18.6652 11.8385C18.7509 12.595 19.0575 13.3069 19.5445 13.88C20.5779 15.0964 19.7392 17 18.1699 17H5.83014C4.26081 17 3.42209 15.0964 4.45549 13.88C4.94246 13.3069 5.24906 12.595 5.33476 11.8385L5.67964 8.79403Z" stroke="#16151C" stroke-width="1.5" stroke-linejoin="round"/>
<path d="M15 19C14.5633 20.1652 13.385 21 12 21C10.615 21 9.43668 20.1652 9 19" stroke="#16151C" stroke-width="1.5" stroke-linecap="round"/>
</svg>

    </div>
    <div className='rounded-full'>
      <Image src={userdata?.cover}
           width={70} // Set appropriate width
           height={70} // Set appropriate height
           layout="fixed" // Optional: "fixed" or "intrinsic" or "responsive"
           className="rounded-full"
      alt='user image'/>
    </div>
     </div>
    </div>
  )
}

export default Header
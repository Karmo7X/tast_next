"use client"
import Image from "next/image";
import logo from '@/public/assets/cypartallogo.png'
import { useState } from "react";
import { FaRegEyeSlash ,FaRegEye  } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import { LoginAction } from "./API/Slices/AuhtSlice";
import { useRouter } from "next/navigation";
export default function Login() {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // handle form login 
   const [formdata ,setformdata]=useState({
    email:"",
    password:"",

   })
   const [error,seterror]=useState({})
  
   console.log(error)
  // handle change data
   const handlechange=(e)=>{
   const {name ,value}=e.target;
   setformdata({
    ...formdata,
    [name]:value,
   })

   }

   


   //handle submit form 
   const disptach =useDispatch()
   const router =useRouter()
   const handleSubmit = (e) => {
    e.preventDefault();
    disptach(LoginAction(formdata)).then((res)=>{
    console.log(res)
      if(res.payload?.access){
        router.push('/Home')
      }else{
        seterror(res.payload)
      }
    })
    
  };

  return (
    <main className="flex min-h-screen space-y-14 flex-col items-center justify-center p-6 md:p-10 lg:p-24 xl:p-24 2xl:p-24">
    <div className="header_login">
      <Image src={logo} alt="logo Cparta"/>
      </div>     
    
     {/* =======  login Form  ======  */}
     <div className="mt-10 w-full p-8 rounded-md shadow	 border border-gray-200 sm:mx-auto lg:m-0 sm:w-full sm:max-w-sm md:max-w-md lg:max-w-md xl:max-w-lg">
          <form action="#" method="POST" className="space-y-10 lg:w-full xl:w-full">
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formdata.email}
                  onChange={(e)=>handlechange(e)}
                  placeholder="nouran@cyparta.com"
                  autoComplete="email"
                  className="block w-full bg-main-color rounded-md border-0 px-3 py-2.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-Slate-950 sm:text-sm sm:leading-6"
                />
              </div>
              {error?.email ?(<>
                <span className="text-red-900 ">
                 {error?.email[0]}
                </span>
              </>):null}
           
            </div>

            <div>
          <div className="flex items-center justify-between">
            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
              Password
            </label>
          </div>
          <div className="mt-2 relative">
            <input
              id="password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              required
              onChange={(e)=>handlechange(e)}
              placeholder="************"
              autoComplete="current-password"
               className="block w-full bg-main-color rounded-md border-0 px-3 py-2.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-Slate-950 sm:text-sm sm:leading-6"
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
            >
              {showPassword ?  <FaRegEye  className="text-xl"/>:<FaRegEyeSlash  className="text-xl"/>}
            </button>
          </div>
          {error?.password ?(<>
                <span className="text-red-900 ">
                 {error?.password[0]}
                </span>
              </>):null}
        </div>
        {error?.detail ?(<>
                <span className="text-red-900 text-center flex w-full ">
                 {error?.detail}
                </span>
              </>):null}
            <div>
              <button
                type="button"
                onClick={handleSubmit}
                className="login_button bg-button-color flex w-full justify-center rounded-md  px-3 py-2.5 text-sm font-semibold leading-6 text-white shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 "
              >
                Login
              </button>
            </div>
          </form>

          
        </div>
    </main>
  );
}

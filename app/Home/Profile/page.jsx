"use client";
import { GetUserData, UpdateUserData } from "@/app/API/Slices/Profile";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import Image from "next/image";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import LoadingIndicator from "@/app/Components/loading/LoadingIndicator";

const theme = createTheme({
  components: {
    MuiTabs: {
      styleOverrides: {
        indicator: {
          backgroundColor: "#EC232B", // Color of the indicator
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          color: "#16151C", // Default text color
          "&.Mui-selected": {
            color: "#EC232B", // Color of the selected tab text
            fontWeight: 'bold',
            // Ensure color is inherited for icon
            "& .MuiTab-icon": {
              color: "#EC232B", // Icon color when selected
            },
          },
          // Ensure color is inherited for icon
          ".MuiTab-icon": {
            color: "inherit", // Inherits color from the parent Tab
          },
        },
      },
    },
  },
});
const page = () => {
  const [formData, setFormData] = useState({
    id: '',
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    bio: '',
    is_superuser: false,
    is_staff: false,
    image: '',
    cover: '',
    message: '',
    status: '',
    date_joined:''
  });
  console.log(formData)
  
  const [previewUrl, setPreviewUrl] = useState(null);
  const [Loading,setLoading]=useState(true)
  const [value, setValue] = useState(0);
  // console.log(userdata);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  
  // -------------- handleChange form data ---------------
  const handleChangeform = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleuploadimg=(e)=>{
    const file = e.target.files[0];
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setPreviewUrl(objectUrl);
      setFormData({ ...formData, cover: file });
    }
    
  }
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(GetUserData()).then((res) => {
      if(res.payload){
        setLoading(false)
      setFormData((prevData) => ({
        ...prevData,
        'id': res.payload?.id ,
        'first_name': res.payload?.first_name ,
        'last_name': res.payload?.last_name ,
        'email': res.payload?.email ,
        'phone': res.payload?.phone ,
        'bio': res.payload?.bio ,
        'is_superuser': res.payload?.is_superuser ,
        'image': res.payload?.image ,
        'cover': res.payload?.cover ,
        'message': res.payload?.message ,
        'status': res.payload?.status ,
        "date_joined":res.payload?.date_joined
      }));
      }
     
    });
  }, []);

  // breadcrumb data
  const breadcrumbs = [
    <Link
      underline="hover"
      key="1"
      color="inherit"
      href=""
      className="font-semibold text-lg text-text-color"
    >
      Employees
    </Link>,
    <Link
      className="font-semibold text-lg text-text-color"
      underline="hover"
      key="2"
      color="inherit"
      href=""
    >
      Profile
    </Link>,
  ];
   

  // format date 
  // const date =new Date (formData?.date_joined.toString.split('T')[0])
  // const formattedDate = new Intl.DateTimeFormat('en-US', {
  //   year: 'numeric',
  //   month: 'long',
  //   day: '2-digit',
  // }).format(date);


  // handle for update data or edit profile

  const handleupdate = async(e)=>{
    e.preventDefault(); 
    // Create a new FormData object
  const formDataapi = new FormData();

  // Append form fields to FormData
  Object.keys(formData).forEach((key) => {
    formDataapi.append(key, formData[key]);
  });

    await dispatch(UpdateUserData(formDataapi)).then((res)=>{
      console.log(res)
    if(res.payload){
       window.location.reload()
    }

    })

  }
  return (
    <>
     {Loading === true ? (<>
     <LoadingIndicator/>

     </>):(<>
     
     <div className="profile_sec p-4">
      {/* bread crumb */}
      <Stack spacing={2}>
        <Breadcrumbs
          separator={<NavigateNextIcon fontSize="small" />}
          aria-label="breadcrumb"
        >
          {breadcrumbs}
        </Breadcrumbs>
      </Stack>

      {/* profile top section */}

      <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-10 mt-10 mb-10">
        <div className="flex items-center gap-4">
          <div>
            <Image
            src={previewUrl ?  previewUrl:formData?.cover} // Fallback image if userdata?.logo is undefined
            alt="user image"
            width={170} // Set appropriate width
            height={170} // Set appropriate height
            layout="fixed" // Optional: "fixed" or "intrinsic" or "responsive"
            className="rounded-lg w-full"
          />
          <label className="block">
          <span className="sr-only">Choose cover image</span>
          <input
            type="file"
            name="cover"
            accept="image/*"
            onChange={(e)=>handleuploadimg(e)}
            className="block w-full mt-4 text-sm text-slate-500
            file:mr-4 file:py-2 file:px-4
            file:rounded-full file:border-0
            file:text-sm file:font-semibold
            file:bg-violet-50 file:text-violet-700
            hover:file:bg-violet-100
            "
          />
        </label>
          </div>
          
          <div className="profile_content space-y-5">
            <h2 className="font-bold text-xl">{formData?.first_name}</h2>

            <p className="flex items-center uppercase gap-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M8 6V5C8 3.34315 9.34315 2 11 2H13C14.6569 2 16 3.34315 16 5V6M2 10.3475C2 10.3475 5.11804 12.4244 9.97767 12.9109M22 10.3475C22 10.3475 18.882 12.4244 14.0223 12.9109M6 22H18C20.2091 22 22 20.2091 22 18V10C22 7.79086 20.2091 6 18 6H6C3.79086 6 2 7.79086 2 10V18C2 20.2091 3.79086 22 6 22Z"
                  stroke="#16151C"
                  stroke-width="1.5"
                  stroke-linecap="round"
                />
                <path
                  d="M14 12.16V13.16C14 13.17 14 13.17 14 13.18C14 14.27 13.99 15.16 12 15.16C10.02 15.16 10 14.28 10 13.19V12.16C10 11.16 10 11.16 11 11.16H13C14 11.16 14 11.16 14 12.16Z"
                  stroke="#16151C"
                  stroke-width="1.5"
                  stroke-miterlimit="10"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              {formData?.bio}
            </p>

            <p className="flex items-center uppercase gap-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <rect
                  x="2"
                  y="3"
                  width="20"
                  height="18"
                  rx="4"
                  stroke="#16151C"
                  stroke-width="1.5"
                />
                <path
                  d="M2 7L9.50122 13.001C10.9621 14.1697 13.0379 14.1697 14.4988 13.001L22 7"
                  stroke="#16151C"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              {formData?.email}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-end ">
          <button
            type="button"
            onClick={handleupdate}
            className=" bg-button-color flex  gap-4 justify-center rounded-md px-3 py-2.5 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M3 21H21M13.7844 5.31171C13.7844 5.31171 13.7844 6.94634 15.419 8.58096C17.0537 10.2156 18.6883 10.2156 18.6883 10.2156M7.31963 17.9881L10.7523 17.4977C11.2475 17.4269 11.7064 17.1975 12.06 16.8438L20.3229 8.58096C21.2257 7.67818 21.2257 6.21449 20.3229 5.31171L18.6883 3.67708C17.7855 2.77431 16.3218 2.77431 15.419 3.67708L7.15616 11.94C6.80248 12.2936 6.57305 12.7525 6.50231 13.2477L6.01193 16.6804C5.90295 17.4432 6.5568 18.097 7.31963 17.9881Z"
                stroke="white"
                stroke-width="1.5"
                stroke-linecap="round"
              />
            </svg>{" "}
            Edit Profile
          </button>
        </div>
      </div>
      <hr className="w-full bg-gray-400" />
      {/* profile data */}
      {/* tabs_section */}
      <div className="tabs mt-10 mb-10">
        <ThemeProvider theme={theme}>
          <Box
            sx={{
              width: "100%",
              bgcolor: "",
              borderBottom: 1,
              borderColor: "divider",
            }}
          >
            <Tabs
              textColor="#EC232B"
              indicatorColor="#EC232B"
              value={value}
              onChange={handleChange}
              
            >
              <Tab
                label="Personal Information"
                icon={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11ZM12 21C15.866 21 19 19.2091 19 17C19 14.7909 15.866 13 12 13C8.13401 13 5 14.7909 5 17C5 19.2091 8.13401 21 12 21Z"
                      fill="currentColor"
                    />
                  </svg>
                }
                iconPosition="start"
              />
              <Tab
                label="Professional Information"
                icon={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M8 6V5C8 3.34315 9.34315 2 11 2H13C14.6569 2 16 3.34315 16 5V6M2 10.3475C2 10.3475 5.11804 12.4244 9.97767 12.9109M22 10.3475C22 10.3475 18.882 12.4244 14.0223 12.9109M6 22H18C20.2091 22 22 20.2091 22 18V10C22 7.79086 20.2091 6 18 6H6C3.79086 6 2 7.79086 2 10V18C2 20.2091 3.79086 22 6 22Z"
                      stroke="currentColor"
                      stroke-width="1.5"
                      stroke-linecap="round"
                    />
                    <path
                      d="M14 12.16V13.16C14 13.17 14 13.17 14 13.18C14 14.27 13.99 15.16 12 15.16C10.02 15.16 10 14.28 10 13.19V12.16C10 11.16 10 11.16 11 11.16H13C14 11.16 14 11.16 14 12.16Z"
                      stroke="currentColor"
                      stroke-width="1.5"
                      stroke-miterlimit="10"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                }
                iconPosition="start"
              />
              <Tab
                label="Documents"
                icon={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M4 6C4 3.79086 5.79086 2 8 2H15.3431C16.404 2 17.4214 2.42143 18.1716 3.17157L20.8284 5.82843C21.5786 6.57857 22 7.59599 22 8.65685V18C22 20.2091 20.2091 22 18 22H8C5.79086 22 4 20.2091 4 18V6Z"
                      stroke="currentColor"
                      stroke-width="1.5"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M9 7L17 7"
                      stroke="currentColor"
                      stroke-width="1.5"
                      stroke-linecap="round"
                    />
                    <path
                      d="M9 12H17"
                      stroke="currentColor"
                      stroke-width="1.5"
                      stroke-linecap="round"
                    />
                    <path
                      d="M9 17H13"
                      stroke="currentColor"
                      stroke-width="1.5"
                      stroke-linecap="round"
                    />
                  </svg>
                }
                iconPosition="start"
              />
              <Tab
                label="Account Access"
                icon={
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <rect x="4" y="7" width="16" height="14" rx="4" stroke="currentColor" stroke-width="1.5"/>
                    <circle cx="12" cy="14" r="2" stroke="currentColor" stroke-width="1.5"/>
                    <path d="M16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7" stroke="currentColor" stroke-width="1.5"/>
                    </svg>
                }
                iconPosition="start"
              />
            </Tabs>
          </Box>
        </ThemeProvider>
      </div>
     {/* profile data section */}
     <div className="flex items-center  w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-2 w-full  gap-5">
      <div className="">
              <label htmlFor="first-name" className="block text-sm font-semibold  leading-6 text-gray-400">
              First Name
              </label>
              <div className="mt-2">
                <input
                  id="first-name"
                  name="first_name"
                  type="text"
                  value={formData?.first_name}
                  onChange={(e)=>handleChangeform(e)}
                  placeholder=""
                  autoComplete="given-name"
                  className="block w-full  bg-main-color border-gray-300  border-b px- py-1.5 text-text-color font-bold shadow-none outline-none placeholder:text-text-color   sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="">
              <label htmlFor="last-name"  className="block text-sm font-semibold  leading-6 text-gray-400">
              Last Name
              </label>
              <div className="mt-2">
                <input
                  id="last-name"
                  name="last_name"
                  type="text"
                  value={formData?.last_name}
                  onChange={(e)=>handleChangeform(e)}
                  placeholder=""
                  autoComplete="family-name"
                  className="block w-full  bg-main-color border-gray-300  border-b  px- py-1.5 text-text-color font-bold shadow-none outline-none placeholder:text-text-color   sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className="">
              <label htmlFor="mobile"  className="block text-sm font-semibold  leading-6 text-gray-400">
              Mobile Number
              </label>
              <div className="mt-2">
                <input
                  id="mobile"
                  name="phone"
                  type="tel"
                  value={formData?.phone}
                  onChange={(e)=>handleChangeform(e)}
                  placeholder=""
                  autoComplete="family-name"
                  className="block w-full font-bold bg-main-color border-gray-300  border-b px- py-1.5 text-text-color shadow-none outline-none placeholder:text-text-color   sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className="">
              <label htmlFor="email"  className="block text-sm font-semibold leading-6 text-gray-400">
              Email Address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData?.email}
                  onChange={(e)=>handleChangeform(e)}
                  placeholder=""
                  autoComplete="family-name"
                  className="block w-full font-bold bg-main-color border-gray-300  border-b px- py-1.5 text-text-color shadow-none outline-none placeholder:text-text-color   sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className="">
              <label htmlFor="Date"  className="block text-sm font-semibold  leading-6 text-gray-400">
              Date of Birth
              </label>
              <div className="mt-2">
                <input 
               
                
                  id="Date"
                  name="date"
                  type="date_joined"
                  value={formData?.date_joined.split('T')[0]}
                  onChange={(e)=>handleChangeform(e)}
                  placeholder=""
                  autoComplete="family-name"
                  className="block w-full font-bold bg-main-color border-gray-300  border-b px- py-1.5 text-text-color shadow-none outline-none placeholder:text-text-color   sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className="">
              <label htmlFor="Marital"  className="block text-sm font-semibold  leading-6 text-gray-400">
              Marital Status
              </label>
              <div className="mt-2">
                <input
                  id="Marital"
                  name="Marital"
                  type="text"
                  value={formData?.status || null}
                  onChange={(e)=>handleChangeform(e)}
                  placeholder=""
                  autoComplete="family-name"
                  className="block w-full font-bold bg-main-color border-gray-300  border-b px- py-1.5 text-text-color shadow-none outline-none placeholder:text-text-color   sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className="">
              <label htmlFor="Gender"  className="block text-sm font-semibold  leading-6 text-gray-400">
              Gender
              </label>
              <div className="mt-2">
                <input
                  id="Gender"
                  name="gender"
                  type="text"
                  value={"male"}
                  placeholder=""
                  autoComplete="family-name"
                  className="block w-full font-bold bg-main-color border-gray-300  border-b px- py-1.5 text-text-color shadow-none outline-none placeholder:text-text-color   sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className="">
              <label htmlFor="nation"  className="block text-sm font-semibold  leading-6 text-gray-400">
              Nationality
              </label>
              <div className="mt-2">
                <input
                  id="nation"
                  name="nation"
                  type="text"
                  value={"Egypt"}
                  placeholder=""
                  autoComplete="family-name"
                  className="block w-full  font-bold bg-main-color border-gray-300  border-b px- py-1.5 text-text-color shadow-none outline-none placeholder:text-text-color   sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className="">
              <label htmlFor="address"  className="block text-sm font-semibold  leading-6 text-gray-400">
              Address
              </label>
              <div className="mt-2">
                <input
                  id="address"
                  name="address"
                  type="text"
                  value={"Maadi"}
                  placeholder=""
                  autoComplete="family-name"
                  className="block w-full font-bold bg-main-color border-gray-300  border-b px- py-1.5 text-text-color shadow-none outline-none placeholder:text-text-color   sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className="">
              <label htmlFor="city"  className="block text-sm font-semibold  leading-6 text-gray-400">
              City
              </label>
              <div className="mt-2">
                <input
                  id="city"
                  name="city"
                  type="text"
                  value={"Cairo"}
                  placeholder=""
                  autoComplete="family-name"
                  className="block w-full font-bold bg-main-color border-gray-300  border-b px- py-1.5 text-text-color shadow-none outline-none placeholder:text-text-color   sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className="">
              <label htmlFor="state"  className="block text-sm font-semibold  leading-6 text-gray-400">
              State
              </label>
              <div className="mt-2">
                <input
                  id="state"
                  name="state"
                  type="text"
                  value={"Cairo"}
                  placeholder=""
                  autoComplete="family-name"
                  className="block w-full font-bold bg-main-color   py-1.5 text-text-color shadow-none outline-none placeholder:text-text-color   sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className="">
              <label htmlFor="zip_code"  className="block text-sm font-semibold  leading-6 text-gray-400">
              Zip Code
              </label>
              <div className="mt-2">
                <input
                  id="zip_code"
                  name="zip_code"
                  type="text"
                  value={"35624"}
                  placeholder=""
                  autoComplete="family-name"
                  className="block w-full font-bold  bg-main-color  px- py-1.5 text-text-color shadow-none outline-none placeholder:text-text-color   sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className="col-span-2">
     <div className="grid w-full grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3  2xl:grid-cols-3 gap-5 ">
    <div>
      <label htmlFor="hours" className="block text-sm font-semibold leading-6 text-gray-400">
        Work’s hours
      </label>
      <div className="mt-2">
        <input
          id="hours"
          name="hours"
          type="text"
          value={"180 hour"}
          placeholder=""
          autoComplete="family-name"
          className="block w-full bg-main-color font-bold  py-1.5 text-text-color shadow-none outline-none placeholder:text-text-color sm:text-sm sm:leading-6"
        />
      </div>
    </div>

    <div>
      <label htmlFor="salary" className="block text-sm font-semibold leading-6 text-gray-400">
        Salary/hour
      </label>
      <div className="mt-2">
        <input
          id="salary"
          name="salary"
          type="text"
          value={"300 EGP"}
          placeholder=""
          autoComplete="family-name"
          className="block w-full bg-main-color  font-bold py-1.5 text-text-color shadow-none outline-none placeholder:text-text-color sm:text-sm sm:leading-6"
        />
      </div>
    </div>

    <div>
      <label htmlFor="total-salary" className="block text-sm font-semibold leading-6 text-darkred-color">
        Total Salary
      </label>
      <div className="mt-2">
        <input 
          id="total-salary"
          name="total-salary"
          type="text"
          value={"54000 EGP"}
          readOnly
          placeholder=""
          autoComplete="family-name"
          className="block w-full bg-main-color font-bold py-1.5 text-text-color shadow-none outline-none placeholder:text-text-color sm:text-sm sm:leading-6"
        />
      </div>
    </div>
  </div>
            </div>
       
      </div>
     </div>
     
    </div>
     </>) }
    
    
    </>
   
  );
};

export default page;

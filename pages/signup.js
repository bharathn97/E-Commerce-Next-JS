import React from "react";
import Link from "next/link"
import {useState,useEffect} from "react"
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {useRouter} from "next/router";
const SignUp=()=>{
  const [email,setEmail]=useState();
  const [name,setName]=useState();
  const [password,setPassword]=useState();

  const router=useRouter();
  useEffect(()=>{
    if(localStorage.getItem("token"))
    {
      router.push("/");
    }
  },[])
  const handleChange=(e)=>
  {
    if(e.target.name==="name")
    {
       setName(e.target.value);
    }
    else if(e.target.name==="email")
    {
      setEmail(e.target.value);
    }
    else if(e.target.name==="password")
    {
      setPassword(e.target.value);
    }

  }
  const handleSubmit=async (e)=>
  {
     e.preventDefault();
     let data={name,email,password};
     let res=await fetch("http://localhost:3000/api/signup",{
       method:"POST",
       headers:{
         "Content-Type":"application/json"
       },
       body:JSON.stringify(data)
     })
     let response=await res.json();
     setEmail("");
     setName("");
     setPassword("");
     toast.success('Your Account has been created!', {
       position: "top-center",
       autoClose: 1500,
       hideProgressBar: true,
       closeOnClick: true,
       pauseOnHover: true,
       draggable: true,
       progress: undefined,
       theme: "light",
       });
  }

  return(
    <div>
    <ToastContainer
          position="top-center"
          autoClose={1500}
          limit={5}
          hideProgressBar
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colors"
        /><div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
  <div class="sm:mx-auto sm:w-full sm:max-w-sm">
    <img class="mx-auto h-10 w-auto" src="/logo (1).png" alt="Your Company"/>
    <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign Up for an Account</h2>
  </div>

  <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
    <form onSubmit={handleSubmit} class="space-y-6" action="#" method="POST">
      <div>
        <label for="name" class="block text-sm font-medium leading-6 text-gray-900">Name</label>
        <div class="mt-2">
          <input value={name} onChange={handleChange} id="name" name="name" type="text" autocomplete="name" required class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-Pink-600 sm:text-sm sm:leading-6"/>
        </div>
      </div>
      <div>
        <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Email address</label>
        <div class="mt-2">
          <input value={email} onChange={handleChange}id="email" name="email" type="email" autocomplete="email" required class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-Pink-600 sm:text-sm sm:leading-6"/>
        </div>
      </div>


      <div>
        <div class="flex items-center justify-between">
          <label for="password" class="block text-sm font-medium leading-6 text-gray-900">Password</label>
        </div>
        <div class="mt-2">
          <input value={password} onChange={handleChange} id="password" name="password" type="password" autocomplete="current-password" required class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-Pink-600 sm:text-sm sm:leading-6"/>
        </div>
      </div>
      <div>
        <button type="submit" class="flex w-full justify-center rounded-md bg-pink-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-pink-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-Pink-600">Sign Up</button>
      </div>
    </form>
  </div>
</div></div>
  )
}

export default SignUp;

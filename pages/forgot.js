import React from "react";
import Link from "next/link"
import { useState,useEffect } from "react";
import {useRouter} from "next/router";
const Forgot=()=>{
  const router=useRouter();
  useEffect(()=>{
    if(localStorage.getItem("token"))
    {
      router.push("/");
    }
  },[])
  return(
    <div><div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
  <div class="sm:mx-auto sm:w-full sm:max-w-sm">
    <img class="mx-auto h-10 w-auto" src="/logo (1).png" alt="Your Company"/>
    <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Forgot Password</h2>
    <p class="mt-3 text-center text-sm text-gray-500">
      Or
      <Link href={"/login"} class="font-semibold leading-6 text-pink-600 hover:text-pink-500"> Login</Link>
    </p>
  </div>

  <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
    <form class="space-y-6" action="#" method="POST">
      <div>
        <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Email address</label>
        <div class="mt-2">
          <input id="email" name="email" type="email" autocomplete="email" required class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
        </div>
      </div>
      <div>
        <button type="submit" class="flex w-full justify-center rounded-md bg-pink-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-pink-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Continue</button>
      </div>
    </form>
  </div>
</div></div>
  )
}

export default Forgot;

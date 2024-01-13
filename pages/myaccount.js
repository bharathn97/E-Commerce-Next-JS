import React from "react";
import {useState,useEffect} from "react"
import {useRouter} from "next/router";
const Myaccount=()=>{
    const router=useRouter();
  useEffect(()=>{
    if(!localStorage.getItem("token"))
    {
      router.push("/");
    }
  },[])
  return(
    <div>Login</div>
  )
}

export default Myaccount;

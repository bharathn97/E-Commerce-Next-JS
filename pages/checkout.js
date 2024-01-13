import React,{useState} from "react";
import Link from "next/link"
import {AiOutlineShoppingCart} from "react-icons/ai"
import Head from "next/head"
import Script from "next/script"
import {AiFillCloseCircle,AiOutlineMinusCircle,AiOutlinePlusCircle} from "react-icons/ai"
const CheckOut = ({ cart, subTotal, clearCart, addToCart, removeFromCart }) => {
  const [name,setName]=useState();
  const [email,setEmail]=useState();
  const [phone,setPhone]=useState();
  const [pincode,setPincode]=useState();
  const [address,setAddress]=useState();
  const [disabled,setDisabled]=useState(true);
  const [city,setCity]=useState(" ");
  const [state,setState]=useState(" ");
  const handleChange=(e)=>{
    if(e.target.name==="name")
    {
      setName(e.target.value);
    }
    else if(e.target.name==="email")
    {
      setEmail(e.target.value);
    }
    else if(e.target.name==="address")
    {
      setAddress(e.target.value);
    }
    else if(e.target.name==="phone")
    {
      setPhone(e.target.value);
    }
    else if(e.target.name==="pincode")
    {
      setPincode(e.target.value);
    }
    setTimeout(()=>{
      if(name && email && address &&  phone &&  pincode)
      {
        setDisabled(false);
      }
      else{
        setDisabled(true);
      }
    },100)


  }
  // checkout.js
// ... (existing code)

const makePayment = async () => {
  let oid = Math.floor(Math.random() * Date.now());
  const data = { cart, subTotal, oid, email, name, address, pincode, phone };

  try {
    const response = await fetch("/api/pretransaction", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      const postTransactionResponse = await fetch("/api/posttransaction", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ orderId: oid }),
      });

      if (postTransactionResponse.ok) {
        // Post-transaction logic executed successfully
        console.log("Post-transaction logic executed successfully");
      } else {
        console.error("Failed to execute post-transaction logic");
      }
    } else {
      console.error("Failed to create order");
    }
  } catch (error) {
    console.error("Error creating order:", error);
  }
};


return (
  <div className="container m-auto">
      <h1 className="font-bold text-3xl my-8 text-center">CheckOut</h1>
      <h2 className="font-bold text-xl">1. Delivery Details</h2>
      <div className="flex-box mx-auto">
        <div className="px-2 w-1/2">
          <div className="flex">
            <div className="w-1/2 pr-2">
              <div className="mb-4">
                <label htmlFor="name" className="leading-7 text-sm text-gray-600">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  onChange={handleChange} value={name} className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
            </div>
            <div className="w-1/2 pl-2">
              <div className="mb-4">
                <label htmlFor="email" className="leading-7 text-sm text-gray-600">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  onChange={handleChange} value={email}  className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
            </div>
          </div>
          <div className="w-full pl-2">
            <div className="mb-4">
              <label htmlFor="address" className="leading-7 text-sm text-gray-600">
                Address
              </label>
              <textarea onChange={handleChange} value={address} name="address" id="address" rows="4" cols="15" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"></textarea>
            </div>
          </div>
        </div>
      </div>
      <div className="flex-box mx-auto">
        <div className="px-2 w-1/2">
          <div className="flex">
            <div className="w-1/2 pr-2">
              <div className="mb-4">
                <label htmlFor="phone" className="leading-7 text-sm text-gray-600">
                Phone
                </label>
                <input
                  type="text"
                  id="phone"
                  name="phone"
                  onChange={handleChange} value={phone} className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
            </div>
            <div className="w-1/2 pl-2">
              <div className="mb-4">
                <label htmlFor="pincode" className="leading-7 text-sm text-gray-600">
                  Pincode
                </label>
                <input
                  type="text"
                  id="pincode"
                  name="pincode"
                onChange={handleChange} value={pincode}  className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
            </div>
        </div>
        </div>
      </div>
      <div className="flex-box mx-auto">
        <div className="px-2 w-1/2">
          <div className="flex">
            <div className="w-1/2 pr-2">
              <div className="mb-4">
                <label htmlFor="state" className="leading-7 text-sm text-gray-600">
                State
                </label>
                <input
                  type="text"
                  id="state"
                  name="state" readOnly={true} value={state}
                  className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
            </div>
            <div className="w-1/2 pl-2">
              <div className="mb-4">
                <label htmlFor="city" className="leading-7 text-sm text-gray-600">
                  City
                </label>
                <input
                  type="text"
                  id="city"
                  name="city" readOnly={true} value={city}
                  className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
            </div>
        </div>
        </div>
      </div>
        <h2 className="font-bold text-xl">2.Review Cart Items & Pay</h2>
        <div className="sidebar bg-pink-100 p-4">
        <ol className="list-decimal">
        {Object.keys(cart).length==0 &&  <div className="my-4 font-bold">No items in the cart</div>}
        {Object.keys(cart).map((k)=>{return <li key={k}>
        <div className="item flex my-3">
        <div className="w-1/3 font-bold">{cart[k].name}({cart[k].size}/{cart[k].variant})</div>
        <div className="flex items-center jusitfy-center w-1/3 font-semibold"><AiOutlinePlusCircle  onClick={()=>{addToCart(k,1,cart[k].price,cart[k].name,cart[k].size,cart[k].variant)}} className="mx-1 text-3xl"/>{cart[k].qty}<AiOutlineMinusCircle  onClick={()=>{removeFromCart(k,1,cart[k].price,cart[k].name,cart[k].size,cart[k].variant)}} className="mx-1 text-3xl"/></div>
        </div>
        </li>})}
        </ol>
        <span className="total font-semibold">Subtotal:₹{subTotal}</span>
        </div>

    <Link href={"/checkout"}>
      <button onClick={()=>makePayment()} disabled={disabled} className="disabled:bg-pink-300 flex mx-2 my-2 text-white bg-pink-500 border-0 py-2 px-6 focus:outline-none hover:bg-pink-600 rounded text-sm">
        Pay ₹{subTotal}
      </button>
    </Link>
  </div>
);
};

export default CheckOut;

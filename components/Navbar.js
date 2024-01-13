  import React from "react";
  import Image from "next/image";
  import Link from "next/link"
  import {AiOutlineShoppingCart} from "react-icons/ai"
    import {MdAccountCircle} from "react-icons/md"
  import {AiFillCloseCircle,AiOutlineMinusCircle,AiOutlinePlusCircle} from "react-icons/ai"
  import {useRef,useState,useEffect} from "react"
  const Navbar = ({logout,user,cart,addToCart,removeFromCart,clearCart,subTotal}) => {
   const[dropdown,setDropDown]=useState(false);
     const ref=useRef();
    const toggleCart=()=>
    {
      if(ref.current.classList.contains("translate-x-full"))
      {
        ref.current.classList.remove("translate-x-full");
        ref.current.classList.add("translate-x-0");
      }
      else if(!ref.current.classList.contains("translate-x-full"))
      {
        ref.current.classList.remove("translate-x-0");
        ref.current.classList.add("translate-x-full");
      }
    }

    return (
      <div className="flex flex-col md:flex-row sticky top-0 bg-white z-10 justify-center md:justify-start items-center py-2 shadow-lg sticky top-0 bg-white z-10">
        <div className="logo mx-5">
        <Link href={"/"}><Image width={200} height={20} src="/logo.png" alt="" /></Link>
        </div>
        <div className="nav">
          <ul className="flex items-center space-x-2 md:space-x-8 font-bold md:font-normal md:text-md">
            <Link href={"/tshirts"}><li>Tshirts</li></Link>
            <Link href={"/hoodies"}><li>Hoodies</li></Link>
            <Link href={"/stickers"}><li>Stickers</li></Link>
            <Link href={"/mugs"}><li>Mugs</li></Link>
          </ul>
        </div>
        <div onClick={toggleCart}  className="cart absolute right-0 mx-5">
        <AiOutlineShoppingCart className="text-3xl"/>
        </div>
        <div className="cart absolute right-8 mx-4">
        {dropdown && (
  <div onMouseOver={()=>{setDropDown(true)}} onMouseLeave={()=>{setDropDown(false)}} className="absolute right-8 bg-purple-500 top-7 rounded-md px-5 w-36">
    <ul>
      <li>
        <Link legacyBehavior href={"/myaccount"}>
          <a className="py-2 hover:text-white text-sm">My Account</a>
        </Link>
      </li>
      <li>
        <Link legacyBehavior href={"/orders"}>
          <a className="py-2 hover:text-white text-sm">Orders</a>
        </Link>
      </li>
      <li onClick={logout} className="py-2 hover:text-white text-sm">
        Logout
      </li>
    </ul>
  </div>
)}

        {user.value && <MdAccountCircle  onMouseOver={()=>{setDropDown(true)}} onMouseLeave={()=>{setDropDown(false)}} className="text-3xl mx-5"/>}
        {!user.value &&  <Link href={"/login"}><button className="bg-pink-500 px-2 py-1 rounded-md text-sm text-white mx-2">Login</button></Link>}
        </div>
        <div ref={ref} className={`w-72 h-[100vh] sidebar absolute overflow-y-scroll top-0 right-0 bg-pink-100 p-10 transition-transform   ${Object.keys(cart).length!==0?`translate-x-0`:`translate-x-full` } transform`}>
        <h2 className="font-bold text-xl">Shopping Cart</h2>
        <span onClick={toggleCart}  className="absolute top-2 right-2 cursor-pointer text-2xl text-pink-500"><AiFillCloseCircle/></span>
        <ol className="list-decimal">
        {Object.keys(cart).length==0 &&  <div className="my-4 font-bold">No items in the cart</div>}
        {Object.keys(cart).map((k)=>{return <li key={k}>
        <div className="item flex my-3">
        <div className="w-2/3 font-bold">{cart[k].name}({cart[k].size}/{cart[k].variant})</div>
        <div className="flex items-center jusitfy-center w-1/3 font-semibold"><AiOutlinePlusCircle  onClick={()=>{addToCart(k,1,cart[k].price,cart[k].name,cart[k].size,cart[k].variant)}} className="mx-1 text-3xl"/>{cart[k].qty}<AiOutlineMinusCircle  onClick={()=>{removeFromCart(k,1,cart[k].price,cart[k].name,cart[k].size,cart[k].variant)}} className="mx-1 text-3xl"/></div>
        </div>
        </li>})}
        </ol>
        <span className='font-bold py-2'>SubTotal: ₹{subTotal}</span>
        <div className="flex">
        <Link href={"/checkout"}><button class="flex mx-2 text-white bg-pink-500 border-0 py-1 px-6 focus:outline-none hover:bg-pink-600 rounded text-sm">Checkout</button></Link>
        <button onClick={clearCart} class="flex mx-2 text-white bg-pink-500 border-0 py-1 px-6 focus:outline-none hover:bg-pink-600 rounded text-sm">Clear Cart</button>
        </div>
        </div>
      </div>

    );
  };

  export default Navbar;

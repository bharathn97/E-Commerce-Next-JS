  import React from "react";
  import {useState} from "react";
import {useRouter} from "next/router"
   import mongoose from "mongoose";
   import Product from "../../models/Product";
   import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Slug=({buyNow,cart,addToCart,removeFromCart,clearCart,subTotal,products,variants})=>{
  console.log('Products:', products);
  console.log('Variants:', variants);
  const router=useRouter();
    const {slug}=router.query;
    const [pin,setPin]=useState();
    const [service,setService]=useState();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const checkService = async () => {
    let pins = await fetch("http://localhost:3000/api/pincode");
    let pinsJson = await pins.json();

    if (Object.keys(pinsJson).includes(pin)) {
      setService(true);
      toast.success('Your Pin Code Serviceable!', {
        position: "top-center",
        autoClose: 1500,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else {
      setService(false);
      toast.error('Sorry, Pin Code not Serviceable!', {
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
  };

   const onChangePin=(e)=>
   {
      setPin(e.target.value)
   }

   const[color,setColor]=useState(products.color);
   const[size,setSize]=useState(products.size);

   const refreshVariant = (newSize, newColor) => {
     setSize(newSize);
     setColor(newColor);
     const newSlug = variants[newColor][newSize][0].slug; // Assuming there's only one slug in the array
     router.push(`/products/${newSlug}`);
   };

  return(
    <>
    <section class="text-gray-600 body-font overflow-hidden">
  <div class="container px-5 py-24 mx-auto">
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
           theme="light"
         />
    <div class="lg:w-4/5 mx-auto flex flex-wrap">
      <img alt="ecommerce" class="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded" src={products.img}/>
      <div class="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
        <h2 class="text-sm title-font text-gray-500 tracking-widest">BRAND NAME</h2>
        <h1 class="text-gray-900 text-3xl title-font font-medium mb-1">{products.title}({products.size}/{products.color})</h1>
        <div class="flex mb-4">
          <span class="flex items-center">
            <svg fill="currentColor" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4 text-pink-500" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
            </svg>
            <svg fill="currentColor" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4 text-pink-500" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
            </svg>
            <svg fill="currentColor" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4 text-pink-500" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
            </svg>
            <svg fill="currentColor" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4 text-pink-500" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
            </svg>
            <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4 text-pink-500" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
            </svg>
            <span class="text-gray-600 ml-3">4 Reviews</span>
          </span>
          <span class="flex ml-3 pl-3 py-2 border-l-2 border-gray-200 space-x-2s">
            <a class="text-gray-500">
              <svg fill="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-5 h-5" viewBox="0 0 24 24">
                <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
              </svg>
            </a>
            <a class="text-gray-500">
              <svg fill="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-5 h-5" viewBox="0 0 24 24">
                <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
              </svg>
            </a>
            <a class="text-gray-500">
              <svg fill="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-5 h-5" viewBox="0 0 24 24">
                <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
              </svg>
            </a>
          </span>
        </div>
        <p class="leading-relaxed">{products.desc}</p>
        <div class="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">
        <div class="flex mb-4">
  <span class="mr-3">Color</span>
  {Object.keys(variants).map((color) => (
    Object.keys(variants[color]).map((size) => (
      <button
        key={`${color}-${size}`}
        onClick={() => refreshVariant(size, color)}
        className={`border-2 rounded-full bg-${color.toLowerCase()}-700 hover:bg-${color.toLowerCase()}-600 w-6 h-6 focus:outline-none ${
          color === products.color && size === products.size ? "border-black" : "border-gray-300"
        }`}
      ></button>
    ))
  ))}
</div>
<div class="flex ml-6 items-center">
  <span class="mr-3">Size</span>
  {Object.keys(variants[products.color]).map((size) => (
    <div key={size} className="relative">
      <select
        value={size}
        onChange={(e) => refreshVariant(e.target.value, products.color)}
        className="rounded border appearance-none border-gray-300 py-2 focus:outline-none focus:ring-2 focus:ring-pink-200 focus:border-pink-500 text-base pl-3 pr-10"
      >
        {Object.keys(variants[products.color]).map((availableSize) => (
          <option key={availableSize} value={availableSize}>
            {availableSize}
          </option>
        ))}
      </select>
      <span class="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
        <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4" viewBox="0 0 24 24">
          <path d="M6 9l6 6 6-6"></path>
        </svg>
      </span>
    </div>
  ))}
</div>
        </div>
        <div class="flex">
          <span class="title-font font-medium text-2xl text-gray-900">₹{products.price}</span>
            <button onClick={()=>buyNow(slug,1,products.price,products.title,products.size,products.color)} class="flex ml-10 text-white bg-pink-500 border-0 py-2 px-6 focus:outline-none hover:bg-pink-600 rounded">Buy Now</button>
          <button onClick={()=>addToCart(slug,1,products.price,products.title,products.size,products.color)} class="flex ml-4 text-white bg-pink-500 border-0 py-2 px-6 focus:outline-none hover:bg-pink-600 rounded">Add To Cart</button>
          <button class="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4">
            <svg fill="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-5 h-5" viewBox="0 0 24 24">
              <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
            </svg>
          </button>
        </div>
        <div className="pin mt-6 flex space-x-2 text-sm  ">
        <input onClick={onChangePin} className="px-2 border-2" type="text"/>
        <button onClick={checkService} className="text-white bg-pink-500 border-0 py-2 px-6 focus:outline-none hover:bg-pink-600 rounded">Check</button>
        </div>
        {!service &&  service!=null && <div className="text-red-700 text-sm mt-3">
           We do not deliver to this pincode
           </div>}
           {service &&  service!=null &&  <div className="text-green-700 text-sm mt-3">
              Yes we deliver to this pincode
              </div>}
      </div>

    </div>

  </div>
</section>
</>
  )
}

export async function getServerSideProps(context) {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect('mongodb://127.0.0.1:27017/codeswearyoutubedb');
  }

  let product = await Product.findOne({ slug: context.query.slug });
  let variants = await Product.find({ title: product.title, category: product.category });
  let colorSizeSlug = {};

  for (let item of variants) {
    if (Object.keys(colorSizeSlug).includes(item.color)) {
      if (Object.keys(colorSizeSlug[item.color]).includes(item.size)) {
        colorSizeSlug[item.color][item.size].push({ slug: item.slug });
      } else {
        colorSizeSlug[item.color][item.size] = [{ slug: item.slug }];
      }
    } else {
      colorSizeSlug[item.color] = {};
      colorSizeSlug[item.color][item.size] = [{ slug: item.slug }];
    }
  }

  return {
    props: {
      products: JSON.parse(JSON.stringify(product)),
      variants: JSON.parse(JSON.stringify(colorSizeSlug)),
    }, // will be passed to the page component as props
  };
}


export default Slug;

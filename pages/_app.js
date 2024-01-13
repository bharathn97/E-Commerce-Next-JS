import '@/styles/globals.css'
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import {useState,useEffect} from "react";
import {useRouter} from "next/router"
import LoadingBar from "react-top-loading-bar"
export default function App({ Component, pageProps }) {
    const [progress, setProgress] = useState(0)
const [cart,setCart]=useState({});
const [subTotal,setSubTotal]=useState(0);
const [user,setUser]=useState({value:null})
const [key,setKey]=useState(0);
const router=useRouter();
useEffect(()=>{
  router.events.on("routeChangeComplete",()=>{
      setProgress(1000);
  })
  try {
       const savedCart = localStorage.getItem("cart");

       if (savedCart) {
         const parsedCart = JSON.parse(savedCart);
         setCart(parsedCart);
         saveCart(parsedCart);
       }
     } catch (error) {
       console.log(error);
       localStorage.clear();
     }
     const token=localStorage.getItem("token");
     if(token)
     {
       setUser({value:token});   
     }
     setKey(Math.random())

},[router.query])
const buyNow = (itemCode, qty, price, name, size, variant) => {
  let newCart = { [itemCode]: { qty, price, name, size, variant } };
  saveCart(newCart);
  setCart(newCart);
  router.push("/checkout");
};

const saveCart = (myCart) => {
  if (!myCart) {
    myCart = {}; // Initialize to an empty object if not provided
  }

  localStorage.setItem("cart", JSON.stringify(myCart));
  let subt = 0;
  let keys = Object.keys(myCart);

  for (let i = 0; i < keys.length; i++) {
    subt += myCart[keys[i]].price * myCart[keys[i]].qty;
  }

  setSubTotal(subt);
};
const logout =()=>
{
  localStorage.removeItem("token");
  setKey(Math.random());
  setUser({value:null})
  router.push("/")
}
const addToCart=(itemCode,qty,price,name,size,variant)=>{
  setCart((prevCart) => {
        const newCart = { ...prevCart };

        if (itemCode in newCart) {
          newCart[itemCode].qty += qty;
        } else {
          newCart[itemCode] = { qty, price, name, size, variant };
        }

        saveCart(newCart);
        return newCart;
      });
}
const clearCart=()=>{
setCart({});
saveCart({});
}
const removeFromCart=(itemCode,qty,price,size,name,variant)=>{
  let newCart=cart;
  if(itemCode in cart)
  {
    newCart[itemCode].qty=cart[itemCode].qty-qty;
  }
  if(newCart[itemCode]["qty"]<=0)
  {
    delete newCart[itemCode]
  }
setCart(newCart);
saveCart(newCart);
}
  return <>
  <LoadingBar
        color='#f11946'
        progress={progress}
        waitingTime={500}
        onLoaderFinished={() => setProgress(0)}
      />
   {key &&  <Navbar logout={logout} user={user} key={key} cart={cart} removeFromCart={removeFromCart} clearCart={clearCart} addToCart={addToCart} subTotal={subTotal}/>}
     <Component  buyNow={buyNow} cart={cart} removeFromCart={removeFromCart} subTotal={subTotal} clearCart={clearCart} addToCart={addToCart} {...pageProps} />
     <Footer/>
    </>
}

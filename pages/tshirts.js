import React from "react";
import Link from "next/link";
import Product from "../models/Product";
import mongoose from "mongoose";

const Tshirts = ({ products }) => {
  return (
    <div>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap -m-4">
            {Object.keys(products).map((item) => (
              <div className="lg:w-1/4 md:w-1/2 p-4 w-full cursor-pointer" key={products[item]._id}>
                <Link legacyBehavior href={`/products/${products[item].slug}`}>
                  {/* Use <a> inside <Link> with legacyBehavior */}
                  <a className="block relative rounded overflow-hidden">
                    <img alt="ecommerce" className="h-[36vh] block" src={products[item].img} />
                  </a>
                </Link>
                <div className="mt-4">
                  <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
                    {products[item].category}
                  </h3>
                  <h2 className="text-gray-900 title-font text-lg font-medium">
                    {products[item].title}
                  </h2>
                  <p className="mt-1">₹{products[item].price}</p>
                  <div className="mt-1">
                  {products[item].size.includes("S") &&  <span className="border border-gray-300 px-1 mx-1">S </span>}
                  {products[item].size.includes("M")  && <span className="border border-gray-300 px-1 mx-1">M</span>}
                  {products[item].size.includes("XL") &&  <span className="border border-gray-300 px-1 mx-1">XL </span>}
                 {products[item].size.includes("XS") &&  <span className="border border-gray-300 px-1 mx-1">XS </span>}
                  {products[item].size.includes("XXL") &&  <span className="border border-gray-300 px-1 mx-1">XXL </span>}
                  </div>
                  <div className="mt-1">
                  {products[item].color.includes("Red") &&  <button class="bg-red-700 rounded-full w-6 h-6 px-1 focus:outline-none"></button>}
                  {products[item].color.includes("Blue")  && <button class="bg-blue-700 rounded-full w-6 h-6 px-1 focus:outline-none"></button>}
                  {products[item].color.includes("White") &&  <button class="bg-white-700 rounded-full w-6 h-6 px-1 focus:outline-none"></button>}
                 {products[item].color.includes("Purple") &&  <button class="bg-purple-700 rounded-full w-6 h-6 px-1 focus:outline-none"></button>}
                  {products[item].color.includes("Grey") &&  <button class="bg-gray-700 rounded-full w-6 h-6 px-1 focus:outline-none"></button>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export async function getServerSideProps(context) {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect("mongodb://127.0.0.1:27017/codeswearyoutubedb");
  }
  let products = await Product.find({ category: "tshirt" });
  let tshirts={};
  for(let item of  products)
  {
    if(item.title in tshirts)
    {
    if(!tshirts[item.title].color.includes(item.color) &&  item.availableQty>0)
    {
      tshirts[item.title].color.push(item.color);
    }
    if(!tshirts[item.title].size.includes(item.size) &&  item.availableQty>0)
    {
      tshirts[item.title].size.push(item.size);
    }
  }
  else
  {
     tshirts[item.title]=JSON.parse(JSON.stringify(item));
     if(item.availableQty>0)
     {
       tshirts[item.title].color=[item.color];
       tshirts[item.title].size=[item.size];
     }

  }
  }

  return {
    props: { products: JSON.parse(JSON.stringify(tshirts)) },
  };
}

export default Tshirts;

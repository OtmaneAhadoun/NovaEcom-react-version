import React from "react";

function Cart({product,addProduct}) {
  return <div className="w-[300px] h-[400px] border">
    <img  className="h-[210px] w-full border-b" src={product.thumbnail} alt="" />
    <div className=" p-2 flex flex-col h-[190px] justify-between">
    <div>
        <h1 className=" text-xl font-semibold  capitalize">{product.title}</h1>
        <p className=" text-gray-600 text-sm capitalize">{product.description.slice(0,80)}</p>
        <div className=" flex items-center justify-between">
            <span className=" capitalize underline text-lg">{product.category}</span>
            <div className=" gap-1 flex"><span>$</span><span className=" text-2xl">{product.price}</span><span className=" line-through">{product.price+92}</span></div>
        </div>
    </div>
    <div className=" flex items-center gap-1 ">
        <button onClick={()=>addProduct(v=>{
            const ele=v.find(e=>e.id==product.id)
            if(ele){
                if(product.id==ele.id){
                    return v
                }
            }
            product["qtt"]=1
            return [...v,product]
            })} className=" p-2 capitalize text-lg hover:bg-green-500 transition-all bg-green-400 text-white">add to cart</button>
        <button className=" p-[13px] border select-none">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
        </svg>
        </button>
    </div>
    </div>
  </div>;
}

export default Cart;

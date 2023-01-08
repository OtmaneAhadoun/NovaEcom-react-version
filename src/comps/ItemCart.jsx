import React from "react";

function ItemCart({ item, Controlitem,removeItem,reset }) {
  const incrementQtt = (e) => {
    e.qtt += 1;
    Controlitem((v) => [...v]);
  };
  const deccrementQtt = (e) => {
    if (e.qtt > 1) {
      e.qtt -= 1;
      Controlitem((v) => [...v]);
    }
  };
  return (
    <div className="w-full px-1 py-2 gap-2 border relative  items-center flex">
      <span onClick={()=>removeItem(item)} className=" absolute bottom-3 right-2 text-gray-500 hover;text-black hover:scale-110 transition-all hover:text-black cursor-pointer">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-5 h-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </span>
      <img
        src={item.thumbnail}
        className="w-[100px]  object-cover h-[100px]"
        alt=""
      />
      <div>
        <h1 className=" text-lg leading-none">{item.title}</h1>
        <div className=" w-full flex flex-col">
          <span className=" capitalize underline text-sm text-gray-500">
            {item.category}
          </span>
          <div className=" gap-1 flex">
            <span className=" text-lg">{item.price}</span>
            <span>$</span>
          </div>
          <div className=" flex justify-between w-[105px] items-center text-xl">
            <button
              onClick={() => incrementQtt(item)}
              className="p-1 hover:bg-slate-50 transition-all px-3 border"
            >
              +
            </button>
            <span>{item.qtt}</span>
            <button
              onClick={() => deccrementQtt(item)}
              className="p-1 hover:bg-slate-50 transition-all  border px-3 text-xl"
            >
              -
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ItemCart;

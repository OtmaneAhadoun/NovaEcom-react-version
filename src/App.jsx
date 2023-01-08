
import "./App.css";
import { useState } from "react";
import { useEffect } from "react";
import Cart from "./comps/Cart";
import ItemCart from "./comps/ItemCart";
function App() {
  const [data, setData] = useState([]);
  const limit = 8;
  const [current,setCurrent]=useState(localStorage.getItem('current')||1)
  const pagination = [...Array(Math.ceil(data.length / limit)).keys()];
  const finalpagination = pagination.map((e) => e + 1);
  const [cartData, setCartdata] = useState(
    [...new Set(JSON.parse(localStorage.getItem("products")))] || []
  );
  useEffect(async () => {
    const response = await fetch("https://dummyjson.com/products");
    const data = await response.json();
    setData(data.products);
  }, []);
  useEffect(()=>{
    localStorage.setItem('current',current)
  },[current])
  useEffect(() => {
    localStorage.setItem("products",JSON.stringify(cartData));
  }, [cartData]);
  const paginate=(current)=>{
    const start=(current-1)*limit
    const end=current*limit
    return [start,end]
  }
  const [start,end]=paginate(current)
  if (!data.length) {
    return (
      <h1 className=" fixed text-2xl capitalize translate-x-[-50%] translate-y-[-50%] top-[50%] left-[50%]">
        loading...
      </h1>
    );
  }
  const reset=()=>setCartdata([])
  const removeItem=(item)=>{
    setCartdata(v=>[...v.filter(e=>e!==item)])
  }
  const ControlPaginate=(e)=>{
    if(e>finalpagination.length){
      return 1
    }if(e<1){
      return finalpagination.length
    }
    return e
  }
  const Nextbtn=()=>{
    setCurrent(v=>{
      let index=v+1
      return ControlPaginate(index)
    })
  }
  const Prevbtn=()=>{
    setCurrent(v=>{
      let index=v-1
      return ControlPaginate(index)
    })
  }
  return (
    <div className=" flex flex-col relative">
      <div className="w-full px-2 sticky top-0 bg-white md:px-[10%] lg:px-[15%] shadow-shad transition-all py-2  flex justify-between items-center ">
        <h1 className=" capitalize text-3xl font-medium">
          nova<span className=" text-green-400">Ecom</span>
        </h1>
        <div className=" relative  pl-2 h-[100%] group cursor-pointer">
          <span className=" absolute top-[50%] left-[50%] translate-x-[-10%] translate-y-[-32%] text-sm">{cartData.length}</span>
          <svg
            class="h-8 w-8 text-black"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1"
              d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
            />
          </svg>

          <div className=" absolute p-1  pb-2 cursor-auto gap-1 overflow-auto flex-col translate-y-2 hidden  group-hover:flex group-hover:translate-y-0 bg-white transition-all  w-[350px] right-0 h-[400px]  border">
            {cartData.length ? (
              <>
                {cartData.map((e) => (
                  <ItemCart removeItem={removeItem} Controlitem={setCartdata} item={e} />
                ))}
                <div className=" flex gap-2 text-white items-center ">
                  <span className=" capitalize text-black text-xl w-[140px] ">
                    cost :
                    {cartData.reduce((p, e) => {
                      return p + e.price * e.qtt;
                    }, 0)}
                    $
                  </span>
                  <button className=" capitalize text-lg p-2 grow bg-green-400 hover:bg-green-500 transition-all ">
                    payemnt
                  </button>
                  <button onClick={reset} className=" capitalize text-lg p-2  grow bg-green-400 hover:bg-green-500 transition-all ">
                    reset
                  </button>
                </div>
              </>
            ) : (
              <h1 className=" fixed text-xl capitalize translate-x-[-50%] translate-y-[-50%] top-[50%] left-[50%]">
                no item
              </h1>
            )}
          </div>
        </div>
      </div>
      <div className="w-full px-2 my-2 pb-[70px] justify-center transition-all md:px-[10%] flex gap-1 flex-wrap lg:px-[15%] grow">
        {data.slice(start,end).map((e) => (
          <Cart addProduct={setCartdata} product={e} />
        ))}
      </div>
      <div className="fixed z-10  border bottom-4 flex bg-white right-4">
        <span onClick={Prevbtn} className="flex p-3 border-r items-center justify-between hover:bg-gray-100 cursor-pointer ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-4 h-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M18.75 19.5l-7.5-7.5 7.5-7.5m-6 15L5.25 12l7.5-7.5"
            />
          </svg>
        </span>
        {finalpagination.map((e) => (
          <span onClick={()=>setCurrent(e)} className={`${current==e?" select-none p-3 border-r text-base px-4 bg-gray-100 cursor-pointer":"p-3 select-none border-r text-base px-4 hover:bg-gray-100 cursor-pointer"}`}>
            {e}
          </span>
        ))}
        <span onClick={Nextbtn} className=" flex p-3 items-center justify-between hover:bg-gray-100 cursor-pointer ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-4 h-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5"
            />
          </svg>
        </span>
      </div>
    </div>
  );
}

export default App;

import { createContext, useContext, useEffect, useMemo, useState } from 'react';
const StoreContext = createContext();
export function StoreProvider({children}){
  const [cart,setCart] = useState(()=>JSON.parse(localStorage.getItem('novacart-cart')||'[]'));
  const [user,setUser] = useState(()=>JSON.parse(localStorage.getItem('novacart-user')||'null'));
  useEffect(()=>localStorage.setItem('novacart-cart',JSON.stringify(cart)),[cart]);
  useEffect(()=> user ? localStorage.setItem('novacart-user',JSON.stringify(user)) : localStorage.removeItem('novacart-user'),[user]);
  const addToCart=(p)=>setCart(c=>{ const found=c.find(i=>i._id===p._id); return found?c.map(i=>i._id===p._id?{...i,qty:i.qty+1}:i):[...c,{...p,qty:1}]});
  const updateQty=(id,qty)=>setCart(c=>qty<=0?c.filter(i=>i._id!==id):c.map(i=>i._id===id?{...i,qty}:i));
  const total=useMemo(()=>cart.reduce((s,i)=>s+i.price*i.qty,0),[cart]);
  return <StoreContext.Provider value={{cart,user,setUser,addToCart,updateQty,setCart,total}}>{children}</StoreContext.Provider>
}
export const useStore=()=>useContext(StoreContext);

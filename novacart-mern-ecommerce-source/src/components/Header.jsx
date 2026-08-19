import { Link, NavLink } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
export default function Header(){
 const {cart,user,setUser}=useStore();
 const count=cart.reduce((s,i)=>s+i.qty,0);
 return <header className="site-header"><div className="shell nav"><Link className="brand" to="/"><span>Nova</span>Cart</Link><nav><NavLink to="/">Shop</NavLink><NavLink to="/about">About</NavLink><NavLink to="/cart">Cart <b>{count}</b></NavLink>{user?<button className="link-btn" onClick={()=>setUser(null)}>Logout</button>:<NavLink to="/login">Login</NavLink>}</nav></div></header>
}

import { useEffect, useMemo, useState } from 'react';
import ProductCard from '../components/ProductCard';
import { fallbackProducts } from '../data/products';
export default function Home(){
 const [products,setProducts]=useState(fallbackProducts), [query,setQuery]=useState(''), [category,setCategory]=useState('All');
 useEffect(()=>{fetch('/projects/novacart/api/products').then(r=>r.ok?r.json():Promise.reject()).then(setProducts).catch(()=>{});},[]);
 const categories=['All',...new Set(products.map(p=>p.category))];
 const shown=useMemo(()=>products.filter(p=>(category==='All'||p.category===category)&&p.name.toLowerCase().includes(query.toLowerCase())),[products,category,query]);
 return <><section className="hero"><div className="shell hero-grid"><div><div className="kicker">SOFTWARE ENGINEERING · FULL-STACK PROJECT</div><h1>Useful tech.<br/><span>Beautifully simple.</span></h1><p>Explore a modern MERN-powered storefront with product discovery, cart management, authentication, checkout and order APIs.</p><a className="primary" href="#catalog">Shop collection</a></div><div className="hero-card"><div className="orb"></div><div><small>Featured</small><h2>Aero Headphones</h2><p>Wireless freedom. Focused sound.</p><strong>$129</strong></div></div></div></section><main className="shell" id="catalog"><div className="section-head"><div><div className="kicker">CURATED COLLECTION</div><h2>Shop the essentials</h2></div><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search products..."/></div><div className="filters">{categories.map(c=><button key={c} className={category===c?'active':''} onClick={()=>setCategory(c)}>{c}</button>)}</div><section className="grid">{shown.map(p=><ProductCard key={p._id} p={p}/>)}</section></main></> }

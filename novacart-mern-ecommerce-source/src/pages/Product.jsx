import { useParams } from 'react-router-dom';
import { fallbackProducts } from '../data/products';
import { useStore } from '../context/StoreContext';
export default function Product(){ const {id}=useParams(); const {addToCart}=useStore(); const p=fallbackProducts.find(x=>x._id===id)||fallbackProducts[0]; return <main className="shell detail"><img src={p.image} alt={p.name}/><div><div className="kicker">{p.category}</div><h1>{p.name}</h1><div className="rating">★ {p.rating} · {p.stock} available</div><p>{p.description}</p><h2>${p.price}</h2><button className="primary" onClick={()=>addToCart(p)}>Add to cart</button><div className="meta"><span>✓ Secure checkout</span><span>✓ Responsive MERN application</span><span>✓ REST API powered</span></div></div></main> }

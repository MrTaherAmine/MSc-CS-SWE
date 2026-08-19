import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const app = express();
app.use(cors());
app.use(express.json());

const demoProducts = [
  { _id:'p1', name:'Aero Wireless Headphones', category:'Audio', price:129, rating:4.8, stock:14, image:'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=80', description:'Immersive over-ear wireless headphones with rich sound and all-day comfort.' },
  { _id:'p2', name:'Pulse Smart Watch', category:'Wearables', price:189, rating:4.7, stock:9, image:'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=80', description:'A refined fitness and notification companion with a bright display and long battery life.' },
  { _id:'p3', name:'Arc Mechanical Keyboard', category:'Accessories', price:99, rating:4.9, stock:21, image:'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=900&q=80', description:'Compact mechanical keyboard with tactile switches and a clean productivity-first layout.' },
  { _id:'p4', name:'Orbit Desk Lamp', category:'Home Office', price:74, rating:4.6, stock:18, image:'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=900&q=80', description:'Minimal LED desk lamp with adjustable warmth and brightness for focused work.' },
  { _id:'p5', name:'Flux Portable Speaker', category:'Audio', price:79, rating:4.5, stock:25, image:'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=900&q=80', description:'Compact Bluetooth speaker designed for travel, clear vocals, and balanced bass.' },
  { _id:'p6', name:'Vector Laptop Stand', category:'Accessories', price:49, rating:4.7, stock:30, image:'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=900&q=80', description:'Aluminium laptop stand that improves ergonomics and keeps your desk organised.' }
];

const connected = { value: false };
async function connectDb(){
  if (!process.env.MONGODB_URI || connected.value) return connected.value;
  try { await mongoose.connect(process.env.MONGODB_URI); connected.value = true; } catch (e) { console.error('MongoDB unavailable, using demo mode'); }
  return connected.value;
}

const userSchema = new mongoose.Schema({ name:String, email:{type:String,unique:true}, password:String }, {timestamps:true});
const orderSchema = new mongoose.Schema({ email:String, items:Array, total:Number, shipping:Object, status:{type:String,default:'Confirmed'} }, {timestamps:true});
const User = mongoose.models.User || mongoose.model('User', userSchema);
const Order = mongoose.models.Order || mongoose.model('Order', orderSchema);

app.get('/api/health', async (_req,res)=>{ await connectDb(); res.json({ok:true,database:connected.value?'mongodb':'demo'}); });
app.get('/api/products', (_req,res)=> res.json(demoProducts));
app.get('/api/products/:id', (req,res)=> {
  const item = demoProducts.find(p=>p._id===req.params.id);
  item ? res.json(item) : res.status(404).json({message:'Product not found'});
});
app.post('/api/auth/register', async (req,res)=>{
  const {name,email,password} = req.body;
  if (!name || !email || !password) return res.status(400).json({message:'All fields are required'});
  await connectDb();
  if (!connected.value) return res.json({token:jwt.sign({email,name},process.env.JWT_SECRET||'demo-secret'), user:{name,email}, demo:true});
  if (await User.findOne({email})) return res.status(409).json({message:'Account already exists'});
  const user = await User.create({name,email,password:await bcrypt.hash(password,10)});
  res.status(201).json({token:jwt.sign({id:user._id,email},process.env.JWT_SECRET),user:{name,email}});
});
app.post('/api/auth/login', async (req,res)=>{
  const {email,password} = req.body; await connectDb();
  if (!connected.value) return res.json({token:jwt.sign({email},process.env.JWT_SECRET||'demo-secret'), user:{name:email.split('@')[0],email}, demo:true});
  const user = await User.findOne({email});
  if (!user || !(await bcrypt.compare(password,user.password))) return res.status(401).json({message:'Invalid credentials'});
  res.json({token:jwt.sign({id:user._id,email},process.env.JWT_SECRET),user:{name:user.name,email:user.email}});
});
app.post('/api/orders', async (req,res)=>{
  const {email,items,total,shipping} = req.body;
  if (!items?.length || !shipping?.address) return res.status(400).json({message:'Invalid order'});
  await connectDb();
  if (!connected.value) return res.status(201).json({_id:`DEMO-${Date.now()}`,email,items,total,shipping,status:'Confirmed',demo:true});
  const order = await Order.create({email,items,total,shipping});
  res.status(201).json(order);
});

app.use((err,_req,res,_next)=>{ console.error(err); res.status(500).json({message:'Unexpected server error'}); });
export default app;

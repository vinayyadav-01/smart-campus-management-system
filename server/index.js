require('dotenv').config();
const express=require('express');const cors=require('cors');const db=require('./db');
const app=express();app.use(cors({origin:true}));app.use(express.json({limit:'1mb'}));
app.get('/api/health',async(req,res)=>{try{await db.query('SELECT 1');res.json({status:'ok',database:'connected'});}catch{res.status(503).json({status:'error',database:'unavailable'});}});
app.use('/api/auth',require('./routes/auth'));app.use('/api/dashboard',require('./routes/dashboard'));app.use('/api/students',require('./routes/students'));app.use('/api/courses',require('./routes/courses'));app.use('/api/attendance',require('./routes/attendance'));app.use('/api/fees',require('./routes/fees'));app.use('/api/notices',require('./routes/notices'));
app.use((req,res)=>res.status(404).json({message:'API endpoint not found.'}));
app.use((err,req,res,next)=>{console.error(err);if(err.code==='ER_DUP_ENTRY')return res.status(409).json({message:'A record with that unique value already exists.'});if(err.code==='ER_NO_REFERENCED_ROW_2')return res.status(400).json({message:'Selected related record does not exist.'});res.status(500).json({message:'Something went wrong. Check server configuration and try again.'});});
const port=Number(process.env.PORT||5000);app.listen(port,()=>console.log(`Smart Campus API running at http://localhost:${port}`));

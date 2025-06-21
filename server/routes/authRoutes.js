require('dotenv').config()
const express = require("express");
const router = express.Router();
const jwt=require('jsonwebtoken')
const bcrypt = require("bcryptjs");
const Admin=require('../models/Admin')

router.post('/login',async (req,res) => {
    const {email,password}=req.body

    const admin=await Admin.findOne({email})
    if(!admin) return res.status(401).json({error:"Invalid email"})

    const isMatch=await bcrypt.compare(password,admin.password)
    if(!isMatch) return res.status(401).json({error:"Invalid Password"})
    
        const token=jwt.sign({id:admin._id},process.env.SECRET_)

})
const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
//middleware
app.use(express.json());

app.get('/',(req,res)=>{
    res.send('MERN Portfolio API is running')
})

const PORT=process.env.PORT||5000

app.listen(PORT,()=>{
    console.log(`Server listening on port ${PORT}`);
    
})
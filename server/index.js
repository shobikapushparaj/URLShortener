const express = require('express');
const cors = require('cors');
const connectDB=require('./db');
const appRouter = require('./routes/approuter');


const app = express();
app.use(express.json());
app.use(cors());

connectDB();

app.use('/', appRouter);

const port =5000;
app.listen(port,()=>{
    console.log(`server is running on ${port}`)
})

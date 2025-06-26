const express = require('express');
const cors = require('cors');
const connectDB=require('./db');
const authRouter = require('./routes/auth');
const appRouter = require('./routes/approuter');


const app = express();
app.use(express.json());
app.use(cors());

connectDB();

app.use('/', appRouter);
app.use('/api/auth', authRouter);

const port =5000;
app.listen(port,()=>{
    console.log(`server is running on ${port}`)
})

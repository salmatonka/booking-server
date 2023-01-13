const express = require('express');
const cors = require('cors');
const { ObjectId } = require('mongodb');
require('dotenv').config();

const port = process.env.PORT || 5000;
const app = express();

//middleware
app.use(cors());
app.use(express.json());


const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.ycofkd3.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });



async function run(){
    try{
         const bookingCollect = client.db('hotelBooking').collection('bookings');


        app.get('/',async(req,res)=>{
            const query = {}
            const cursor = bookingCollect.find(query)
            const bookings = await cursor.toArray()
            res.send(bookings)
        })

        app.get('/bookings',async(req,res)=>{
            const query = {}
            const cursor = bookingCollect.find(query)
            const bookings = await cursor.toArray()
            res.send(bookings)
        })
        

        app.get('/bookings/:id',async(req,res)=>{
            const id=req.params.id;
            const query ={_id: ObjectId(id)};
            const booking = await bookingCollect.findOne(query);
            res.send(booking)
        })
    }
    finally{

    }
}
run().catch(console.log);



app.get('/', (req,res) =>{
    res.send('hotel bookings')
})
app.listen(port,() =>{
    console.log(`server running :${port}`);
})

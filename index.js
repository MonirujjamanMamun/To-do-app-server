
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json())



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.gxpxm.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        await client.connect();
        const toDoColletion = client.db("to-do-app").collection("toDoData");

        app.get('/data', async (req, res) => {
            const result = await toDoColletion.find().toArray();
            res.send(result)
        });


        app.post('/data', async (req, res) => {
            const data = req.body;
            const result = await toDoColletion.insertOne(data);
            res.send(result)
        })

        app.delete('/data/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await toDoColletion.deleteOne(query);
            res.send(result)
        })
    }
    finally { }
}
run().catch(console.dir);


app.get('/', (req, res) => {
    res.send('hello')
})

app.listen(port, () => {
    console.log('listen', port)
})
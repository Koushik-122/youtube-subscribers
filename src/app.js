
const express = require('express');
const path = require("path");
const subscriber = require('./models/subscribers');

const app = express()

// To use static files we need to give permission of the public folder
app.use(express.static(__dirname));
// Routes
// API to render html file
app.get('/',(req, res) => {
    res.sendFile(__dirname + '/index.html');
});
// API to get all data of the subscribers
app.get('/subscribers', async (req, res) => {
    try{
        const subscribers = await subscriber.find();
        res.json(subscribers);
    }catch(err) {
        res.status(404)
    }
})
// API to get all subscribers by name and subscribedChannel
app.get('/subscribers/name', async(req, res)=> {
    try{
        const subscribers = await subscriber.find(
            {},
            {_id:0, name:1, subscribedChannel:1}
        )
        res.status(200).send(subscribers);
    }catch(err){
        res.status(404).send({error_message: "No subscribers found"});
    }
})
// API to get subscribers by id
app.get('/subscribers/:id', async(req,res) =>{
    try{
        const subscribers = await subscriber.findById(req.params.id);
        if(!subscribers){
            res.status(404).send({error_message:"subscriber not found"})
        }
        res.status(200).send(subscribers);
    }catch(err){
        res.status(404)
    }
})
// Handles all the unwanted request
app.use((req, res) => {
    res.status(404).send({error_message: "Route not found"});
});


module.exports = app;

const http =require('http')
const url =require('url')
const fs =require('fs')
const {mongoClient,objectId} =require('mongodb')
const querystring =require('querystring')

const client = new mongoClient("//127.0.0.1:27017/")
const PORT = 3000;
const app=http.createServer(async(req,res)=>{
    // create db
    const db=client.db("bloodDonation")

    // create collection
    const collection =db.collection('donorDetails')

    const{pathname}= url.parse(req.url);
    
    // file loading
    if(pathname =='/'){
        res.writeHead(200,{"content-Type":"text/html"});
        res.end(fs.readFileSync("./home.html"))
    }
})


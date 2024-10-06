const express = require('express');
const app = express();
const path = require('path');
const PORT = process.env.PORT || 3600;
const bodyParser = require('body-parser');

const ds = require('./model/data');


app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname,'public')));

app.get('/',(req,res,next)=>{
    res.sendFile(path.join(__dirname,'public','inventory.html'));
})

app.get('/getproducts',(req,res,next)=>{

   ds.execute('SELECT * FROM inventory_management').then(resp =>{
     res.json(resp[0])
   }).catch(err => console.log(err))
})

app.post('/addproduct',(req,res,next)=>{
    const receivedData = req.body;
    console.log(receivedData);
    let prodN = req.body.prod_name;
    let prodD = req.body.prod_desc;
    let prodP = Number(req.body.prod_price);
    let prodQ = Number(req.body.prod_qty);
    console.log(prodN,prodD,prodP,prodQ);
    ds.execute("INSERT INTO `node-complete`.`inventory_management` (product_name,price,description,quantity) VALUES(?,?,?,?)",[prodN,prodP,prodD,prodQ]).then(resp => {
           res.redirect('/')
    }).catch(err => console.log(err));
    res.redirect('/')
})

app.post('/updateqty',(req,res,next)=>{
    const dat = req.body;
    ds.execute('UPDATE inventory_management SET quantity = ? WHERE id = ?',[dat.updatedQty,Number(dat.val)]).then(resp =>{
        res.json({message: "Data updated successfully!",data:req.body});
    }).catch(err => console.log(err));
})

app.listen(PORT,()=> console.log(`Server running in PORT ${PORT}`));
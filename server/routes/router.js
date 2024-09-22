const express = require('express');
const router = express.Router();
const Products = require("../models/productsSchema");
const USER = require("../models/userSchema");
const bcrypt = require("bcryptjs");
const authenticate = require("../middleware/authenticate")

//get products data api
router.get("/getProducts",async (req,res)=>{
    try{
        const productsData = await Products.find();
        res.status(201).send(productsData);
        //console.log("Console the data" + productsData);
    }catch(error){
        console.log(error.message);
    }
})

router.get("/getproductsone/:id",async (req,res)=>{
    try {
        const {id} = req.params;
        // console.log(id);
        // console.log("Called");
        console.log(id);
        const individualData = await Products.findOne({id:id});
        console.log(individualData +"individual data");
        res.status(201).json(individualData);
    } catch (error) {
        res.status(400).json(individualData);
        console.log("error"+error.message);
    }
});


//register data
router.post("/register",async (req,res)=>{
    //console.log(req.body);
    const {fname, email, mobile, password, cpassword} = req.body;
    if(!fname || !email || !mobile || !password || !cpassword){
        res.status(422).json({error: "fill all the data"});
        console.log("No data available")
    };

    try {
        const preuser = await USER.findOne({email:email});
        if(preuser){
            res.status(422).json({error:"this user is already present"});
        }else if(password !== cpassword){
            res.status(422).json({error:"password and cpassword not match"});
        }else{
            const finalUser=new USER({
                fname,email,mobile,password,cpassword
            });

            const storedata = await finalUser.save();
            console.log(storedata);
            res.status(201).json(storedata);
        }
    } catch (error) {
        console.log(error);
    }
})

//Login users
router.post("/login", async (req, res)=>{
    const {email, password} = req.body;
    console.log(email);
    if(!email || !password){
        res.status(400).json({error:"Fill the all data"});
    };

    try{
        const userLogin = await USER.findOne({email:email});
        console.log(userLogin);
        if(userLogin){
            const isMatch = await bcrypt.compare(password, userLogin.password);
            
            if(!isMatch){
                res.status(400).json({error:"invalid details"});
            }else{
                //token generate
            const token = await userLogin.generateAuthToken();
            //console.log(token);

            res.cookie("Amazonweb", token, {
                expires:new Date(Date.now()+900000),
                httpOnly:true
            })
                res.status(201).json(userLogin);
            }
        }else{
            res.status(400).json({error:"invalid details"});
        }
    }catch(error){
        res.status(400).json({error:"invalid details"});
    }
})

//adding the data into cart
router.post("/addcart/:id",authenticate,async (req,res)=>{
    try {
        const {id} = req.params;
        console.log(req.params);
        console.log(id);
        const cart = await Products.findOne({id:id});
        console.log(cart + "cart value")

        const UserContact = await USER.findOne({_id:req.userID});
        console.log(UserContact);

        if(UserContact){
            const cartData = await UserContact.addCartData(cart)
            await UserContact.save();
            console.log(cartData);
            res.status(201).json(UserContact);
        }else{
            res.status(401).json({error:"Invalid User"});
        }

    } catch (error) {
        res.status(401).json({error:"Invalid User"});
    }
})

//get cart details
router.get("/cartdetails", authenticate, async (req, res)=>{
    try {
        const buyuser = await USER.findOne({_id:req.userID});
        res.status(201).json(buyuser);
    } catch (error) {
        console.log("error"+error);
    }
})

//get valid user
router.get("/validuser", authenticate, async (req, res)=>{
    try {
        const validuserone = await USER.findOne({_id:req.userID});
        res.status(201).json(validuserone);
    } catch (error) {
        console.log("error"+error);
    }
})

//remove item from cart
router.delete("/remove/:id", authenticate, async(req, res)=>{
    try {
        const {id} = req.params;
        req.rootUser.carts = req.rootUser.carts.filter((cruval)=>{
            return cruval.id!=id;
        });
        req.rootUser.save();
        res.status(201).json(req.rootUser);
        console.log("item remove");
    } catch (error) {
        console.log("error: "+ error);
        res.status(400).json(req.rootUser);
    }
})

//logout
router.get('/logout',authenticate, (req,res)=>{
    try{
        req.rootUser.tokens = req.rootUser.tokens.filter((curelem)=>{
            return curelem.token!==req.token
        });
        res.clearCookie("Amazonweb",{path:"/"});
        req.rootUser.save()
        res.status(201).json(req.rootUser.tokens);
        console.log("User logout");
    }catch(error){
        console.log("error for user logout")
    }
})

module.exports = router;
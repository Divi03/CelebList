const express = require('express');
const router = express.Router();
const cors = require('cors'); 
require('../db/server')
router.use(cors());
const List = require('../schema/schema');


router.get('/',async(req,res)=>{
  res.send("Hello")
})

// to get Data
router.get('/data',async(req,res)=>{
    const data = await List.find()
    // console.log(data)
    res.json(data)
})


// to add data
router.post('/addCeleb',async(req,res)=>{
    const {name,userName,followers,email,phone,imgUrl} = req.body;
    console.log(req.body)

    if(!name || !email || !userName || !followers || !phone || !imgUrl){
        return res.status(422).json({error:"error fill all"})
    }

    try{
        const dataExist = await List.findOne({userName:userName})

        if(dataExist){
            return res.status(422).json({error:"username exist"})
        }
        const listItem = new List(req.body)
        const listItemSaved = await listItem.save();

        if(listItemSaved){
            res.status(201).json({message:"Added successfully"});
        }
        else{
            res.status(500).json({message:"Failed to save"});
        }
    }
    catch(error){
        console.log(error)
    }
})

router.get('/searchCeleb/:userName',async(req,res)=>{
  const userName = req.params.userName;

  try{
      const dataExist = await List.findOne({userName:userName})

      if(dataExist){
        console.log(dataExist)
          res.json(dataExist)
      }
      else{
          res.status(500).json({message:"Failed to save"});
      }
  }
  catch(error){
      console.log(error)
  }
})


// to remove data
router.post('/removeCeleb/:userName', async (req, res) => {
    try {
      const userName = req.params.userName;
  
      const result = await List.deleteOne({ userName: userName });
  
      if (result.deletedCount === 1) {
        res.status(200).json({ message: `Successfully removed ${userName}` });
      } else {
        res.status(404).json({ error: `${userName} not found` });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  

module.exports = router;
const { Router } = require('express');
const { storage } = require('./../firebase');
const router = new Router();
const fs = require('fs');

// GET hamster image
router.get('/:filename', async (req, res)=>{
    
    //console.log(req.params.filename)
    
    
    try{
        const fetchImg = await storage.bucket()
        .file(`hamsters-pics/${req.params.filename}`)
        .download()
        
        let pic = Buffer.concat(fetchImg)
        res.status(200).contentType('jpeg').send(pic) 
    
        
    }catch(err){
        res.status(500).send(err)
    }

});


module.exports = router;
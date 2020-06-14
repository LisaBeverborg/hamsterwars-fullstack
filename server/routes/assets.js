const { Router } = require('express');
const { storage } = require('./../firebase');
const router = new Router();

// GET hamster image
router.get('/:filename', async (req,res) => {
    // Get buffer from storage bucket on firebase
    console.log('Matchade GET route. Params=', req.params);
    let pic = await storage.bucket().file(`hamster-pics/${req.params.filename}`).download();

    // Convert into sendable binary data
    pic = Buffer.concat(pic);

    // Send ok together with requested file
    res.status(200).contentType('jpeg').send(pic);
});


module.exports = router;
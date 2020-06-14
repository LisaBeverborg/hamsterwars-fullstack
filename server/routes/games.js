const { Router } = require('express');
const { db } = require ('./../firebase');
let router = new Router();

// POST a new game
router.post('/', async (req, res) => {
    try {
        console.log('POST')
        let newGame = await db.collection('games').doc();
        
        await newGame.set({
            id:newGame.id,
            timeStamp: Date.now(),
            contestants: req.body.contestants,
            winner: req.body.winner
        })
        res.send({ msg: 'Save a game!'});
    }
    catch(err) {
        res.send(500).send(err);
    }
})


// GET all games





router.get('/', async (req, res)=>{

    try{

        let games =[];

        const fetchGame = await db.collection('games').get();

        fetchGame.forEach(game =>games.push(game.data()))

        res.status(200).send(games);

    }catch(err){
        res.status(500).send(err);
    }


})

module.exports = router;
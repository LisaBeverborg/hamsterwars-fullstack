const { Router } = require('express');
const { db } = require ('./../firebase');
const router = new Router();


//POST upload a new hamster
router.post("/", async (req, res) => {
   try {
        let hamsters = [];
        console.log(req.body);
        let snapShot = await db.collection('hamsters').get();

        snapShot.forEach(doc => {
            hamsters.push(doc.data());
        })

        await db.collection('hamsters').doc().set({
            id: hamsters.length+1,
            name: req.body.name,
            age: req.body.age,
            favFood: req.body.favFood,
            loves: req.body.loves,
            wins: 0,
            defeats: 0,
            games: 0
        });

        res.send({ msg: 'new hamster uploaded' });
    }
    catch(err) {
        res.status(500).send(err);
    }

})
// GET a random hamster
router.get('/random', async (req, res) => {
    let hamstersRandom = []
    
    try {
        let data = await db.collection('hamsters').get();
        
        data.forEach(el => {
            hamstersRandom.push(el.data());
        }) 
        let random = Math.floor(Math.random()* hamstersRandom.length)
        res.send(hamstersRandom[random]);    
    }
    catch(err) {
        res.status(500).send(err);
    }   
})

// GET all hamsters
router.get('/', async (req, res)=>{
    let arr = []
    
    try{
        let data = await db.collection('hamsters').get();
        
        data.forEach(el =>{ 
            arr.push(el.data())
        })
        
        res.send(arr)
        
    }catch(err){
        res.status(500).send(err)
    }  
})

// GET hamster by Id
router.get('/:id', async (req, res) => {
    let id = parseInt(req.params.id); 
    let hamsterId = []
    
    try{
        let hamstersData = await db.collection('hamsters').where('id', '==', id).get()
        
        hamstersData.forEach(hamster =>{ 
            hamsterId.push(hamster.data())
        })    
        res.send(hamsterId[0])     
    }catch(err){
        res.status(500).send(err)
    }
})




// PUT update wins, defeats
router.put('/:id/results', async (req, res) => {
    
    let id = parseInt(req.params.id); 
    let hamsters = await db.collection('hamsters').where('id', '==', id).get()
    
    hamsters.forEach(hamster  => {       
        let data = hamster.data()   
        let hamsterUpdate = { wins:data.wins + parseInt(req.body.wins),  defeats:data.defeats+req.body.defeats, games:data.games+req.body.games };
        db.collection('hamsters').doc(hamster.id).update(hamsterUpdate)
        .then(() => {res.send('Hamster updated.')})
    })
})

module.exports = router;
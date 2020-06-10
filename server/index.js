  const express = require('express');
  const app = express();

  const PORT = process.env.PORT || 3000;
  
  app.use(express.static('public'))
  app.use(express.static(__dirname + '/../build'))
  app.use(express.json());
  
  //Routes
  const hamstersRoute = require('./routes/hamsters');
  const gamesRoute = require('./routes/games');
  const chartsRoute = require('./routes/charts');
  const statsRoute = require('./routes/stats');
  
  app.use('/api/hamsters', hamstersRoute);
  app.use('/api/games',  gamesRoute);
  app.use('/api/charts', chartsRoute);
  app.use('/api/stats', statsRoute);
  
  app.listen(PORT, () => {
    console.log('Server up n running!');
})
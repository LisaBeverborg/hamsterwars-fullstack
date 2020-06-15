  const express = require('express');
  const app = express();

  const serverPort = process.env.PORT || 2048;
  
  //app.use(express.static('public'))
  app.use(express.static(__dirname + '/../build'))
  app.use(express.json());
  
  //Routes
  const hamstersRoute = require('./routes/hamsters');
  const gamesRoute = require('./routes/games');
  const chartsRoute = require('./routes/charts');
  const statsRoute = require('./routes/stats');
  const assetsRoute = require('./routes/assets');

  
  app.use('/api/hamsters', hamstersRoute);
  app.use('/api/games',  gamesRoute);
  app.use('/api/charts', chartsRoute);
  app.use('/api/stats', statsRoute);
  app.use('/api/assets', assetsRoute);
 
  
  app.listen(serverPort, () => console.log('Server is listening on port ' + serverPort));

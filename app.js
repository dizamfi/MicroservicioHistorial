require('dotenv').config();
const { ebChanduyHistorial } = require('./controllers/historyEB');
const { connectionDB } = require('./db/config');


connectionDB();



setInterval(ebChanduyHistorial, 2000);
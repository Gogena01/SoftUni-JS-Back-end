const express = require('express');
const app = express();
const expressConfig = require('./config/expressConfig');
const router = require('./routes');
const initDatabase = require('./config/databaseConfig')

expressConfig(app)

app.use(router)



initDatabase()
    .then(() => {
        app.listen(3000, () => console.log(`The app is running on http://localhost:3000`));
    })
    .catch((err) => {
        console.log('Cannot connect database:', err);
    })
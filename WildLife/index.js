const express = require('express');
const app = express();
const expressConfig = require('./config/expressConfig');
const initDatabase = require('./config/mongooseConfig');
const router = require('./routes');

expressConfig(app);
app.use(router)


initDatabase()
    .then(() => {
        app.listen(3030, () => console.log(`The app is running on http://localhost:3000`));
    })
    .catch((err) => {
        console.log('Cannot connect database:', err);
    })
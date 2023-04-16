const express = require('express');
const expressConfig = require('./config/express');
const app = express();
const router = require('./routes');
const initDatabase = require('./config/databaseConfig')


expressConfig(app);
app.use(router)



initDatabase()
    .then(() => {
        app.listen(3300, () => console.log(`The app is running on http://localhost:3000`));
    })
    .catch((err) => {
        console.log('Cannot connect database:', err);
    })
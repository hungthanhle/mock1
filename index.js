const app = require('./app');
const config = require('./src/config/config.js');
const port = config.port;
app.listen(port,()=>{
    console.log(`Listen ${port}`);
})
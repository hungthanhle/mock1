const app = require('./app');
const config = require('./config/config.js');

const port = config.port;
app.listen(port,()=>{
    console.log(`Listen ${port}`);
})
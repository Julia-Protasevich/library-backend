import app from './app.js';
import config from './config/index.js';


const port = config.port;
const server = app.listen(port, () =>
    console.log(`Server is running on http://locahost:${port}`));
    
export default server;
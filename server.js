import config from './config/index.js';
   
export default (app) => {
    const port = config.port;
    
    return app.listen(port, () =>
            console.log(`Server is running on http://locahost:${port}`));

};
import cors from 'cors';

export default (app) => {
    app.use(cors({
        'origin': '*',
        'methods': 'GET,PUT,POST,OPTIONS,DELETE',
        'preflightContinue': false,
        'optionsSuccessStatus' : 204
      }));
};
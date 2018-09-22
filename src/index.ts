import express from 'express';

const app: express.Application = express();

app.listen(9000, () => {
	console.log('Express server listening on port 9000...');
});
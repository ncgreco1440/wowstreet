require('module-alias/register');
import express from 'express';
import * as bodyParser from 'body-parser';
import {
	RealmRouter
} from './controllers';

const app: express.Application = express();

app.disable('x-powered-by');
app.use(bodyParser.json({type: [ 'application/json', 'text/plain' ]}));

app.use('/wow-realms-data', RealmRouter);

app.listen(9000, () => {
	console.log('Express server listening on port 9000...');
});
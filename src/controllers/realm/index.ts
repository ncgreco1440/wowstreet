import { Router, Request, Response } from 'express';
import { RealmModel, Realm } from './realm.model';

const router: Router = Router();

router.get('/', (req: Request, res: Response) => {
	return res.send('Warcraft Realms Data');
});

router.get('/realms', (req: Request, res: Response) => {
	let { slug, connectedID } = req.query;
	connectedID = +connectedID; 
	const model: RealmModel = new RealmModel();

	if (slug) {
		return res.send(model.getRealm(slug).toJSON());
	} else if (connectedID) {
		return res.send(model.getRealm(connectedID).toJSON());
	}

	return res.send(model.getAllRealms().map((e: Realm) => { return e.toJSON(); }));
});

router.get('/realms/status', async (req: Request, res: Response) => {
	const model: RealmModel = new RealmModel();

	return res.send(await model.getAllRealmStatus<any>());
});

export const RealmRouter: Router = router;
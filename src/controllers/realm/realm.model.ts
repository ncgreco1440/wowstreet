import { Database } from '@app/database';
import { BLIZZARD_COMMUNITY_API_CALL } from '@app/blizzard';

export class Realm {
	private _slug: string = '';
	private _connectedID: number = 0;

	constructor(slug: string, connID: number) {
		this._slug = slug;
		this._connectedID = connID;
	}

	public name(): string {
		return this._slug;
	}

	public connectedID(): number {
		return this._connectedID;
	}

	public toJSON(): any {
		return {
			slug: this.name(),
			connectedID: this.connectedID()
		};
	}
}

export class RealmModel extends Database {
	private _realmStatusURI: string = '/wow/realm/status';

	public getAllRealms(): Realm[] {
		const realms: Realm[] = [
			new Realm('turalyon', 3685),
			new Realm('mugthol', 3455),
			new Realm('area52', 3967)
		];
		return realms;
	}

	public getRealm(slug: string): Realm;
	public getRealm(connectedID: number): Realm;
	public getRealm(realmIdentifier: string | number): Realm {
		if (typeof realmIdentifier === 'string') {
			return new Realm(realmIdentifier, Math.floor(Math.random() * (9999 - 1000) + 1000));
		}
		return new Realm('test_realm', realmIdentifier);
	}

	public async getAllRealmStatus<T>(): Promise<T> {
		try {
			const realms: T = await BLIZZARD_COMMUNITY_API_CALL<T>(this._realmStatusURI);
			return realms;
		} catch (e) {
			console.error(e);
			return e;
		}
	}
}
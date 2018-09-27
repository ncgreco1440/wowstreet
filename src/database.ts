const mysqlx = require('@mysql/xdevapi');

export class Database {
    private _options: Object = {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        password: process.env.DB_PASS,
        user: process.env.DB_USER,
        schema: process.env.DB_SCHEMA
    };
    private _session: any;

    static testConnection(): void {
        mysqlx.getSession(this._options)
            .then((s: any) => {
                s.close();
            })
            .catch((e: any) => {
                console.error(e);
            });
    }
}

Database.testConnection();
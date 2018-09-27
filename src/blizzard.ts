const request = require('request');

export async function BLIZZARD_COMMUNITY_API_CALL<T>(uri: string): Promise<T> {
    const url: string = `${process.env.BLIZZARD_API_DOMAIN}/${uri}?locale=${process.env.BLIZZARD_LOCALE}&apiKey=${process.env.BLIZZARD_KEY}`;
    return new Promise<T>((resolve, reject) => {
        request(url, { json: true }, (e: any, r: any, b: any) => {
            if (e) {
                return reject(e);
            }

            if (r.statusCode != 200) {
                return reject(b);
            }

            return resolve(b);
        });
    });
}
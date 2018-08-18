const LOCAL_HOST_URL = 'http://localhost:3000/';
const ONLINE_API_URL = '';

export class Constants {
    constructor() { }

    static getAPiUrl() {
        return LOCAL_HOST_URL;
    }
}

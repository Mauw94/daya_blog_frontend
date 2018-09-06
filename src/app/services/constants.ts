const LOCAL_HOST_URL = 'http://localhost:3000/';
const ONLINE_API_URL = '';
const LOCAL_FILE_UPLOAD_URL = 'http://localhost:3000/file/upload';

export class Constants {
    constructor() { }

    static getAPiUrl() {
        return LOCAL_HOST_URL;
    }

    static getFileUploadUri() {
        return LOCAL_FILE_UPLOAD_URL;
    }
}

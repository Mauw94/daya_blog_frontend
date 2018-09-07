const LOCAL_HOST_URL = 'http://localhost:3000/';
const ONLINE_API_URL = '';
const LOCAL_FILE_UPLOAD_URL = 'http://localhost:3000/file/upload';
const FILE_UPLOAD_LOCATION = 'http://localhost:3000/uploads/';

export class Constants {
    constructor() { }

    static getAPiUrl() {
        return LOCAL_HOST_URL;
    }

    static getFileUploadUri() {
        return LOCAL_FILE_UPLOAD_URL;
    }

    static getFileUploadLocation() {
        return FILE_UPLOAD_LOCATION;
    }
}

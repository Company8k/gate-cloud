export class GateCloud {

    static auth = Symbol('auth');
    static endpoint = 'https://cloud-api.gate.ac.uk/process/';

    constructor(username, password) {
        //this[GateCloud.auth] = Buffer.from(`${username}:${password}`).toString('base64');//btoa();
        this.user = username, this[GateCloud.auth] = password;
        //console.info(GateCloud.name, 'constructor',this[GateCloud.auth])
    }

    async process(pipe, data, ann = [], contentType) {
        let endpoint = new URL(GateCloud.endpoint.concat(pipe));
        endpoint.username = this.user;
        endpoint.password = this[GateCloud.auth];
        if (ann && Array.isArray(ann) && ann.length) endpoint.search = '?annotations='.concat(ann.join(','));
        //console.info(endpoint);
        return this._fetch_text(endpoint, data)
    }

    _fetch_text(url, text, contentType = "text/plain") {
        return fetch(url, { method: "POSt", headers: { 'Content-Type': contentType/*, 'Authorization': `Basic ${this[GateCloud.auth]}`*/ }, body: text }).then(resp => resp.json());
    }
}
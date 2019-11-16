export class ImageModel {

    // public base64: string;
    // public file: any;
    public id?: string;
    public name: string;
    public path: string;

    constructor(id: string, name: string, path: string)
    {
        this.id = id;
        this.name = name;
        this.path = path;
    }

}
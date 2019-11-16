export class ImageModel {

    public base64: string;
    public file: any;


    constructor(base64:string, file: any)
    {
        this.base64 = base64;
        this.file = file;
    }

}
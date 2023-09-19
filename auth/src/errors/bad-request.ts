import { CustomError } from "./custom-error";

export class BadRequest extends CustomError{
    statusCode = 400;
    message = "Bad request";

    constructor(message: string){
        super(message);
        this.message = message;
    }

    serializeErrors(){
        return [{ message: this.message }]
    }
}
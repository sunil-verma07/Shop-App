
export default class ErrorHandler extends Error{
    constructor(message,statusCode){
        super(message)

        this.statusCode = statusCode

        Error(this,this.constructor)
    }
}


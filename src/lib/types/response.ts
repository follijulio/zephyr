import { User } from "./user";



export class Data {
    user?: User
}
export class Response {
    response: unknown | Data;
    situation: boolean;
    message: string;
    
    constructor(response: unknown, situation: boolean, message: string) {
        this.response = response;
        this.situation = situation;
        this.message = message;
    }
    
    serialize() {
        return {
        response: this.response,
        situation: this.situation,
        message: this.message
        };
    }
    
    deserialize(data: Response): Response {
        return new Response(data.response, data.situation, data.message);
    }
}
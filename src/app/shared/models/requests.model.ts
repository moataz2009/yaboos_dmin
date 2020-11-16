import { Artist } from "./artist.model";
import { User } from "./user.model";


export class  Requests {
    id:number;
    message:string;
    user :User;
  
}
export class programsApiData{
    offset:number;
    limit:number;
    length:number;
    result:Requests[]=[];
}
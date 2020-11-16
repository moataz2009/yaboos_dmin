import { Artist } from "./artist.model";
import { Categories } from "./categories.model";
import { Language } from "./language.model";

export class Album {
  constructor(){
    this.isFeatured = false;
  }

  id : number; 
  title :  string ;
  titleAr :  string ;
  image :  any ;
  extension:string;
  artistId:number;
  artist: Artist
  languageId:number;
  language:Language
  albumCategoryId:number;
  albumCategory: Categories
  realeaseDate :  string;
  isFeatured : boolean;
  guid:string;
  description:string;
  descriptionAr:string;
}
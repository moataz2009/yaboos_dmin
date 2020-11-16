import { Injectable } from '@angular/core';
import { END_POINTS } from './globals/global-config';
import { Songs, DataWithRanking } from 'app/shared/models';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';

const API_URL = END_POINTS.songs;
const API_SearchSongs = END_POINTS.Searchsongs;
@Injectable({
  providedIn: 'root'
})
export class SongsService {

  constructor(private http: HttpClient) { }

  create(model: Songs): Observable<Songs> {
    return this.http.post<Songs>(API_URL, model);
  }


  getAll( offset: string , limit: string  ): Observable<DataWithRanking<Songs>> {

    let params = new HttpParams();
    params = params.append('offset' , offset);
    params = params.append('limit' , limit);
    params = params.append('Title' , "");
    params = params.append('TitleAr' , "");

    return this.http.get<DataWithRanking<Songs>>(API_URL , {params:params});

  }
Search(offset: string , limit: string , filter:string ): Observable<DataWithRanking<Songs>> {
  let params = new HttpParams();
  params = params.append('offset' , offset);
  params = params.append('limit' , limit);
  params = params.append('filter' ,filter);
  return this.http.get<DataWithRanking<Songs>>(API_SearchSongs  , {params:params});
}

  
  get(id: number): Observable<Songs[]> {
    return this.http.get<Songs[]>(API_URL + `/${id}`);
  }

  update( id: number ,model: Songs): Observable<DataWithRanking<Songs>> {
    return this.http.put<DataWithRanking<Songs>>(API_URL +`/${id}`, model);
  }
  delete(id): Observable<Songs>{
    return this.http.delete<Songs>(API_URL + `/${id}`);
  }

  GetSongsOfAlbum(offset: string , limit: string ,id:number):Observable<DataWithRanking<Songs>> {
    
    let params = new HttpParams();

    params = params.append('offset' , offset);
    params = params.append('limit' , limit);
    params = params.append('album' ,id.toString());
    
    return this.http.get<DataWithRanking<Songs>>("http://188.225.184.108:9091/api/songs/GetSongsOfAlbum" , {params:params});
  }

}

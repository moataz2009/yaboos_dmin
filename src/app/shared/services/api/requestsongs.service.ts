import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { END_POINTS } from './globals/global-config';
import { DataWithRanking } from 'app/shared/models';
import { Observable } from 'rxjs';
import { Requests } from 'app/shared/models/requests.model';

const API_URL = END_POINTS.requests;

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  constructor(private http: HttpClient) { }

  getAll(offset: string , limit: string  ): Observable<DataWithRanking<Requests>> {
  let params = new HttpParams();
  params = params.append('offset' , offset);
  params = params.append('limit' , limit);
  return this.http.get<DataWithRanking<Requests>>(API_URL  ,{params:params}  ) }


}

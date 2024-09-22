import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Favorites } from '../models/favorites';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class FavoritesApiService {

  status: string ="";
  errorMessage: string ="";


  constructor(private http : HttpClient) { }


  getFavorites(id : number): Observable<Favorites>{
    return this.http.get<Favorites>(environment.apiUrl + `Favorites/${id}`)
  }

  putFavorites(favorites : Favorites): Observable<Favorites>{
    return this.http.put<Favorites>(environment.apiUrl + `Favorites/${favorites.Id}`, favorites)
  }

  postFavorites(favorites : Favorites): Observable<Omit<Favorites,"Id">>{
    console.log(favorites)
    return this.http.post<Favorites>(environment.apiUrl + 'Favorites', favorites)
  }


}

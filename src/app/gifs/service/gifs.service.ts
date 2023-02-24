import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SeachGifsResponde } from '../interfaces/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apiKey: string = 'p3xdPHblgT9EcERTfO0MzLaIDBHnzB26';
  private _historial: string[] = [];


  public resultados: Gif [] =  [];

  get historial (){
    return [...this._historial];
  }

  constructor( private http: HttpClient) {}

 buscarGifs( query: string = ''){
    
    query = query.trim().toLocaleLowerCase();

    if(!this._historial.includes(query)){

      this._historial.unshift( query);
      this._historial = this._historial.splice(0,10);

    }

    this.http.get<SeachGifsResponde>(`https://api.giphy.com/v1/gifs/search?api_key=p3xdPHblgT9EcERTfO0MzLaIDBHnzB26&q=${query}&limit=10`)
    .subscribe( (response) => {
      console.log(response.data);
      this.resultados = response.data;
      response.data[0].images.downsized_medium.url;
    } )

  }

}

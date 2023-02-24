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

  constructor( private http: HttpClient) {

    this._historial = JSON.parse(localStorage.getItem('historial')!) || [];
    this.resultados = JSON.parse(localStorage.getItem('resultados')!) || [];

    // if(localStorage.getItem('historial')){
    //   this._historial = JSON.parse(localStorage.getItem('historial')!);
    // }
  }

 buscarGifs( query: string = ''){
    
    query = query.trim().toLocaleLowerCase();

    if(!this._historial.includes(query)){

      this._historial.unshift( query);
      this._historial = this._historial.splice(0,10);

      localStorage.setItem('historial', JSON.stringify(this._historial))
      

    }

    this.http.get<SeachGifsResponde>(`https://api.giphy.com/v1/gifs/search?api_key=p3xdPHblgT9EcERTfO0MzLaIDBHnzB26&q=${query}&limit=10`)
    .subscribe( (response) => {
      console.log(response.data);
      this.resultados = response.data;
      localStorage.setItem('resultados', JSON.stringify(this.resultados))
    } )

  }

}

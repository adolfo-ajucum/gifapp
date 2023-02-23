import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apiKey: string = 'p3xdPHblgT9EcERTfO0MzLaIDBHnzB26';
  private _historial: string[] = [];

  get historial (){
    return [...this._historial];
  }


  async buscarGifs( query: string = ''){
    
    query = query.trim().toLocaleLowerCase();

    if(!this._historial.includes(query)){

      this._historial.unshift( query);
      this._historial = this._historial.splice(0,10);

    }

    const resp = await fetch('http://api.giphy.com/v1/gifs/search?api_key=p3xdPHblgT9EcERTfO0MzLaIDBHnzB26&q=Dragon ball')
    const data = await resp.json();
    console.log(data);
  }

}

import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Usuario } from './components/models/usuario';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ServicioService {

  identificador:BehaviorSubject<any>= new BehaviorSubject<any>("identificador"); 

  get getObservable():Observable<any>{
    return this.identificador.asObservable();
  }

  set setOdservable(id:any){
    this.identificador.next(id);
  }



  constructor(private http: HttpClient) { }


  login(username: string, password: string) {
    return this.http.get<any[]>('http://localhost:3000/usuarios');
  }

  banco(id:any){
    return this.http.get<any[]>('http://localhost:3000/entidadFinanciera');
  }

  usuario(id:any){
    return this.http.get<any[]>('http://localhost:3000/usuarios');
  }
}

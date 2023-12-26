import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {HttpClient} from '@angular/common/http';
import { Persona } from '../interfaces/persona';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {
  private myAppUrl: string;
  private myApiUrl: string;

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = 'api/personas/';
   }
   //o que esta sendo retornado eh do tipo Observable<Persona[]> ? 
   getPersonas(): Observable<Persona[]>{
      //concatenacao da router 
      return this.http.get<Persona[]>(`${this.myAppUrl}${this.myApiUrl}`);
   }
   //retorna Observable<void>
   deletePersona(id: number): Observable<void>{
    return this.http.delete<void>(`${this.myAppUrl}${this.myApiUrl}${id}`)
   }

   addPersona(persona: Persona): Observable<void>{
    return this.http.post<void>(`${this.myAppUrl}${this.myApiUrl}`, persona)
   }
   

}

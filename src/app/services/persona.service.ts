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
   getPersona(): Observable<Persona[]>{
      //concatenacao da router 
      return this.http.get<Persona[]>(`${this.myAppUrl}${this.myApiUrl}`);
   }
}

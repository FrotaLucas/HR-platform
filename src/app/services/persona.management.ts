import { Persona } from '../interfaces/persona';
import { Injectable } from '@angular/core';
import { listDePersonas } from '../shared/list-personas';

@Injectable({
  providedIn: 'root',
})
export class PersonaManagement {
  private personas: Persona[] = [];

  // para que serve esse setInitialLIst dado que ja tem a inicializacao no constructor
  setInitialList(personas: Persona[]) {
    this.personas = personas;
  }
  constructor() {
    this.personas = [...listDePersonas];
  }

  getPersona(id: number): Persona | undefined {
    const persona = this.personas.find((x) => x.id === id);
    console.log('Persona Magement:');
    console.log(persona);
    return persona;
  }
  deletePersona(id: number): void {
    this.personas = this.personas.filter((persona) => persona.id !== id);
    console.log(this.personas);
  }

  getListPersona(): Persona[] {
    // console.log('hellow getList');
    return this.personas;
  }

  addPersona(persona: Persona): void {
    persona.id = this.personas.length;
    this.personas.push(persona);
  }

  updatePersona(id: number, persona: Persona): void {
    const index = listDePersonas.findIndex((x) => x.id === id);
    if (index !== -1) {
      this.personas[index] = persona;
    }
  }
}

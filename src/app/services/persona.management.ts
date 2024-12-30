import { Persona } from '../interfaces/persona';

export class PersonaManagement {
  private listPersonas: Persona[];

  constructor(initialList: Persona[]) {
    this.listPersonas = initialList;
  }

  getPersona(id: number): Persona | undefined {
    const persona = this.listPersonas.find((x) => x.id === id);
    console.log('Persona Magement:');
    console.log(persona);
    return persona;
  }
  deletePersona(id: number): void {
    this.listPersonas = this.listPersonas.filter(
      (persona) => persona.id !== id
    );
    console.log(this.listPersonas);
  }

  getListPersona(): Persona[] {
    // console.log('hellow getList');
    return this.listPersonas;
  }

  addPersona(persona: Persona): void {
    this.listPersonas.push(persona);
  }
}

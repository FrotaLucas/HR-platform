import { Persona } from '../interfaces/persona';

export class PersonaManagement {
  private listPersonas: Persona[];

  constructor(initialList: Persona[]) {
    this.listPersonas = initialList;
  }

  updatePersona(id: number, updatedPersona: Persona): void {
    const index = this.listPersonas.findIndex((persona) => persona.id === id);

    if (index !== -1) {
      this.listPersonas[index] = {
        ...this.listPersonas[index],
        ...updatedPersona,
      };
    }
  }

  deletePersona(id: number): void {
    this.listPersonas = this.listPersonas.filter(
      (persona) => persona.id !== id
    );
  }

  getListPersona(): Persona[] {
    return this.listPersonas;
  }
}

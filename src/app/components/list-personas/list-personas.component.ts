import { Component, OnInit } from '@angular/core';
import { Persona } from 'src/app/interfaces/persona';

const listPersonas: Persona[] = [
  {nombre: "Lucas", apellido: "Frota", correo: "frotadiaslucas@hotmail.com", tipoDocumento: 'CNH', documento: 21212121, fechaNacimento: new Date() },
  {nombre: "Maria", apellido: "Loya", correo: "loyadiasMaria@hotmail.com", tipoDocumento: 'CNH', documento: 3333333, fechaNacimento: new Date() },
  {nombre: "Fagner", apellido: "Melles", correo: "fafafagner@hotmail.com", tipoDocumento: 'CNH', documento: 1414141, fechaNacimento: new Date() },
  {nombre: "Jorge", apellido: "Paulo", correo: "jorge@hotmail.com", tipoDocumento: 'CNH', documento: 1414141, fechaNacimento: new Date() }
];

@Component({
  selector: 'app-list-personas',
  templateUrl: './list-personas.component.html',
  styleUrls: ['./list-personas.component.css']
})
export class ListPersonasComponent implements OnInit{
  displayedColumns: string[] = ['nombre', 'apellido', 'correo', 'tipoDocumento', 'documento', 'fechaNacimento'];
  dataSource = listPersonas;
  constructor(){}
  ngOnInit(): void {
    
  }
}

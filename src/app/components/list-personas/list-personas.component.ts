import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Persona } from 'src/app/interfaces/persona';
import { AgregarEditarPersonaComponent } from '../agregar-editar-persona/agregar-editar-persona.component';

const listPersonas: Persona[] = [
  {nombre: "Maria", apellido: "Loya", correo: "loyadiasMaria@hotmail.com", tipoDocumento: 'CNH', documento: 3333333, fechaNacimento: new Date() },
  {nombre: "Fagner", apellido: "Melles", correo: "fafafagner@hotmail.com", tipoDocumento: 'CNH', documento: 1414141, fechaNacimento: new Date() },
  {nombre: "Jorge", apellido: "Paulo", correo: "jorge@hotmail.com", tipoDocumento: 'CNH', documento: 1414141, fechaNacimento: new Date() },
  {nombre: "Iago", apellido: "Ottilis", correo: "claudia@hotmail.com", tipoDocumento: 'CNH', documento: 1414141, fechaNacimento: new Date() },
  {nombre: "Grazi", apellido: "Carneiro", correo: "grazi@hotmail.com", tipoDocumento: 'CNH', documento: 1414141, fechaNacimento: new Date() },
  {nombre: "Lucas", apellido: "Frota", correo: "frotadiaslucas@hotmail.com", tipoDocumento: 'CNH', documento: 21212121, fechaNacimento: new Date() },
  {nombre: "Grazi", apellido: "Carneiro", correo: "grazi@hotmail.com", tipoDocumento: 'CNH', documento: 1414141, fechaNacimento: new Date() }
];

@Component({
  selector: 'app-list-personas',
  templateUrl: './list-personas.component.html',
  styleUrls: ['./list-personas.component.css']
})
export class ListPersonasComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['nombre', 'apellido', 'correo', 'tipoDocumento', 'documento', 'fechaNacimento', 'acoes'];
  dataSource: MatTableDataSource<Persona> 

  //ache o componente MatPaginator e atribua ele a myCustomPaginator
  @ViewChild(MatPaginator) myCustomPaginator!: MatPaginator;
  @ViewChild(MatSort) myCustomSort!: MatSort;

  // DUVIDA
  //ja que caixa de dialog-MatDialogModule chamada diz respeito ao componente AgregarEditarPersonaComponent.
  // pq ele esta sendo declarado aqui no parametro do constructor e nao em agregar-editar-persona??????
  //ver componente addEditPersona()
  constructor(public dialog: MatDialog){
    this.dataSource = new MatTableDataSource(listPersonas)
  }
  applyFilter(event: Event){
    const filteredValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filteredValue.trim().toLowerCase();

    if(this.dataSource.paginator){
      this.dataSource.paginator.firstPage()
    }
  }

  //TEMTAR FAZER ESSE PREENCHIMENTO NO ARQUIVO Ts de AGREGAR EDITAR
  addEditPersona() {
    const dialogRef = this.dialog.open(AgregarEditarPersonaComponent, {width: "550px", disableClose: true})
    dialogRef.afterClosed().subscribe(result => { console.log('The dialog was closed')})
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.myCustomPaginator;
    this.dataSource.sort = this.myCustomSort;
    //this.dataSource.paginator._intl.itemsPerPageLabel = "items per pagina";
  }
  ngOnInit(): void {
  }


}

import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Persona } from 'src/app/interfaces/persona';
import { AgregarEditarPersonaComponent } from '../agregar-editar-persona/agregar-editar-persona.component';
import { PersonaService } from 'src/app/services/persona.service';
import { ProgressBarMode } from '@angular/material/progress-bar';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Action } from 'rxjs/internal/scheduler/Action';

// const listPersonas: Persona[] = [
//   {nombre: "Maria", apellido: "Loya", correo: "loyadiasMaria@hotmail.com", tipoDocumento: 'CNH', documento: 3333333, fechaNacimento: new Date() },
//   {nombre: "Fagner", apellido: "Melles", correo: "fafafagner@hotmail.com", tipoDocumento: 'CNH', documento: 1414141, fechaNacimento: new Date() },
//   {nombre: "Jorge", apellido: "Paulo", correo: "jorge@hotmail.com", tipoDocumento: 'CNH', documento: 1414141, fechaNacimento: new Date() },
//   {nombre: "Iago", apellido: "Ottilis", correo: "claudia@hotmail.com", tipoDocumento: 'CNH', documento: 1414141, fechaNacimento: new Date() },
//   {nombre: "Grazi", apellido: "Carneiro", correo: "grazi@hotmail.com", tipoDocumento: 'CNH', documento: 1414141, fechaNacimento: new Date() },
//   {nombre: "Lucas", apellido: "Frota", correo: "frotadiaslucas@hotmail.com", tipoDocumento: 'CNH', documento: 21212121, fechaNacimento: new Date() },
//   {nombre: "Grazi", apellido: "Carneiro", correo: "grazi@hotmail.com", tipoDocumento: 'CNH', documento: 1414141, fechaNacimento: new Date() }
// ];

@Component({
  selector: 'app-list-personas',
  templateUrl: './list-personas.component.html',
  styleUrls: ['./list-personas.component.css']
})
export class ListPersonasComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['nombre', 'apellido', 'correo', 'tipoDocumento', 'documento', 'fechaNacimento', 'acoes'];
  dataSource: MatTableDataSource<Persona>;
  newmode: ProgressBarMode = 'indeterminate'
  loading: boolean = true;


  //ache o componente MatPaginator e atribua ele a myCustomPaginator
  @ViewChild(MatPaginator) myCustomPaginator!: MatPaginator;
  @ViewChild(MatSort) myCustomSort!: MatSort;

  // importante
 // MatDialog eh uma classe que possui conjunto de metodos 
 //MatDialogModule eh um conjunto de components and css style. Ex de componente: mat-dialog-actions
  constructor(public dialog: MatDialog, private _personaService: PersonaService, private _snackBar: MatSnackBar){
    this.dataSource = new MatTableDataSource()
  
  }
  obtenerPersonas(){
      this.loading = true;
      setTimeout(()=>{
        this._personaService.getPersona().subscribe(data =>{
        this.loading = false
        this.dataSource.data = data;
        this.dataSource.paginator = this.myCustomPaginator;
        this.dataSource.sort = this.myCustomSort;
          });
      }, 2000);
  }

  applyFilter(event: Event){
    const filteredValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filteredValue.trim().toLowerCase();

    if(this.dataSource.paginator){
      this.dataSource.paginator.firstPage()
    }
  }

  //TEMTAR FAZER ESSE PREENCHIMENTO NO ARQUIVO Ts de AGREGAR EDITAR!!
  addEditPersona() {
    const dialogRef = this.dialog.open(AgregarEditarPersonaComponent, {width: "550px", disableClose: true})
    dialogRef.afterClosed().subscribe(result => { console.log('The dialog was closed')})
  }

  deletePerson(id: number){
    this.loading = true;
    this._personaService.deletePersona(id).subscribe(()=>{
      this.obtenerPersonas();
      this.msgSucess();
    })
  }
  msgSucess(){
    this._snackBar.open('Persona eliminada com sucesso', '', {duration:2000})
  }
  ngAfterViewInit(): void {
    //1 entender melhor esse paginator. Pq tiranto ele mesmo assim ele aparece ?
    this.dataSource.paginator = this.myCustomPaginator; 
    this.dataSource.sort = this.myCustomSort;
    //this.dataSource.paginator._intl.itemsPerPageLabel = "items per pagina";
  }
  ngOnInit(): void {
    // 2 Paginator aqui tb mesmo tirando ele de obtenerPersona, aparece aqui
    this.obtenerPersonas();
  }


}

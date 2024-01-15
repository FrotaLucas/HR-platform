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
        this._personaService.getPersonas().subscribe(data =>{
        this.loading = false
        this.dataSource.data = data;
        this.dataSource.paginator = this.myCustomPaginator;
        this.dataSource.sort = this.myCustomSort;
        console.log("print obtenerPersona")
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
  addEditPersona(id? : number) {
    const dialogRef = this.dialog.open(AgregarEditarPersonaComponent, {width: "550px", disableClose: true, 
    data: { id: id }});
    //com o retorno de dialogRed, podemos rezecutar obtenerPersonas ;)
    dialogRef.afterClosed().subscribe(result => { 
      if(result && result.submitted){
        this.obtenerPersonas();//executa depois de fechar
        console.log('The dialog was closed')
      }
    });//SO FUNCIONA COM BOTAO CANCELAR
      
  }
  //funciona o bar loading e settimeout
  //como esse Id esta sendo lido se ele nao esta na tabela ????????
  deletePerson(id: number){
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

import {
  AfterViewInit,
  Component,
  OnInit,
  ViewChild,
  ChangeDetectorRef,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Persona } from 'src/app/interfaces/persona';
import { AgregarEditarPersonaComponent } from '../agregar-editar-persona/agregar-editar-persona.component';
import { PersonaService } from 'src/app/services/persona.service';
import { PersonaManagement } from 'src/app/services/persona.management';
import { ProgressBarMode } from '@angular/material/progress-bar';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Action } from 'rxjs/internal/scheduler/Action';
import { listDePersonas } from 'src/app/shared/list-personas';
import { columnaDePersonas } from 'src/app/shared/columna-personas';

@Component({
  selector: 'app-list-personas',
  templateUrl: './list-personas.component.html',
  styleUrls: ['./list-personas.component.css'],
})
export class ListPersonasComponent implements OnInit, AfterViewInit, OnChanges {
  displayedColumns = columnaDePersonas;
  //dataSource: MatTableDataSource<Persona>;
  newmode: ProgressBarMode = 'indeterminate';
  loading: boolean = true;
  dataSource: MatTableDataSource<Persona>;
  //personaManagement: PersonaManagement;

  @ViewChild(MatPaginator) myCustomPaginator!: MatPaginator;
  @ViewChild(MatSort) myCustomSort!: MatSort;

  constructor(
    public dialog: MatDialog,
    private _personaService: PersonaService,
    private _snackBar: MatSnackBar, // private cdr: ChangeDetectorRef
    private cdr: ChangeDetectorRef,
    private personaManagement: PersonaManagement
  ) {
    //this.personaManagement = new PersonaManagement();
    this.dataSource = new MatTableDataSource(
      this.personaManagement.getListPersona()
    );

    //this.dataSource = new MatTableDataSource(listDePersonas);
  }
  obtenerPersonas() {
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
      this.dataSource.data = [...this.personaManagement.getListPersona()];
      this.dataSource.paginator = this.myCustomPaginator;
      this.dataSource.sort = this.myCustomSort;
      console.log('print obtenerPersona');
    }, 2000);
  }
  applyFilter(event: Event) {
    const filteredValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filteredValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  //TEMTAR FAZER ESSE PREENCHIMENTO NO ARQUIVO Ts de AGREGAR EDITAR!!
  addEditPersona(id?: number) {
    const dialogRef = this.dialog.open(AgregarEditarPersonaComponent, {
      width: '550px',
      disableClose: true,
      //data: { id: id, list: this.personaManagement.getListPersona() },
      data: { id: id },
    });
    //com o retorno de dialogRed, podemos rezecutar obtenerPersonas ;)
    dialogRef.afterClosed().subscribe((result) => {
      if (result && result.submitted) {
        console.log(this.personaManagement.getListPersona());
        this.obtenerPersonas(); //executa depois de fechar
        console.log('The dialog was closed');
      }
    }); //SO FUNCIONA COM BOTAO CANCELAR
  }
  //funciona o bar loading e settimeout
  //como esse Id esta sendo lido se ele nao esta na tabela ????????
  deletePerson(id: number) {
    console.log(id + 'click deleteee');
    this.personaManagement.deletePersona(id);
    this.obtenerPersonas();
    this.msgSucess();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ('personaManagement' in changes) {
      this.dataSource.data = [...this.personaManagement.getListPersona()];
    }
  }
  msgSucess() {
    this._snackBar.open('Persona eliminada com sucesso', '', {
      duration: 2000,
    });
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

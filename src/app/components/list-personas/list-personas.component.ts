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

const listPersonas: Persona[] = [
  {
    id: 0,
    nombre: 'Maria',
    apellido: 'Loya',
    correo: 'loyadiasMaria@hotmail.com',
    tipoDocumento: 'CNH',
    documento: 3333333,
    fechaNacimento: new Date(),
  },
  {
    id: 1,
    nombre: 'Fagner',
    apellido: 'Melles',
    correo: 'fafafagner@hotmail.com',
    tipoDocumento: 'CNH',
    documento: 1414141,
    fechaNacimento: new Date(),
  },
  {
    id: 2,
    nombre: 'Jorge',
    apellido: 'Paulo',
    correo: 'jorge@hotmail.com',
    tipoDocumento: 'CNH',
    documento: 1414141,
    fechaNacimento: new Date(),
  },
  {
    id: 3,
    nombre: 'Iago',
    apellido: 'Ottilis',
    correo: 'claudia@hotmail.com',
    tipoDocumento: 'CNH',
    documento: 1414141,
    fechaNacimento: new Date(),
  },
  {
    id: 4,
    nombre: 'Grazi',
    apellido: 'Carneiro',
    correo: 'grazi@hotmail.com',
    tipoDocumento: 'CNH',
    documento: 1414141,
    fechaNacimento: new Date(),
  },
  {
    id: 5,
    nombre: 'Lucas',
    apellido: 'Frota',
    correo: 'frotadiaslucas@hotmail.com',
    tipoDocumento: 'CNH',
    documento: 21212121,
    fechaNacimento: new Date(),
  },
  {
    id: 6,
    nombre: 'Grazi',
    apellido: 'Carneiro',
    correo: 'grazi@hotmail.com',
    tipoDocumento: 'CNH',
    documento: 1414141,
    fechaNacimento: new Date(),
  },
];

@Component({
  selector: 'app-list-personas',
  templateUrl: './list-personas.component.html',
  styleUrls: ['./list-personas.component.css'],
})
export class ListPersonasComponent implements OnInit, AfterViewInit, OnChanges {
  displayedColumns: string[] = [
    'nombre',
    'apellido',
    'correo',
    'tipoDocumento',
    'documento',
    'fechaNacimento',
    'acoes',
  ];
  //dataSource: MatTableDataSource<Persona>;
  newmode: ProgressBarMode = 'indeterminate';
  loading: boolean = true;
  dataSource: MatTableDataSource<Persona>;
  personaManagement: PersonaManagement;

  @ViewChild(MatPaginator) myCustomPaginator!: MatPaginator;
  @ViewChild(MatSort) myCustomSort!: MatSort;

  constructor(
    public dialog: MatDialog,
    private _personaService: PersonaService,
    private _snackBar: MatSnackBar, // private cdr: ChangeDetectorRef
    private cdr: ChangeDetectorRef
  ) {
    this.personaManagement = new PersonaManagement(listPersonas);
    this.dataSource = new MatTableDataSource(
      this.personaManagement.getListPersona()
    );

    //this.dataSource = new MatTableDataSource(listPersonas);
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
      data: { id: id, list: this.personaManagement.getListPersona() },
    });
    //com o retorno de dialogRed, podemos rezecutar obtenerPersonas ;)
    dialogRef.afterClosed().subscribe((result) => {
      if (result && result.submitted) {
        this.obtenerPersonas(); //executa depois de fechar
        console.log('The dialog was closed');
      }
    }); //SO FUNCIONA COM BOTAO CANCELAR
  }
  //funciona o bar loading e settimeout
  //como esse Id esta sendo lido se ele nao esta na tabela ????????
  deletePerson(id: number) {
    console.log('click deleteee');
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

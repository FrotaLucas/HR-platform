import { OnInit, Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Persona } from 'src/app/interfaces/persona';
import { PersonaService } from 'src/app/services/persona.service';
import { PersonaManagement } from 'src/app/services/persona.management';

@Component({
  selector: 'app-agregar-editar-persona',
  templateUrl: './agregar-editar-persona.component.html',
  styleUrls: ['./agregar-editar-persona.component.css'],
})
export class AgregarEditarPersonaComponent implements OnInit {
  tipoDocumento: string[] = ['DNI', 'Libreta Civica', 'Pasporte'];
  myform: FormGroup;
  maxDate: Date;
  loading: boolean = false;
  operation: string = 'Agregar ';
  id: number | undefined;
  //listPersonas: Persona[];
  //personaManagement: PersonaManagement;

  constructor(
    public dialogRef: MatDialogRef<AgregarEditarPersonaComponent>,
    private fb: FormBuilder,
    private _personService: PersonaService,
    private personaManagement: PersonaManagement,
    private _snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) private data: any
  ) {
    this.maxDate = new Date();
    this.myform = this.fb.group({
      nombre: ['', [Validators.required, Validators.maxLength(20)]],
      apellido: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      tipoDocumento: [null, Validators.required],
      documento: [null, [Validators.required, Validators.pattern('^[0-9]*$')]],
      fechaNacimento: [null, Validators.required],
    });
    this.id = data.id;
    //this.listPersonas = data.list;
    //this.personaManagement = new PersonaManagement(data.list);
    //this.personaManagement = new PersonaManagement();
  }
  ngOnInit(): void {
    this.esEditar(this.id);
  }

  //undefined : novo usuario, number : usuario existente
  esEditar(id: number | undefined) {
    //so para o caso de usuario existente
    if (id !== undefined) {
      this.operation = 'Editar';
      this.getPersona(id);
    }
  }

  getPersona(id: number) {
    console.log('function getPersona : ');
    //console.log(this.listPersonas);
    const persona = this.personaManagement.getPersona(id);
    if (persona !== undefined) {
      this.myform.setValue({
        nombre: persona.nombre,
        apellido: persona.apellido,
        correo: persona.correo,
        tipoDocumento: persona.tipoDocumento,
        documento: persona.documento,
        //lê o que ta escrito no formulario e ja converte para formato que o DB aceita
        fechaNacimento: new Date(persona.fechaNacimento),
      });
    }
  }
  methodCancell() {
    const dialogRef = this.dialogRef.close(); //pq precisa de uma const para receber this.dialogRef.close() ?
  }

  msgSucess(typeOperation: string) {
    this._snackBar.open(`Persona ${typeOperation} com sucesso`, '', {
      duration: 2000,
    });
  }
  //sendo chamado no html
  addEditPersona() {
    //return nothing in case there is any invalid information
    if (this.myform.invalid) {
      return;
    }

    const persona: Persona = {
      nombre: this.myform.value.nombre,
      apellido: this.myform.value.apellido,
      correo: this.myform.value.correo,
      tipoDocumento: this.myform.value.tipoDocumento,
      documento: this.myform.value.documento,
      fechaNacimento: this.myform.value.fechaNacimento
        .toISOString()
        .slice(0, 10),
    };
    //console.log(this.myform)
    //console.log(persona.fechaNacimento);
    if (this.id !== undefined) {
      // this._personService.updatePersona(this.id, persona).subscribe((data) => {
      //   this.loading = true;
      //   //console.log(this.myform.value.fechaNacimento)
      //   setTimeout(() => {
      //     (this.loading = false), this.dialogRef.close({ submitted: true });
      //   }, 2000);
      // });

      this.personaManagement.updatePersona(this.id, persona);
      this.loading = true;
      console.log(this.personaManagement.getListPersona());
      setTimeout(() => {
        this.loading = true;
        this.dialogRef.close({ submitted: true });
      }, 500);
      this.msgSucess('actualizada');
    } else {
      // this._personService.addPersona(persona).subscribe(() => {
      //   this.loading = true;
      //   setTimeout(() => {
      //     this.loading = false;
      //     this.dialogRef.close({ submitted: true }); //vai ser enviado para list-persona-componente
      //   }, 2000);
      // });
      console.log('function addEditPersona: ');
      console.log(persona);
      this.personaManagement.addPersona(persona);
      console.log(this.personaManagement.getListPersona());
      this.msgSucess('agregada');
      setTimeout(() => {
        this.loading = false;
        this.dialogRef.close({ submitted: true });
        console.log(this.myform.value.fechaNacimento);
      }, 10);
    }
  }
}

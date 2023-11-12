import { OnInit, Component} from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Persona } from 'src/app/interfaces/persona';

@Component({
  selector: 'app-agregar-editar-persona',
  templateUrl: './agregar-editar-persona.component.html',
  styleUrls: ['./agregar-editar-persona.component.css']
})
export class AgregarEditarPersonaComponent implements OnInit {
tipoDocumento: string[] = [ "DNI", "Libreta Civica","Pasporte"];
myform: FormGroup;
maxDate: Date;

  constructor( public dialogRef: MatDialogRef<AgregarEditarPersonaComponent>, private fb: FormBuilder){
    this.maxDate = new Date();
    this.myform = this.fb.group({
      nombre:['', [Validators.required, Validators.maxLength(20)]],
      apellido: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      tipoDocumento: [null, Validators.required],
      documento: [null, [Validators.required, Validators.pattern("^[0-9]*$")]],
      fechaNacimento: [null, Validators.required]
    });
  }
  ngOnInit(): void {
  }
  methodCancell(){
    const dialogRef = this.dialogRef.close()
  }
  addEditPersona(){
    //return nothing in case there is any invalid information
    if( this.myform.invalid){
      return;
    }

    const persona: Persona = {
      nombre: this.myform.value.nombre,
      apellido: this.myform.value.apellido,
      correo: this.myform.value.coreo,
      tipoDocumento: this.myform.value.tipoDocumento,
      documento: this.myform.value.documento,
      fechaNacimento: this.myform.value.fechaNacimento,
    }    
    console.log(this.myform)
    console.log(persona);

  }
}

import { OnInit, Component} from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Persona } from 'src/app/interfaces/persona';
import { PersonaService } from 'src/app/services/persona.service';
@Component({
  selector: 'app-agregar-editar-persona',
  templateUrl: './agregar-editar-persona.component.html',
  styleUrls: ['./agregar-editar-persona.component.css']
})
export class AgregarEditarPersonaComponent implements OnInit {
tipoDocumento: string[] = [ "DNI", "Libreta Civica","Pasporte"];
myform: FormGroup;
maxDate: Date;
loading: boolean = false;

constructor( public dialogRef: MatDialogRef<AgregarEditarPersonaComponent>, private fb: FormBuilder, private _personService: PersonaService){
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
    const dialogRef = this.dialogRef.close()  //pq precisa de uma const para receber this.dialogRef.close() ?
  }
  addEditPersona(){
    //return nothing in case there is any invalid information
    if( this.myform.invalid){
      return;
    }

    const persona: Persona = {
      nombre: this.myform.value.nombre,
      apellido: this.myform.value.apellido,
      correo: this.myform.value.correo,
      tipoDocumento: this.myform.value.tipoDocumento,
      documento: this.myform.value.documento,
      fechaNacimento: this.myform.value.fechaNacimento.toISOString().slice(0,10)
    }    
    console.log(this.myform)
    //console.log(persona.fechaNacimento);
    this._personService.addPersona(persona).subscribe(
      ()=>{
        this.loading = true;
        setTimeout(()=>{
          this.loading = false;
          console.log("Set Timeout agregar persona");
          this.dialogRef.close({submitted:true});//vai ser enviado para list-persona-componente
        }, 2000)
      }
      );
    
    }
}

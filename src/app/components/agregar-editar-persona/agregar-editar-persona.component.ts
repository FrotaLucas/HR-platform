import { OnInit} from '@angular/core'
import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-agregar-editar-persona',
  templateUrl: './agregar-editar-persona.component.html',
  styleUrls: ['./agregar-editar-persona.component.css']
})
export class AgregarEditarPersonaComponent implements OnInit {

  constructor( public dialogRef: MatDialogRef<AgregarEditarPersonaComponent>){
  }
  ngOnInit(): void {
  }
  methodCancell(){
    const dialogRef = this.dialogRef.close()

  }

}

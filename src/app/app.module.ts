import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

//components
import { AppComponent } from './app.component';
import { ListPersonasComponent } from './components/list-personas/list-personas.component';
import { AgregarEditarPersonaComponent } from './components/agregar-editar-persona/agregar-editar-persona.component';

//Angula Material
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSliderModule} from '@angular/material/slider';
import {MatCardModule} from '@angular/material/card';
import {MatTableModule} from  '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';

@NgModule({
  declarations: [
    AppComponent,
    ListPersonasComponent,
    AgregarEditarPersonaComponent,
  ],
  imports: [
    BrowserModule,
    NoopAnimationsModule,
    MatToolbarModule,
    MatSliderModule,
    MatCardModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

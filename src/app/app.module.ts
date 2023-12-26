import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MAT_DATE_LOCALE } from '@angular/material/core';

//components
import { AppComponent } from './app.component';
import { ListPersonasComponent } from './components/list-personas/list-personas.component';
import { AgregarEditarPersonaComponent } from './components/agregar-editar-persona/agregar-editar-persona.component';

// imports angular material 
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
    ListPersonasComponent,
    AgregarEditarPersonaComponent,
  ],
  imports: [
    BrowserModule,
    NoopAnimationsModule,
    SharedModule
  ],
  providers: [{
    provide: MAT_DATE_LOCALE, useValue: 'pt'
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }

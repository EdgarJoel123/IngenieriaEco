import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { LoginComponent } from './components/login/login.component';
import { VistaAdminComponent } from './components/vista-admin/vista-admin.component';
import { VistaAsesorComponent } from './components/vista-asesor/vista-asesor.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from '@angular/forms';




@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    LoginComponent,
    VistaAdminComponent,
    VistaAsesorComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule
 
   
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

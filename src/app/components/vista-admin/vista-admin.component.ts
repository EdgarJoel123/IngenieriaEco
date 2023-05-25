import { Component, OnInit } from '@angular/core';
import { Entidad } from '../models/entidadFinanciera';
import { ServicioService } from 'src/app/servicio.service';

declare var window:any;
@Component({
  selector: 'app-vista-admin',
  templateUrl: './vista-admin.component.html',
  styleUrls: ['./vista-admin.component.css']
})
export class VistaAdminComponent implements OnInit {


  entidades: Entidad[];

  formModal:any;
  formModalNuevo:any;
  constructor(private service: ServicioService){}
  ngOnInit(): void {
    this.formModal = new window.bootstrap.Modal(
      document.getElementById('myModal')
    );
    this.formModalNuevo= new window.bootstrap.Modal(
      document.getElementById('modalNuevo')
    );
    this.service.getEntidades()
    .subscribe(data =>{
      this.entidades= data;
    })

  }
  
  openFormModal() {
    this.formModal.show();
  }
  saveSomeThing() {
    // confirm or save something
    this.formModal.hide();
  }

  openModalNuevo(){
    this.formModalNuevo.show();
    this.formModal.hide();
  }

  closeNuevo(){
    this.formModalNuevo.hide();
    this.formModal.show();
  }
}

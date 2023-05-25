import { Component, OnInit } from '@angular/core';

declare var window:any;
@Component({
  selector: 'app-vista-admin',
  templateUrl: './vista-admin.component.html',
  styleUrls: ['./vista-admin.component.css']
})
export class VistaAdminComponent implements OnInit {

  formModal:any;
  formModalNuevo:any;
  constructor(){}
  ngOnInit(): void {
    this.formModal = new window.bootstrap.Modal(
      document.getElementById('myModal')
    );
    this.formModalNuevo= new window.bootstrap.Modal(
      document.getElementById('modalNuevo')
    );
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

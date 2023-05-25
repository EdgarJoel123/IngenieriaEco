import { Component, OnInit } from '@angular/core';

declare var window:any;
@Component({
  selector: 'app-vista-asesor',
  templateUrl: './vista-asesor.component.html',
  styleUrls: ['./vista-asesor.component.css']
})
export class VistaAsesorComponent implements OnInit{
   
  formModal:any;
  constructor(){}
  ngOnInit(): void {
    this.formModal = new window.bootstrap.Modal(
      document.getElementById('myModal')
    );
  }
  
  openFormModal() {
    this.formModal.show();
  }
  saveSomeThing() {
    // confirm or save something
    this.formModal.hide();
  }

}


import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  entidadFinancieraData: any[];
  selectedEntidadFinanciera: any;
  selectedValue: string = '';
  selectedData: any;

  opcionesPrestamo: any = {
    CONSUMO: "CONSUMO",
    MICROCREDITO: "MICROCREDITO",
    VIVIENDA: "VIVIENDA",
    ESTUDIANTIL: "ESTUDIANTIL"
  };

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.obtenerEntidadFinanciera();
    this.selectedEntidadFinanciera = this.entidadFinancieraData[0];
    this.selectedValue = this.selectedEntidadFinanciera.id;
    this.selectedData = this.getSelectedEntidadFinancieraData();
  }
  
  getKeys(obj: any): string[] {
    return Object.keys(obj);
  }
  
  obtenerEntidadFinanciera() {
    this.http.get<any[]>('http://localhost:3000/entidadFinanciera').subscribe(data => {
      this.entidadFinancieraData = data;
    });
  }

  // Actualizar la función onSelectEntidadFinanciera
onSelectEntidadFinanciera(event: any) {
  const id = event.target.value;
  this.selectedEntidadFinanciera = this.entidadFinancieraData.find(entidad => entidad.id === id);
  this.selectedValue = this.opcionesPrestamo.CONSUMO; // Establecer el valor predeterminado del segundo select
}

  getSelectedEntidadFinancieraData(): any[] {
    if (this.selectedEntidadFinanciera) {
      return Object.entries(this.selectedEntidadFinanciera)
        .filter(([key, value]) => key !== 'id' && key !== 'TIPO' && key !== 'NOMBRE')
        .map(([key, value]) => ({ key: key, value: value }));
    }
    return [];
  }
  
  
  
}

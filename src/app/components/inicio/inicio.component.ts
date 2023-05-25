import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  tiposPrestamo: any[];
  selectedEntidad: any;
  entidadesFinancieras: any[];
  selectedTipo: string = '';
  entidadSeleccionada: any;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.cargarEntidadesFinancieras();
  }

  cargarEntidadesFinancieras() {
    this.http.get<any[]>('http://localhost:3000/entidadFinanciera').subscribe(data => {
      this.entidadesFinancieras = data;
    });
  }

  cargarTiposPrestamo() {
    if (this.selectedEntidad) {
      this.entidadSeleccionada = this.entidadesFinancieras.find(entidad => entidad.id === this.selectedEntidad);
      this.tiposPrestamo = Object.entries(this.entidadSeleccionada)
        .filter(([key, value]) => key.startsWith('T'))
        .map(([key, value]) => ({ tipo: key.slice(1), valor: value }));
    } else {
      this.tiposPrestamo = [];
      this.entidadSeleccionada = null;
    }
  }

  obtenerPorcentaje(selectedTipo: string): string {
    if (this.entidadSeleccionada) {
      return this.entidadSeleccionada[selectedTipo];
    }
    return '';
  }
}

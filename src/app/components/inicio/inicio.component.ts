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
 // selectedPorcentaje: number;

  selectedPorcentaje: number
  anios: number;
  monto: number;
  amortizacion: any[] = [];


  data = {
    key: '',
    value: ''
  };
  
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

  updateSelectedPorcentaje(value: number) {
    this.selectedPorcentaje = value;
  }


  seleccionarPorcentaje(porcentaje: number) {
    this.selectedPorcentaje = porcentaje; // Almacena el porcentaje seleccionado
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


  /*calcular() {
    this.amortizacion = [];
    //const selectedValueNumber = parseFloat(this.selectedValue.replace(',', '.'));
    this.calcularAmortizacion(this.selectedPorcentaje, this.anios, this.monto);
    //console.log(this.selectedValue)
  }*/

  calcular() {
  this.amortizacion = [];
  const valueMatch = this.selectedValue.match(/:\s*([\d.]+)/);
  if (valueMatch) {
    const selectedValueNumber = parseFloat(valueMatch[1]);
    if (!isNaN(selectedValueNumber)) {
      this.calcularAmortizacion(selectedValueNumber, this.anios, this.monto);
    } else {
      console.error("El valor numérico no es válido.");
    }
  } else {
    console.error("El formato no coincide (no se encontró el valor numérico).");
  }
}

  
  
  
  calcularAmortizacion(porcentaje: number, años: number, monto: number) {
    const meses = años * 12;
    const tasaMensual = porcentaje / 12 / 100;
    const cuota = (monto * tasaMensual) / (1 - Math.pow(1 + tasaMensual, -meses));

    let saldo = monto;

    for (let mes = 1; mes <= meses; mes++) {
      const interes = saldo * tasaMensual;
      const capital = cuota - interes;
      saldo -= capital;

      const fila = {
        mes: mes,
        cuota: cuota.toFixed(2),
        interes: interes.toFixed(2),
        capital: capital.toFixed(2),
        saldo: saldo.toFixed(2)
      };

      this.amortizacion.push(fila);
    }
  }
  
}

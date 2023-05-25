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
  //selectedValue: string = '';
  selectedData: any;
  // selectedPorcentaje: number;

  selectedPorcentaje: number
  anios: number;
  monto: number;
  amortizacion: any[] = [];
 // valorPorcentaje: number = 1.5;

selectedValue: string;
selectedDataValue: number;

tipoAmortizacion: string;




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

  calcularFrancesa() {
    this.amortizacion = [];
    const selectedData = this.getSelectedEntidadFinancieraData().find(data => data.key === this.selectedValue);
    if (selectedData) {
      this.selectedDataValue = parseFloat(selectedData.value);
      this.calcularAmortizacionFrancesa(this.selectedDataValue, this.anios, this.monto);
      console.log(this.selectedDataValue);
    }
  }

  calcularAlemana() {
    this.amortizacion = [];
    const selectedData = this.getSelectedEntidadFinancieraData().find(data => data.key === this.selectedValue);
    if (selectedData) {
      this.selectedDataValue = parseFloat(selectedData.value);
      this.calcularAmortizacionAlemana(this.selectedDataValue, this.anios, this.monto);
      console.log(this.selectedDataValue);
    }
  }




  calcularAmortizacionFrancesa(porcentaje: number, años: number, monto: number) {
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

  calcularAmortizacionAlemana(porcentaje: number, años: number, monto: number) {
    const meses = años * 12;
    const tasaMensual = porcentaje / 12 / 100;
    const cuotaCapital = monto / meses;
  
    let saldo = monto;
    let interesTotal = 0;
  
    for (let mes = 1; mes <= meses; mes++) {
      const interes = saldo * tasaMensual;
      const cuota = cuotaCapital + interes;
      saldo -= cuotaCapital;
      interesTotal += interes;
  
      const fila = {
        mes: mes,
        cuota: cuota.toFixed(2),
        interes: interes.toFixed(2),
        capital: cuotaCapital.toFixed(2),
        saldo: saldo.toFixed(2),
        interesTotal: interesTotal.toFixed(2)
      };
  
      this.amortizacion.push(fila);
    }
  }
  

  seleccionarTipoAmortizacion() {
    if (this.tipoAmortizacion === '1') {
      this.calcularFrancesa();
    } else if (this.tipoAmortizacion === '2') {
      this.calcularAlemana();
    }
  }
  

}

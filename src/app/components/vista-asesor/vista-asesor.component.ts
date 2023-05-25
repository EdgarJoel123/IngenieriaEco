import { HttpClient } from '@angular/common/http';
import { Component, OnInit , Input} from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ServicioService } from 'src/app/servicio.service';

declare var window:any;
@Component({
  selector: 'app-vista-asesor',
  templateUrl: './vista-asesor.component.html',
  styleUrls: ['./vista-asesor.component.css']
})
export class VistaAsesorComponent implements OnInit{
    
  

  identificador:Observable<any>;

  formModal:any;
  opcionPrestamo: string  = '0';
  opcionAmortizacion: string  = '0';
  

  banco:any;
  tiposprestamo: any;
  interes:any;
  tiempo: any = "";
  tipoAmortizacion:any ="1";
  monto:any;
  amortizacion: any[] = [];
  
 
 


  constructor(private service: ServicioService, private router: Router, private http: HttpClient){
    this.identificador=service.getObservable;
  }
  
  ngOnInit(): void {
    this.obtenerBanco();
    this.service.getObservable.subscribe(
      identificador=>this.identificador=identificador);
   // alert(this.identificador);



    this.formModal = new window.bootstrap.Modal(
      document.getElementById('myModal')
    );
  }

  
  
  openFormModal() {
    this.formModal.show();
  }
  saveSomeThing() {
    // guarda datos
    this.formModal.hide();
  }

  obtenerBanco(){
    
    this.service.usuario(this.identificador).subscribe(
      users => {
        const user = users.find(u => u.id === this.identificador);
        this.banco=user.BANCO;
       // alert(this.banco)
  }
    )

    
  }

  capturarPrestamo() {
    // Pasamos el valor seleccionado a la variable verSeleccion
    this.tiposprestamo = this.opcionPrestamo;
   // alert(this.tiposprestamo);
}

capturarAmortizacion() {
  // Pasamos el valor seleccionado a la variable verSeleccion
  this.tipoAmortizacion = this.opcionAmortizacion;
  //alert(this.tipoAmortizacion);
}


  obtenerInteres(){
    this.capturarPrestamo();
    this.service.banco(this.banco).subscribe(
      bancos => {
        const banco = bancos.find(u => u.id === this.banco);


        //obtención del interes
        switch(this.tiposprestamo) { 
          case "1": { 
            this.interes=banco.CONSUMO;
            
             break; 
          } 
          case "2": { 
            this.interes=banco.MICROCREDITO;
             break; 
          } 
          case "3": { 
            this.interes=banco.VIVIENDA;
            break; 
         } 
         case "4": { 
          this.interes=banco.ESTUDIANTIL;
          break; 
       } 
          default: { 
             //statements; 
             break; 
          } 
        }
        
  })
  
  }


  llenarTabla() {
    this.obtenerInteres();
    this.capturarAmortizacion();
    
    this.amortizacion = [];
  
    this.interes= parseFloat(this.interes);
    if (!isNaN(this.interes)) {
      alert("El interes con el que se llevará a cabo el cálculo es: " + this.interes);
      switch(this.tipoAmortizacion) { 
        case "2": { 
         this.calcularAmortizacionFrancesa(this.interes, this.tiempo, this.monto);
          
           break; 
        } 
        case "1": { 
          this.calcularAmortizacionAlemana(this.interes, this.tiempo, this.monto);
           
            break; 
         } 
      }
    } else {
      console.error("El valor numérico no es válido.");
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
  

  
  


}


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
  amortizacion:any ="1";
  monto:any;
  
 
 


  constructor(private service: ServicioService, private router: Router, private http: HttpClient){
    this.identificador=service.getObservable;
  }
  
  ngOnInit(): void {
    this.service.getObservable.subscribe(
      identificador=>this.identificador=identificador);
    alert(this.identificador);

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
        alert(this.banco)
  }
    )

    
  }

  capturarPrestamo() {
    // Pasamos el valor seleccionado a la variable verSeleccion
    this.tiposprestamo = this.opcionPrestamo;
    alert(this.tiposprestamo);
}

capturarAmortizacion() {
  // Pasamos el valor seleccionado a la variable verSeleccion
  this.amortizacion = this.opcionAmortizacion;
  alert(this.amortizacion);
}


  obtenerInteres(){
    this.obtenerBanco();
    this.capturarPrestamo();
    this.service.banco(this.banco).subscribe(
      bancos => {
        const banco = bancos.find(u => u.id === this.banco);


        //obtención del interes
        switch(this.tiposprestamo) { 
          case "1": { 
            this.interes=banco.CONSUMO;
            alert(this.interes)
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

    alert(this.interes);

  }

}


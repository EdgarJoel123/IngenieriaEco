import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Service } from 'bonjour';
import { ServicioService } from 'src/app/servicio.service';
import { Usuario } from '../models/usuario';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  usuario: Usuario[];

  USUARIO: string;
  CONTRASENA: string;

  usuarios: Usuario = new Usuario();
  formData = {
    username: '',
    password: ''
  };

  constructor(private service: ServicioService, private router: Router, private http: HttpClient) { }
  
  validarUsuario() {
    const { username, password } = this.formData;

    this.service.login(username, password).subscribe(
      users => {
        const user = users.find(u => u.USUARIO === username && u.CONTRASENA === password);

        if (user) {
          if (user.ROL === 'ASESOR') {
            console.log('Inicio de sesión exitoso como Asesor');
            alert('Inicio de sesión exitoso como Asesor');
            this.router.navigate(['/vista-asesor']);
          } else if (user.ROL === 'ADMIN') {
            console.log('Inicio de sesión exitoso como Admin');
            alert('Inicio de sesión exitoso como Admin');
            this.router.navigate(['/vista-admin']);
          }
        } else {
          console.log('Usuario o contraseña incorrectos');
          alert('Usuario o contraseña incorrectos');
            // Limpiar campos de usuario y contraseña
            this.formData.username= '';
            this.formData.password = '';
        }
      },
      error => {
        console.error('Error en la autenticación', error);
        this.formData.username= '';
        this.formData.password = '';
      }
    );
  }
}
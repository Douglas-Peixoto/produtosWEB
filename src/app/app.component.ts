import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  isAuthenticated: boolean = false;

  loginUsuario: string | null = '';

  ngOnInit(): void {
    this.isAuthenticated = localStorage.getItem("access_token") !=null && localStorage.getItem("login_usuario")
    != null;

    if (this.isAuthenticated){
      this.loginUsuario = localStorage.getItem("login_usuario");
    }
  }

  logout() : void {
    if (window.confirm('Dejesa realmente sair do sistema ?')){
      localStorage.removeItem('access_token');
      localStorage.removeItem('login_usuario');

      window.location.href = '/';
    }
  }
}

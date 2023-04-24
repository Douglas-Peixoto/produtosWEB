import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl, Validators} from "@angular/forms";
import { HttpClient } from "@angular/common/http";
import { environment } from "../environments/environment";
import { AuthHelperService } from "../auth-helper.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  mensagem_sucesso: string = '';
  mensagem_erro: string = '';
  exibirPagina: boolean = false;

  constructor(
    private httpClient: HttpClient,
    private authHelper: AuthHelperService
  ) { }

  formLogin = new FormGroup({
    login: new FormControl('', [Validators.required]),
    senha: new FormControl('', [Validators.required])
  });


  get form(): any {
    return this.formLogin.controls;
  }

  ngOnInit(): void {
   if (this.authHelper.isAuthenticated()){
     window.location.href = "/consultar-produtos";
   }
    else{
      this.exibirPagina = true;
    }
  }

  onSubmit(): void{
    this.mensagem_erro = '';

    this.httpClient.post(environment.apiUrl + "/login", this.formLogin.value, { responseType: 'text' })
      .subscribe( data => {
        //salvar o TOKEN na LOCAL STORAGE
        localStorage.setItem('access_token', data);
        //limpar o formulário
        this.formLogin.reset();
        //redirecionamento
        window.location.href = "/consultar-produtos"; }, e => { this.mensagem_erro = e.error; console.log(e.error); } );

  }

}

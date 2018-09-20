import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { UserService } from '../services/user.service';
import { EventoService } from '../services/evento.service';
import { Evento } from '../models/evento';

@Component({
  selector: 'evento-add',
  templateUrl: '../views/evento-add.html',
  providers: [EventoService, UserService]
})

export class EventoAddComponent implements OnInit {
  public titulo: string;
  public evento: Evento;
  public identity;
  public alertMessage;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _eventoService: EventoService,
    private _userService: UserService,
  ) {
    this.titulo = 'Crear nuevo evento';
    this.evento = new Evento('', '', '');
    this.identity = this._userService.getIdentity();
  }

  ngOnInit() {
    console.log('evento-add.component.ts cargado');
  }

  onSubmit() {
    console.log(this.evento);
    this._eventoService.addEvento(this.evento).subscribe(
      response => {

        if (!response.evento) {
          this.alertMessage = 'Error en el servidor';
        } else {
          this.alertMessage = '¡El evento se ha creado correctamente!';
          this.evento = response.evento;
          this._router.navigate(['/editar-evento', response.evento._id]);
        }

      },
      error => {
        var errorMessage = <any>error;

        if (errorMessage != null) {
          var body = JSON.parse(error._body);
          this.alertMessage = body.message;

          console.log(error);
        }
      }
    );
  }

}

import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { GLOBAL } from '../services/global';
import { UserService } from '../services/user.service';
import { EventoService } from '../services/evento.service';
import { Evento } from '../models/evento';

@Component({
  selector: 'evento-list',
  templateUrl: '../views/evento-list.html',
  providers: [EventoService, UserService]
})

export class EventoListComponent implements OnInit {
  public titulo: string;
  public eventos: Evento[];
  public identity;
  public next_page;
  public prev_page;
  private url;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _eventoService: EventoService,
    private _userService: UserService,
  ) {
    this.titulo = 'Eventos';
    this.identity = this._userService.getIdentity();
    this.url = GLOBAL.url;



    this.next_page = 1;
    this.prev_page = 1;
  }

  ngOnInit() {
    console.log('evento-list.component.ts cargado');

    // Conseguir el listado de eventos
    this.getEventos();
  }

  getEventos() {
    this._route.params.forEach((params: Params) => {
      let page = +params['page'];
      if (!page) {
        page = 1;
      } else {
        this.next_page = page + 1;
        this.prev_page = page - 1;

        if (this.prev_page == 0) {
          this.prev_page = 1;
        }
      }

      this._eventoService.getEventos(page).subscribe(
        (response: any) => {
          if (!response.eventos) {
            this._router.navigate(['/']);
          } else {
            this.eventos = response.eventos;
          }
        },
        error => {
          var errorMessage = <any>error;
          console.log('eventos', errorMessage);

          if (errorMessage != null) {
            var body = JSON.parse(error._body);
            //this.alertMessage = body.message;

            console.log(error);
          }
        }
      );
    });
  }

  public confirmado;
  onDeleteConfirm(id) {
    this.confirmado = id;
  }

  onCancelEvento() {
    this.confirmado = null;
  }

  onDeleteEvento(id) {
    this._eventoService.deleteEvento(id).subscribe(
      response => {
        if (!response.evento) {
          alert('Error en el servidor');
        }
        this.getEventos();
      },
      error => {
        var errorMessage = <any>error;

        if (errorMessage != null) {
          var body = JSON.parse(error._body);
          //this.alertMessage = body.message;

          console.log(error);
        }
      }
    );
  }

}

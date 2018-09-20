import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { UserService } from '../services/user.service';
import { ApiService } from '../services/api.service';
import { EventoService } from '../services/evento.service';
import { Evento } from '../models/evento';

@Component({
  selector: 'evento-edit',
  templateUrl: '../views/evento-add.html',
  providers: [EventoService, UserService]
})

export class EventoEditComponent implements OnInit {
  public titulo: string;
  public evento: Evento;
  public identity;
  public alertMessage;
  public is_edit;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _eventoService: EventoService,
    private _http: ApiService,
    private _userService: UserService,
  ) {
    this.titulo = 'Editar evento';
    this.evento = new Evento('', '', '');
    this.identity = this._userService.getIdentity();
    this.is_edit = true;
  }

  ngOnInit() {
    console.log('evento-edit.component.ts cargado');

    // Llamar al metodo del api para sacar un evento en base a su id getEvento
    this.getEvento();
  }

  getEvento() {
    this._route.params.forEach((params: Params) => {
      let id = params['id'];

      this._eventoService.getEvento(id).subscribe(
        response => {
          if (!response.evento) {
            this._router.navigate(['/']);
          } else {
            this.evento = response.evento;
          }
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

    });
  }

  onSubmit() {
    console.log(this.evento);
    this._route.params.forEach((params: Params) => {
      let id = params['id'];

      this._eventoService.editEvento(id, this.evento).subscribe(
        response => {

          if (!response.evento) {
            this.alertMessage = 'Error en el servidor';
          } else {
            this.alertMessage = '¡El evento se ha actualizado correctamente!';
            if (!this.filesToUpload) {
              this._router.navigate(['/evento', response.evento._id]);
            } else {
              //Subir la imagen del evento
              this._http.makeFileRequest('upload-image-evento/' + id, [], this.filesToUpload, 'image')
                .then(
                  (result) => {
                    this._router.navigate(['/evento', response.evento._id]);
                  },
                  (error) => {
                    console.log(error);
                  }
                );
            }

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
    });
  }

  public filesToUpload: Array<File>;
  fileChangeEvent(fileInput: any) {
    this.filesToUpload = <Array<File>>fileInput.target.files;
  }

}

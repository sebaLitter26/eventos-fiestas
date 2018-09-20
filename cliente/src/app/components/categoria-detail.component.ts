import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { GLOBAL } from '../services/global';

import { UserService } from '../services/user.service';
import { CategoriaService } from '../services/categoria.service';
import { Categoria } from '../models/categoria';
import { ProductoService } from '../services/producto.service';
import { Producto } from '../models/producto';

@Component({
  selector: 'categoria-detail',
  templateUrl: '../views/categoria-detail.html',
  providers: [CategoriaService, ProductoService, UserService]
})

export class CategoriaDetailComponent implements OnInit {
  public categoria: Categoria;
  public productos: Producto[];
  public identity;
  public alertMessage;
  private url;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _categoriaService: CategoriaService,
    private _productoService: ProductoService,
    private _userService: UserService,
  ) {
    this.identity = this._userService.getIdentity();
    this.url = GLOBAL.url;
  }

  ngOnInit() {
    console.log('categoria-detail.component.ts cargado');

    // Sacar categoria de la bbdd
    this.getCategoria();
  }

  getCategoria() {

    this._route.params.forEach((params: Params) => {
      let id = params['id'];

      this._categoriaService.getCategoria(id).subscribe(
        response => {
          if (!response.categoria) {
            this._router.navigate(['/']);
          } else {
            this.categoria = response.categoria;


            // Sacar las canciones
            this._productoService.getProductos(response.categoria._id).subscribe(
              response => {
                if (!response.productos) {
                  this.alertMessage = 'Este categoria no tiene canciones';
                } else {
                  this.productos = response.productos;
                }
              },
              error => {
                var errorMessage = <any>error;

                if (errorMessage != null) {
                  var body = JSON.parse(error._body);
                  //this.alertMessage = body.message;

                  console.log(error);
                }
              });


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

  public confirmado;
  onDeleteConfirm(id) {
    this.confirmado = id;
  }

  onCancelProducto() {
    this.confirmado = null;
  }

  onDeleteProducto(id) {
    this._productoService.deleteProducto(id).subscribe(
      response => {
        if (!response.producto) {
          alert('Error ene el servidor');
        }

        this.getCategoria();
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

  startPlayer(producto) {
    let producto_player = JSON.stringify(producto);
    let file_path = this.url + 'get-producto-file/' + producto.file;
    let image_path = GLOBAL.url + 'get-image-categoria/' + producto.categoria.image;

    localStorage.setItem('sound_producto', producto_player);

    document.getElementById("mp3-source").setAttribute("src", file_path);
    (document.getElementById("player") as any).load();
    (document.getElementById("player") as any).play();

    document.getElementById('play-producto-title').innerHTML = producto.name;
    document.getElementById('play-producto-evento').innerHTML = producto.categoria.evento.name;
    document.getElementById('play-image-categoria').setAttribute('src', image_path);

  }
}

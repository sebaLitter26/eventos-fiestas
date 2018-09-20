import { Component, OnInit } from '@angular/core';
import { Producto } from '../models/producto';
import { GLOBAL } from '../services/global';

@Component({
  selector: 'player',
  template: `
	<div class="categoria-image">
		<span *ngIf="producto.categoria">
			<img id="play-image-categoria" src="{{ url + 'get-image-categoria/' + producto.categoria.image}}" />
		</span>

		<span *ngIf="!producto.categoria">
			<img id="play-image-categoria" src="assets/images/default.jpg" />
		</span>
	</div>

	<div class="audio-file">
		<p>Reproduciendo</p>
		<span id="play-producto-title">
			{{producto.name}}
		</span>
		|
		<span id="play-producto-evento">
			<span *ngIf="producto.categoria.evento">
				{{producto.categoria.evento.name}}
			</span>
		</span>
		<audio controls id="player">
			<source id="mp3-source" src="{{ url + 'get-producto-file/' + producto.file }}" type="audio/mpeg">
			Tu navegador no es compatible con HTML5
		</audio>
	</div>

	`
})

export class PlayerComponent implements OnInit {
  public url: string;
  public producto;

  constructor() {
    this.url = GLOBAL.url;
  }

  ngOnInit() {
    console.log('player cargado');

    var producto = JSON.parse(localStorage.getItem('sound_producto'));
    if (producto) {
      this.producto = producto;
    } else {
      this.producto = new Producto(1, "", "", "", "");
    }
  }
}

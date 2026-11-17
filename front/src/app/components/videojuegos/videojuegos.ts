import { Component, OnInit, inject } from '@angular/core';
import { VideojuegosService } from '../../services/videojuegos';

@Component({
    selector: 'app-videojuegos',
    imports: [],
    templateUrl: './videojuegos.html',
    styleUrl: './videojuegos.css'
})

export class Videojuegos implements OnInit {
  private videojuegosService = inject(VideojuegosService);

  videojuegos: any[] = [];
  cargando: boolean = true;
  error: string = "";

  ngOnInit() {
    this.videojuegosService
    .obtenerVideojuegos()
    .subscribe({
        next: (datos) => {
            this.videojuegos = datos;
            this.cargando = false;
        },
        error: (error) => {
            console.error( "Error al consultar videojuegos:", error );
            this.error = "No fue posible consultar los videojuegos";
            this.cargando = false;
        }
    });
  }
}
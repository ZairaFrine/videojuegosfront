import { Component, signal, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { VideojuegosService } from './services/videojuegos'; //servicio nuestro



@Component({
    selector: 'app-root',
    imports: [],
    templateUrl: './app.html',
    styleUrl: './app.css'
})
/* export class App {
  protected readonly title = signal('videojuegos-front');
}
 */
export class App
implements OnInit {
  private videojuegosService = inject(VideojuegosService); //aqui pasamos servicio en videojuegos.ts
  videojuegos: any[] = [];
  cargando: boolean = true;
  error: string = "";

  ngOnInit() {
    this.videojuegosService.obtenerVideojuegos() //metodo en videojuegos.ts
    .subscribe({
      next: (datos) => {
        this.videojuegos = datos;
        this.cargando = false;
      },
      error: (error) => {
        console.error( "Error al consultar videojuegos:", error
        );
        this.error = "No fue posible consultar los videojuegos";
        this.cargando = false;
      }
    });
  }
}
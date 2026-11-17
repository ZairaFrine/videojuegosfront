import { Component, OnInit, inject } from '@angular/core';
import { PlataformasService } from '../../services/plataformas';

@Component({
    selector: 'app-plataformas',
    imports: [],
    templateUrl: './plataformas.html',
    styleUrl: './plataformas.css'
})
export class Plataformas
implements OnInit {
  private plataformasService = inject(PlataformasService);

  plataformas: any[] = [];
  cargando: boolean = true;
  error: string = "";

  ngOnInit() {
    this.plataformasService
    .obtenerPlataformas()
    .subscribe({
        next: (datos) => {
          this.plataformas = datos;
          this.cargando = false;
        },
        error: (error) => {
          console.error( "Error al consultar plataformas:", error );
          this.error = "No fue posible consultar las plataformas";
          this.cargando = false;
        }
    });
  }
}
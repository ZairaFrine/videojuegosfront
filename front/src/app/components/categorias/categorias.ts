import { Component, OnInit, inject } from '@angular/core';
import { CategoriasService } from '../../services/categorias';

@Component({
    selector: 'app-categorias',
    imports: [],
    templateUrl: './categorias.html',
    styleUrl: './categorias.css'
})
export class Categorias
implements OnInit {
  private categoriasService = inject(CategoriasService);

  categorias: any[] = [];
  cargando: boolean = true;
  error: string = "";

  ngOnInit() {
    this.categoriasService
      .obtenerCategorias()
      .subscribe({
        next: (datos) => {
          this.categorias = datos;
          this.cargando = false;
        },
        error: (error) => {
          console.error("Error al consultar categorías:", error );
          this.error = "No fue posible consultar las categorías";
          this.cargando = false;
        }
      });
  }
}
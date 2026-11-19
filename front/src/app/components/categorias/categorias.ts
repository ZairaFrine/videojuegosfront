import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CategoriasService } from '../../services/categorias';


@Component({
    selector: 'app-categorias',
    imports: [ ReactiveFormsModule ],
    templateUrl: './categorias.html',
    styleUrl: './categorias.css'
})

export class Categorias implements OnInit {
  private categoriasService = inject(CategoriasService);
  categorias: any[] = [];
  cargando: boolean = true;
  error: string = "";
  mensaje: string = "";

  formularioCategoria = new FormGroup({
    nombre: new FormControl( '', [ Validators.required ] )
  });

  ngOnInit() { this.consultarCategorias(); }

  consultarCategorias() {
    this.categoriasService
    .obtenerCategorias()
    .subscribe({
      next: (datos) => {
        this.categorias = datos;
        this.cargando = false;
      },
      error: (error) => {
        console.error( error );
        this.error = "No fue posible consultar las categorías";
        this.cargando = false;
      }
    });
  }

  guardarCategoria() {
    if ( this.formularioCategoria.invalid ) {
      this.formularioCategoria.markAllAsTouched();
      return;
    }

    const nombre = this.formularioCategoria.value.nombre;
    if (!nombre) { return; }

    this.categoriasService
    .crearCategoria(nombre)
    .subscribe({
      next: (respuesta) => {
        console.log( respuesta );
        this.mensaje = "Categoría creada correctamente";
        this.formularioCategoria .reset();
        this.consultarCategorias();
      },
      error: (error) => {
        console.error( "Error al crear categoría:", error );
        this.error = "No fue posible crear la categoría";
      }
    });
  }
}
import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CategoriasService } from '../../services/categorias';

@Component({
    selector: 'app-categorias',
    imports: [
        ReactiveFormsModule
    ],
    templateUrl: './categorias.html',
    styleUrl: './categorias.css'
})

export class Categorias
    implements OnInit {
    private categoriasService = inject(CategoriasService);
    categorias: any[] = [];
    cargando: boolean = true;
    error: string = "";
    mensaje: string = "";
    idCategoriaEditar: number | null = null;

    formularioCategoria = new FormGroup({
        nombre:
        new FormControl(
            '',
            [
                Validators.required
            ]
        )
    });

    ngOnInit() { this.consultarCategorias(); }


    // CONSULTAR CATEGORÍAS
    consultarCategorias() {
        this.cargando = true;
        this.error = "";

        this.categoriasService
        .obtenerCategorias()
        .subscribe({
            next: (datos) => {
                this.categorias = datos;
                this.cargando = false;
            },
            error: (error) => {
                console.error( "Error al consultar categorías:", error );
                this.error = "No fue posible consultar las categorías";
                this.cargando = false;
            }
        });
    }

    // GUARDAR
    // Si idCategoriaEditar es null  POST
    // Si tiene un ID PUT

    guardarCategoria() {

        if ( this.formularioCategoria.invalid ) {
            this.formularioCategoria.markAllAsTouched();
            return;
        }

        const nombre = this.formularioCategoria.value.nombre;
        if (!nombre) {
            return;
        }

        this.error = "";
        this.mensaje = "";


        // CREAR CATEGORÍA
        if ( this.idCategoriaEditar === null ) {
            this.categoriasService
            .crearCategoria(nombre)
            .subscribe({
                next: (respuesta) => {
                    console.log( respuesta );
                    this.mensaje = "Categoría creada correctamente";
                    this.formularioCategoria.reset();
                    this.consultarCategorias();
                },
                error: (error) => {
                    console.error( "Error al crear categoría:", error );
                    this.error = "No fue posible crear la categoría";
                }
            });
            return;
        }

        // ACTUALIZAR CATEGORÍA
        this.categoriasService
        .actualizarCategoria( this.idCategoriaEditar, nombre )
        .subscribe({
            next: (respuesta) => {
                console.log( respuesta );
                this.mensaje = "Categoría actualizada correctamente";
                this.formularioCategoria .reset();
                this.idCategoriaEditar = null;
                this.consultarCategorias();
            },
            error: (error) => {
                console.error( "Error al actualizar categoría:", error );
                this.error = "No fue posible actualizar la categoría";
            }
        });
    }

    // SELECCIONAR CATEGORÍA PARA EDITAR
    editarCategoria( categoria: any ) {
        this.error = "";
        this.mensaje = "";
        this.idCategoriaEditar = categoria.idCat;

        this.formularioCategoria
        .controls
        .nombre
        .setValue(
            categoria.nmCat
        );
    }

    // DESACTIVAR CATEGORÍA
    desactivarCategoria( id: number ) {
        this.error = "";
        this.mensaje = "";

        this.categoriasService
        .desactivarCategoria(id)
        .subscribe({
            next: (respuesta) => {
                console.log( respuesta );
                this.mensaje = "Categoría desactivada correctamente";
                this.consultarCategorias();
            },
            error: (error) => {
                console.error( "Error al desactivar categoría:", error );
                this.error = "No fue posible desactivar la categoría";
            }

        });

    }

    // ACTIVAR CATEGORÍA
    activarCategoria( id: number ) {
        this.error = "";
        this.mensaje = "";

        this.categoriasService
        .activarCategoria(id)
        .subscribe({

            next: (respuesta) => {
                console.log( respuesta );
                this.mensaje = "Categoría activada correctamente";
                this.consultarCategorias();
            },

            error: (error) => {
                console.error( "Error al activar categoría:", error );
                this.error = "No fue posible activar la categoría";
            }

        });

    }

}
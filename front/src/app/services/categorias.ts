import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({ providedIn: 'root' })
export class CategoriasService {
    private http = inject(HttpClient);
    private apiUrl ='http://localhost:3000/api/categorias';

    // CONSULTAR TODAS LAS CATEGORÍAS
    obtenerCategorias() {
      return this.http.get<any[]>( this.apiUrl );
    }

    // CREAR CATEGORÍA
    crearCategoria( nombre: string ) {
      return this.http.post(
        this.apiUrl,
        {
          nombre: nombre
        }
      );
    }

    // ACTUALIZAR CATEGORÍA  en postman o insomina usamos...  PUT /api/categorias/:id
    actualizarCategoria(
      id: number,
      nombre: string
    ) {
      return this.http.put(
        `${this.apiUrl}/${id}`,
        {
          nombre: nombre
        }
      );
    }

    // BORRADO LÓGICO | DESACTIVAR CATEGORÍA  en postman o insomina usamos... DELETE /api/categorias/:id
    desactivarCategoria( id: number ) {
      return this.http.delete( `${this.apiUrl}/${id}` );
    }

    // DESBORRADO LÓGICO | ACTIVAR CATEGORÍA en postman o insomina usamos... PUT /api/categorias/activar/:id
    activarCategoria( id: number ) {
      return this.http.put(
          `${this.apiUrl}/activar/${id}`,
          {}
      );
    }

    // BUSCAR O FILTRAR CATEGORÍAS POR NOMBRE  en postman o insomina usamos... POST /api/categorias/buscar
    buscarCategoria( nombre: string ) {
      return this.http.post<any[]>(
        `${this.apiUrl}/buscar`,
        {
          nombre: nombre
        }
      );
    }

    // CONSULTAR UNA CATEGORÍA POR ID en postman o insomina usamos... GET /api/categorias/:id
    obtenerCategoriaPorId( id: number ) {
      return this.http.get<any>( `${this.apiUrl}/${id}` );
    }

}
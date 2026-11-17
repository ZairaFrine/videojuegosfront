import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class CategoriasService {

    private http = inject(HttpClient);
    private apiUrl = 'http://localhost:3000/api/categorias';

    obtenerCategorias() {
      return this.http.get<any[]>( this.apiUrl );
    }
}
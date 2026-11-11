import { Service } from '@angular/core';
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Service()
export class Videojuegos {}



@Injectable({ providedIn: 'root' })
export class VideojuegosService {

    private http = inject(HttpClient);
    private apiUrl = 'http://localhost:3000/api/videojuegos';

    obtenerVideojuegos() {
        return this.http.get<any[]>(
            this.apiUrl
        );
    }
}
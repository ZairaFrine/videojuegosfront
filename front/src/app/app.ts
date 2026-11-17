import { Component } from '@angular/core';
import { Videojuegos } from './components/videojuegos/videojuegos';
import { Categorias } from './components/categorias/categorias';
import { Plataformas } from './components/plataformas/plataformas';


@Component({
    selector: 'app-root',
    imports: [
        Videojuegos,
        Categorias,
        Plataformas
    ],
    templateUrl: './app.html',
    styleUrl: './app.css'
})
export class App { }
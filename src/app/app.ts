import { Component } from '@angular/core';
import { DbService } from './services/db.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  RouterOutlet,
  RouterLink,
  RouterLinkActive
} from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-root',
  imports: [
    CommonModule,
    FormsModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive
  ],
  template: `

  <section class="section">
    <div class="container">

      <!-- TÍTULO -->
      <h1 class="title">RPG Manager</h1>

      <!-- 🔥 IMPORT / EXPORT -->
      <div class="buttons mb-4">

        <button class="button is-link" (click)="db.exportJson()">
          Exportar JSON
        </button>

        <label class="button is-info">
          Importar JSON
          <input type="file" hidden (change)="onFile($event)">
        </label>

      </div>

      <!-- 🔥 TABS (NAVEGAÇÃO) -->
      <div class="tabs is-centered mb-6">
      <ul class="is-flex is-justify-content-center">
    
        <li routerLinkActive="is-active"
            [routerLinkActiveOptions]="{ exact: true }"
            class="mx-4">
          <a routerLink="/"
             class="tab-custom tab-player">
            Jogadores
          </a>
        </li>
    
        <li routerLinkActive="is-active" class="mx-4">
          <a routerLink="/enemies"
             class="tab-custom tab-enemy">
            Inimigos
          </a>
        </li>
    
        <li routerLinkActive="is-active" class="mx-4">
          <a routerLink="/turns"
             class="tab-custom tab-turn">
            Turnos
          </a>
        </li>
    
      </ul>
    </div>

      <!-- CONTEÚDO DAS PÁGINAS -->
      <router-outlet></router-outlet>

    </div>
  </section>

  `
})
export class AppComponent {

  constructor(public db: DbService) {}

  onFile(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.db.importJson(file);
    }
  }
}
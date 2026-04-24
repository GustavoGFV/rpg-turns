import { Component } from '@angular/core';
import { DbService } from '../../services/db.service';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  imports: [CommonModule],
  template: `

  <div class="mb-4">

    <label class="label">Ordenar por Iniciativa</label>

    <div class="buttons">
      <button class="button"
              [class.is-link]="order === 'desc'"
              (click)="setOrder('desc')">
        Maior → Menor
      </button>

      <button class="button"
              [class.is-link]="order === 'asc'"
              (click)="setOrder('asc')">
        Menor → Maior
      </button>
    </div>

  </div>

  <!-- LISTA -->
  <div *ngFor="let t of turnos" class="box">

  <div class="columns is-mobile is-vcentered">

    <!-- Nome -->
    <div class="column">
      <p class="has-text-weight-bold">{{t.nome}}</p>
      <p class="is-size-7 has-text-grey">{{t.tipo}}</p>
    </div>

    <!-- Iniciativa -->
    <div class="column has-text-centered">
      <p class="is-size-7 has-text-grey">Iniciativa</p>
      <p class="has-text-weight-semibold">{{t.iniciativa}}</p>
    </div>

    <!-- CA -->
    <div class="column has-text-centered">
      <p class="is-size-7 has-text-grey">CA</p>
      <p class="has-text-weight-semibold">{{t.ca}}</p>
    </div>

  </div>

  </div>

  `
})
export class TurnsComponent {

  order: 'asc' | 'desc' = 'desc';

  constructor(public db: DbService) {}

  setOrder(order: 'asc' | 'desc') {
    this.order = order;
  }

  get turnos() {
    const ativos = [
      ...this.db.db.players.map(p => ({ ...p, tipo: 'player' })),
      ...this.db.db.enemies
        .filter(e => e.ativo)
        .map(e => ({ ...e, tipo: 'enemy' }))
    ];

    return ativos.sort((a, b) => {
      return this.order === 'desc'
        ? b.iniciativa - a.iniciativa
        : a.iniciativa - b.iniciativa;
    });
  }
}
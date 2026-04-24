import { Component } from '@angular/core';
import { DbService } from '../../services/db.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `

  <!-- BOTÃO ADD -->
  <button class="button is-primary mb-3" (click)="openAdd()">
    Adicionar Jogador
  </button>

  <!-- FORM -->
  <form *ngIf="showForm" class="box" (ngSubmit)="save()">

    <h2 class="title is-5">
      {{ editIndex !== null ? 'Editar Jogador' : 'Novo Jogador' }}
    </h2>

    <!-- Nome -->
    <div class="field">
      <label class="label">Nome</label>
      <div class="control">
        <input class="input"
               [(ngModel)]="form.nome"
               name="nome"
               required>
      </div>
    </div>

    <!-- Iniciativa -->
    <div class="field">
      <label class="label">Iniciativa</label>
      <div class="control">
        <input class="input"
               type="number"
               [(ngModel)]="form.iniciativa"
               name="init">
      </div>
    </div>

    <!-- CA -->
    <div class="field">
      <label class="label">CA</label>
      <div class="control">
        <input class="input"
               type="number"
               [(ngModel)]="form.ca"
               name="ca">
      </div>
    </div>

    <!-- SAVES -->
    <div class="field">
      <label class="label">Testes de Resistência</label>

      <div class="columns is-multiline">

        <div class="column is-4">
          <label class="label is-size-7">Força</label>
          <input class="input" type="number" [(ngModel)]="form.saves.for" name="for">
        </div>

        <div class="column is-4">
          <label class="label is-size-7">Destreza</label>
          <input class="input" type="number" [(ngModel)]="form.saves.des" name="des">
        </div>

        <div class="column is-4">
          <label class="label is-size-7">Constituição</label>
          <input class="input" type="number" [(ngModel)]="form.saves.con" name="con">
        </div>

        <div class="column is-4">
          <label class="label is-size-7">Inteligência</label>
          <input class="input" type="number" [(ngModel)]="form.saves.int" name="int">
        </div>

        <div class="column is-4">
          <label class="label is-size-7">Sabedoria</label>
          <input class="input" type="number" [(ngModel)]="form.saves.sab" name="sab">
        </div>

        <div class="column is-4">
          <label class="label is-size-7">Carisma</label>
          <input class="input" type="number" [(ngModel)]="form.saves.car" name="car">
        </div>

      </div>
    </div>

    <!-- BOTÕES -->
    <div class="buttons">
      <button class="button is-success" type="submit">Salvar</button>
      <button class="button is-light" type="button" (click)="cancel()">Cancelar</button>
    </div>

  </form>

  <!-- LISTA -->
  <div *ngFor="let p of db.db.players; let i = index" class="box">

    <div class="columns is-mobile is-vcentered">

      <!-- Nome -->
      <div class="column">
        <p class="has-text-weight-bold">{{p.nome}}</p>
      </div>

      <!-- Iniciativa -->
      <div class="column has-text-centered">
        <p class="is-size-7 has-text-grey">Iniciativa</p>
        <p class="has-text-weight-semibold">{{p.iniciativa}}</p>
      </div>

      <!-- CA -->
      <div class="column has-text-centered">
        <p class="is-size-7 has-text-grey">CA</p>
        <p class="has-text-weight-semibold">{{p.ca}}</p>
      </div>

      <!-- BOTÃO DROPDOWN -->
      <div class="column is-narrow has-text-right">
        <button class="button is-small"
                (click)="toggleDetails(i)">
          {{ expandedIndex === i ? '▲' : '▼' }}
        </button>
      </div>

    </div>

    <!-- DROPDOWN (SAVES) -->
    <div *ngIf="expandedIndex === i" class="mt-3">
      <label class="label">Testes de Resistência</label>

      <div class="columns is-multiline">

        <div class="column is-4">
          <p><strong>FOR:</strong> {{p.saves.for}}</p>
        </div>

        <div class="column is-4">
          <p><strong>DES:</strong> {{p.saves.des}}</p>
        </div>

        <div class="column is-4">
          <p><strong>CON:</strong> {{p.saves.con}}</p>
        </div>

        <div class="column is-4">
          <p><strong>INT:</strong> {{p.saves.int}}</p>
        </div>

        <div class="column is-4">
          <p><strong>SAB:</strong> {{p.saves.sab}}</p>
        </div>

        <div class="column is-4">
          <p><strong>CAR:</strong> {{p.saves.car}}</p>
        </div>

      </div>

      <div class="buttons mt-3">
        <button class="button is-warning" (click)="openEdit(i)">Editar</button>
        <button class="button is-danger" (click)="delete(i)">Apagar</button>
      </div>

    </div>

  </div>

  `
})
export class PlayersComponent {

  showForm = false;
  editIndex: number | null = null;
  expandedIndex: number | null = null;

  form = {
    nome: '',
    iniciativa: 0,
    ca: 0,
    saves: {
      for: 0,
      des: 0,
      con: 0,
      int: 0,
      sab: 0,
      car: 0
    }
  };

  constructor(public db: DbService) {}

  // ➕ Adicionar
  openAdd() {
    this.showForm = true;
    this.editIndex = null;

    this.form = {
      nome: '',
      iniciativa: 0,
      ca: 0,
      saves: {
        for: 0,
        des: 0,
        con: 0,
        int: 0,
        sab: 0,
        car: 0
      }
    };
  }

  // ✏️ Editar
  openEdit(i: number) {
    const p = this.db.db.players[i];

    this.showForm = true;
    this.editIndex = i;

    this.form = {
      nome: p.nome,
      iniciativa: p.iniciativa,
      ca: p.ca,
      saves: { ...p.saves }
    };
  }

  // 💾 Salvar
  save() {
    if (!this.form.nome) return;

    if (this.editIndex !== null) {
      this.db.db.players[this.editIndex] = { ...this.form };
    } else {
      this.db.db.players.push({ ...this.form });
    }

    this.db.save();
    this.cancel();
  }

  // ❌ Cancelar
  cancel() {
    this.showForm = false;
  }

  // 🔽 Expandir dropdown
  toggleDetails(i: number) {
    this.expandedIndex = this.expandedIndex === i ? null : i;
  }

  // 🗑️ Deletar
  delete(i: number) {
    this.db.db.players.splice(i, 1);
    this.db.save();
  }
}
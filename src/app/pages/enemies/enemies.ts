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
    Adicionar Inimigo
  </button>

  <!-- FORM -->
  <form *ngIf="showForm" class="box" (ngSubmit)="save()">

    <h2 class="title is-5">
      {{ editIndex !== null ? 'Editar Inimigo' : 'Novo Inimigo' }}
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

    <!-- STATUS (RADIO NO FORM) -->
    <div class="field">
      <label class="label">Status inicial</label>

      <label class="radio">
        <input type="radio"
               [(ngModel)]="form.ativo"
               name="ativo"
               [value]="true">
        Ativo
      </label>

      <label class="radio ml-3">
        <input type="radio"
               [(ngModel)]="form.ativo"
               name="ativo"
               [value]="false">
        Inativo
      </label>
    </div>

    <!-- BOTÕES -->
    <div class="buttons">
      <button class="button is-success" type="submit">Salvar</button>
      <button class="button is-light" type="button" (click)="cancel()">Cancelar</button>
    </div>

  </form>

  <!-- LISTA -->
  <div *ngFor="let e of db.db.enemies; let i = index" class="box">

    <div class="is-flex is-align-items-center is-justify-content-space-between">

      <div>
        <strong>{{e.nome}}</strong><br>
        Init: {{e.iniciativa}} | CA: {{e.ca}}
      </div>

      <!-- TOGGLE DIRETO (O QUE VOCÊ QUERIA) -->
      <label class="checkbox">
        <input type="checkbox"
               [(ngModel)]="e.ativo"
               (change)="saveToggle()">
        <span class="ml-2">
          {{ e.ativo ? '🟢 Ativo' : '🔴 Inativo' }}
        </span>
      </label>

    </div>

    <div class="buttons mt-3">
      <button class="button is-warning" (click)="openEdit(i)">Editar</button>
      <button class="button is-danger" (click)="delete(i)">Apagar</button>
    </div>

  </div>

  <div *ngFor="let e of db.db.enemies; let i = index" class="box">

  <div class="columns is-mobile is-vcentered">

    <!-- Nome -->
    <div class="column">
      <p class="has-text-weight-bold">{{e.nome}}</p>
    </div>

    <!-- Iniciativa -->
    <div class="column has-text-centered">
      <p class="is-size-7 has-text-grey">Iniciativa</p>
      <p class="has-text-weight-semibold">{{e.iniciativa}}</p>
    </div>

    <!-- CA -->
    <div class="column has-text-centered">
      <p class="is-size-7 has-text-grey">CA</p>
      <p class="has-text-weight-semibold">{{e.ca}}</p>
    </div>

    <div class="column has-text-centered">
    <label class="checkbox">
        <input type="checkbox"
               [(ngModel)]="e.ativo"
               (change)="saveToggle()">
        <span class="ml-2">
          {{ e.ativo ? '🟢 Ativo' : '🔴 Inativo' }}
        </span>
      </label>
      </div>

  </div>

  </div>

  `
})
export class EnemiesComponent {

  showForm = false;
  editIndex: number | null = null;

  form = {
    nome: '',
    iniciativa: 0,
    ca: 0,
    ativo: true
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
      ativo: true
    };
  }

  // ✏️ Editar
  openEdit(i: number) {
    const e = this.db.db.enemies[i];

    this.showForm = true;
    this.editIndex = i;

    this.form = {
      nome: e.nome,
      iniciativa: e.iniciativa,
      ca: e.ca,
      ativo: e.ativo
    };
  }

  // 💾 Salvar (Add ou Edit)
  save() {
    if (!this.form.nome) return;

    if (this.editIndex !== null) {
      this.db.db.enemies[this.editIndex] = { ...this.form };
    } else {
      this.db.db.enemies.push({ ...this.form });
    }

    this.db.save();
    this.cancel();
  }

  // 🔁 Toggle rápido (lista)
  saveToggle() {
    this.db.save();
  }

  // ❌ Cancelar
  cancel() {
    this.showForm = false;
  }

  // 🗑️ Deletar
  delete(i: number) {
    this.db.db.enemies.splice(i, 1);
    this.db.save();
  }
}
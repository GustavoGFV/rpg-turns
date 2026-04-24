import { Injectable } from '@angular/core';
import { Database } from '../models/db.models';

@Injectable({ providedIn: 'root' })
export class DbService {

  db: Database = {
    players: [],
    enemies: []
  };

  constructor() {
    this.load();
  }

  save() {
    localStorage.setItem('rpg-db', JSON.stringify(this.db));
  }

  load() {
    const data = localStorage.getItem('rpg-db');
    if (data) {
      this.db = JSON.parse(data);
    }
  }

  exportJson() {
    const dataStr = JSON.stringify(this.db, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });

    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');

    a.href = url;
    a.download = `rpg-db-${Date.now()}.json`;
    a.click();

    URL.revokeObjectURL(url);
  }

 importJson(file: File) {
  const reader = new FileReader();

  reader.onload = () => {
    try {
      const json: Database = JSON.parse(reader.result as string);

      this.db = json;
      this.save();

      location.reload(); // 🔥 força atualizar UI

    } catch {
      alert('Erro ao importar JSON');
    }
  };

  reader.readAsText(file);
}
}
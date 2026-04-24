export interface Saves {
  for: number;
  des: number;
  con: number;
  int: number;
  sab: number;
  car: number;
}

export interface Player {
  nome: string;
  iniciativa: number;
  ca: number;
  saves: Saves;
}

export interface Enemy {
  nome: string;
  iniciativa: number;
  ca: number;
  ativo: boolean;
}

export interface Database {
  players: Player[];
  enemies: Enemy[];
}
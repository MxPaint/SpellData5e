import type { Monster } from "./entities/Monster";

export interface MonsterRepository {
  getRawMonsterList(): Promise<void>;
  getMonsterList(): Monster[];
}

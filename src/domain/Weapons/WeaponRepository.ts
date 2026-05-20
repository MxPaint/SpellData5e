import type { Weapon } from "./entities/Weapon";

export interface WeaponRepository {
  getRawWeaponList(): Promise<void>;
  getWeaponList(): Weapon[];
}
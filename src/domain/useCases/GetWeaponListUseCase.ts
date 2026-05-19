import type { WeaponApiRepository } from "../../data/WeaponApiRepository";
import type { Weapon } from "../entities/Weapon";

export class GetWeaponListUseCase {

  private weaponApiRepository: WeaponApiRepository;

  constructor(
    weaponApiRepository: WeaponApiRepository
  ) {
    this.weaponApiRepository = weaponApiRepository;
  }

  execute(): Weapon[] {
    try {
      const spells = this.weaponApiRepository.getWeaponList();
      return spells;
    } catch (error) {
      throw error;
    }
  }
}

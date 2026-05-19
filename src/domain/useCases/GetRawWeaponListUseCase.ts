import type { WeaponApiRepository } from "../../data/WeaponApiRepository";

export class GetRawWeaponListUseCase {

  private weaponApiRepository: WeaponApiRepository;

  constructor(
    weaponApiRepository: WeaponApiRepository
  ) {
    this.weaponApiRepository = weaponApiRepository;
  }

  async execute(): Promise<void> {
    try {
      await this.weaponApiRepository.getRawWeaponList();
    } catch (error) {
      throw error;
    }
  }
}

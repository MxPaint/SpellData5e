import type { MagicItemApiRepository } from "../../../data/MagicItemApiRepository";
import type { MagicItem } from "../entities/MagicItem";

export class GetMagicItemListUseCase {

  private magicItemApiRepository: MagicItemApiRepository;

  constructor(
    magicItemApiRepository: MagicItemApiRepository
  ) {
    this.magicItemApiRepository = magicItemApiRepository;
  }

  execute(): MagicItem[] {
    try {
      const spells = this.magicItemApiRepository.getMagicItemList();
      return spells;
    } catch (error) {
      throw error;
    }
  }
}

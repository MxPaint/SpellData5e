import type { MagicItemApiRepository } from "../../../data/MagicItemApiRepository";

export class GetRawMagicItemListUseCase {

  private magicItemApiRepository: MagicItemApiRepository;

  constructor(
    magicItemApiRepository: MagicItemApiRepository
  ) {
    this.magicItemApiRepository = magicItemApiRepository;
  }

  async execute(): Promise<void> {
    try {
      await this.magicItemApiRepository.getRawMagicItemList();
    } catch (error) {
      throw error;
    }
  }
}

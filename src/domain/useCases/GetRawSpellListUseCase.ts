import type { SpellApiRepository } from "../../data/SpellApiRepository";

export class GetRawSpellListUseCase {

  private spellApiRepository: SpellApiRepository;

  constructor(
    spellApiRepository: SpellApiRepository
  ) {
    this.spellApiRepository = spellApiRepository;
  }

  async execute(): Promise<void> {
    try {
      await this.spellApiRepository.getRawSpellList();
    } catch (error) {
      throw error;
    }
  }
}

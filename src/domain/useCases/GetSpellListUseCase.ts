import type { SpellApiRepository } from "../../data/SpellApiRepository";
import type { Spell } from "../entities/Spell";

export class GetSpellListUseCase {

  private spellApiRepository: SpellApiRepository;

  constructor(
    spellApiRepository: SpellApiRepository
  ) {
    this.spellApiRepository = spellApiRepository;
  }

  execute(): Spell[] {
    try {
      const spells = this.spellApiRepository.getSpellList();
      return spells;
    } catch (error) {
      throw error;
    }
  }
}

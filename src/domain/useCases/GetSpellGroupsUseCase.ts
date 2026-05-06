import type { SpellApiRepository } from "../../data/SpellApiRepository";
import type { SpellGroup } from "../entities/SpellGroup";

export class GetSpellGroupsUseCase {

  private spellApiRepository: SpellApiRepository;

  constructor(
    spellApiRepository: SpellApiRepository
  ) {
    this.spellApiRepository = spellApiRepository;
  }

  execute(): SpellGroup[] {
    try {
      const spells = this.spellApiRepository.getSpellGroups();
      return spells;
    } catch (error) {
      throw error;
    }
  }
}

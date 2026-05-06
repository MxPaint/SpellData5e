import type { SpellApiRepository } from "../../data/SpellApiRepository";
import type { Level } from "../valueObjects/Level";
import type { School } from "../valueObjects/School";

export class GetGroupOrderLevelUseCase {

  private spellApiRepository: SpellApiRepository;

  constructor(
    spellApiRepository: SpellApiRepository
  ) {
    this.spellApiRepository = spellApiRepository;
  }

  execute(level: Level): School[] {
    try {
      const schoolOrder = this.spellApiRepository.getGroupOrderLevel(level);
      return schoolOrder;
    } catch (error) {
      throw error;
    }
  }
}
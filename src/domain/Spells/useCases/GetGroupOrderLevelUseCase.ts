import type { SpellApiRepository } from "../../../data/SpellApiRepository";
import type { Level } from "../../Shared/valueObjects/Level";
import type { School } from "../../Shared/valueObjects/School";

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
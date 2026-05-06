import type { SpellApiRepository } from "../../data/SpellApiRepository";
import type { School } from "../valueObjects/School";

export class GetGroupOrderTotalUseCase {

  private spellApiRepository: SpellApiRepository;

  constructor(
    spellApiRepository: SpellApiRepository
  ) {
    this.spellApiRepository = spellApiRepository;
  }

  execute(): School[] {
    try {
      const schoolOrder = this.spellApiRepository.getGroupOrderTotal();
      return schoolOrder;
    } catch (error) {
      throw error;
    }
  }
}
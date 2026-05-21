import type { MonsterApiRepository } from "../../../data/MonsterApiRepository";
import type { Monster } from "../entities/Monster";

export class GetMonsterListUseCase {

  private monsterApiRepository: MonsterApiRepository;

  constructor(
    monsterApiRepository: MonsterApiRepository
  ) {
    this.monsterApiRepository = monsterApiRepository;
  }

  execute(): Monster[] {
    try {
      const spells = this.monsterApiRepository.getMonsterList();
      return spells;
    } catch (error) {
      throw error;
    }
  }
}

import type { MonsterApiRepository } from "../../../data/MonsterApiRepository";

export class GetRawMonsterListUseCase {

  private monsterApiRepository: MonsterApiRepository;

  constructor(
    monsterApiRepository: MonsterApiRepository
  ) {
    this.monsterApiRepository = monsterApiRepository;
  }

  async execute(): Promise<void> {
    try {
      await this.monsterApiRepository.getRawMonsterList();
    } catch (error) {
      throw error;
    }
  }
}

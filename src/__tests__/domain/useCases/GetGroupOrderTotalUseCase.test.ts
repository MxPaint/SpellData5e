import { describe, it, expect, vi, beforeEach } from 'vitest';
import type { SpellApiRepository } from '../../../data/SpellApiRepository';
import { GetGroupOrderTotalUseCase } from '../../../domain/Spells/useCases/GetGroupOrderTotalUseCase';
import { School } from '../../../domain/Shared/valueObjects/School';

describe('Tests of GetGroupOrderTotalUseCase', () => {
  let useCase: GetGroupOrderTotalUseCase;

  const mockRepo = {
    getGroupOrderTotal: vi.fn(),
  } as unknown as SpellApiRepository;

  beforeEach(() => {
    useCase = new GetGroupOrderTotalUseCase(mockRepo);
    vi.clearAllMocks();
  });

  it('should return Spell[] when the api succeeds', async () => {

    const mockApi: School[] = [
      School.create('Abjuration'),
      School.create('Evocation'),
      School.create('Conjuration'),
      School.create('Transmutation'),
      School.create('Enchantment'),
      School.create('Necromancy'),
      School.create('Illusion'),
      School.create('Divination'),
    ];

    vi.mocked(mockRepo.getGroupOrderTotal).mockResolvedValue(mockApi);

    const result = await useCase.execute();

    expect(result).toEqual(mockApi);
    expect(mockRepo.getGroupOrderTotal).toHaveBeenCalledTimes(1);
  });

  it('should throw "Error" when the api fails', async () => {
   
    vi.mocked(mockRepo.getGroupOrderTotal).mockRejectedValue(new Error('Repository Failure'));

    await expect(useCase.execute()).rejects.toThrow('Repository Failure');
  });

});

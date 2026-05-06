import { describe, it, expect, vi, beforeEach } from 'vitest';
import { GetSpellGroupsUseCase } from '../../../domain/useCases/GetSpellGroupsUseCase';
import type { SpellApiRepository } from '../../../data/SpellApiRepository';
import { SpellGroup } from '../../../domain/entities/SpellGroup';

describe('Tests of GetSpellGroupsUseCase', () => {
  let useCase: GetSpellGroupsUseCase;

  const mockRepo = {
    getSpellGroups: vi.fn(),
  } as unknown as SpellApiRepository;

  beforeEach(() => {
    useCase = new GetSpellGroupsUseCase(mockRepo);
    vi.clearAllMocks();
  });

  it('should return Spell[] when the api succeeds', async () => {

    const mockApi: SpellGroup[] = [
      SpellGroup.create({
        level: 0,
        school: 'Abjuration',
        count: 2
      }),
      SpellGroup.create({
        level: 0,
        school: 'Evocation',
        count: 10
      }),
      SpellGroup.create({
        level: 1,
        school: 'Abjuration',
        count: 6
      }),
      SpellGroup.create({
        level: 1,
        school: 'Evocation',
        count: 15
      }),
    ];

    vi.mocked(mockRepo.getSpellGroups).mockResolvedValue(mockApi);

    const result = await useCase.execute();

    expect(result).toEqual(mockApi);
    expect(mockRepo.getSpellGroups).toHaveBeenCalledTimes(1);
  });

  it('should throw "Error" when the api fails', async () => {
   
    vi.mocked(mockRepo.getSpellGroups).mockRejectedValue(new Error('Network Fail'));

    await expect(useCase.execute()).rejects.toThrow('Network Fail');
  });

});

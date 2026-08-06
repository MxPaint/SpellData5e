import { describe, it, expect, vi, beforeEach } from 'vitest';
import { GetSpellListUseCase } from '../../../domain/Spells/useCases/GetSpellListUseCase';
import type { SpellApiRepository } from '../../../data/SpellApiRepository';
import { Spell } from '../../../domain/Spells/entities/Spell';

describe('Tests of GetSpellListUseCase', () => {
  let useCase: GetSpellListUseCase;

  const mockRepo = {
    getSpellList: vi.fn(),
  } as unknown as SpellApiRepository;

  beforeEach(() => {
    useCase = new GetSpellListUseCase(mockRepo);
    vi.clearAllMocks();
  });

  it('should return Spell[] when the api succeeds', async () => {

    const mockApi: Spell[] = [
      Spell.create({
        id: 'bladeWard',
        level: 0,
        school: 'Abjuration',
        classList: ['bard', 'cleric'],
        description: 'You create a shimmering barrier of magical energy around yourself.',
        highLevel: '',
        range: 'Self',
        vComponents: true,
        sComponents: true,
        mComponents: false,
        materialComponents: '',
        ritual: false,
        duration: '1 round',
        concentration: false,
        castingTime: '1 action'
      }),
      Spell.create({
        id: 'cureWounds',
        level: 1,
        school: 'Evocation',
        classList: ['bard', 'cleric', 'druid'],
        description: 'You touch a creature and restore a number of hit points to it.',
        highLevel: '',
        range: 'Touch',
        vComponents: true,
        sComponents: true,
        mComponents: false,
        materialComponents: '',
        ritual: false,
        duration: 'Instantaneous',
        concentration: false,
        castingTime: '1 action'
      }),
    ];

    vi.mocked(mockRepo.getSpellList).mockResolvedValue(mockApi);

    const result = await useCase.execute();

    expect(result).toEqual(mockApi);
    expect(mockRepo.getSpellList).toHaveBeenCalledTimes(1);
  });

  it('should throw "Error" when the api fails', async () => {

    vi.mocked(mockRepo.getSpellList).mockRejectedValue(new Error('Network Fail'));

    await expect(useCase.execute()).rejects.toThrow('Network Fail');
  });

});

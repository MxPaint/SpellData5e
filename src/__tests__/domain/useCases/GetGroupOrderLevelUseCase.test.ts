import { describe, it, expect, vi, beforeEach } from 'vitest';
import { GetGroupOrderLevelUseCase } from '../../../domain/useCases/GetGroupOrderLevelUseCase';
import type { SpellApiRepository } from '../../../data/SpellApiRepository';
import { Level } from '../../../domain/valueObjects/Level';
import { School } from '../../../domain/valueObjects/School';

describe('GetGroupOrderLevelUseCase', () => {
  let useCase: GetGroupOrderLevelUseCase;
  let mockRepository: SpellApiRepository;

  beforeEach(() => {
    mockRepository = {
      getGroupOrderLevel: vi.fn(),
    } as unknown as SpellApiRepository;

    useCase = new GetGroupOrderLevelUseCase(mockRepository);
  });

  it('should return the school order from the repository for a given level', () => {

    const mockLevel = Level.create(1);
    const mockSchools = [School.create('Abjuration'), School.create('Evocation')];
    vi.mocked(mockRepository.getGroupOrderLevel).mockReturnValue(mockSchools);

    const result = useCase.execute(mockLevel);

    expect(mockRepository.getGroupOrderLevel).toHaveBeenCalledWith(mockLevel);
    expect(result).toBe(mockSchools);
    expect(result).toHaveLength(2);
  });

  it('should throw "Error" when the repository fails', () => {

    const mockLevel = { value: 99 } as Level;
    vi.mocked(mockRepository.getGroupOrderLevel).mockImplementation(() => {
      throw new Error('Repository Failure');
    });

    expect(() => useCase.execute(mockLevel)).toThrow('Repository Failure');
  });
});
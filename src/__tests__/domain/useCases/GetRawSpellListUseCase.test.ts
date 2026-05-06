import { describe, it, expect, vi, beforeEach } from 'vitest';
import { GetRawSpellListUseCase } from '../../../domain/useCases/GetRawSpellListUseCase';
import type { SpellApiRepository } from '../../../data/SpellApiRepository';

describe('GetRawSpellListUseCase', () => {
  let useCase: GetRawSpellListUseCase;
  let mockRepository: SpellApiRepository;

  beforeEach(() => {
    mockRepository = {
      getRawSpellList: vi.fn(),
    } as unknown as SpellApiRepository;

    useCase = new GetRawSpellListUseCase(mockRepository);
  });

  it('should call getRawSpellList on the repository when executed', async () => {
    vi.mocked(mockRepository.getRawSpellList).mockResolvedValue(undefined);

    await useCase.execute();

    expect(mockRepository.getRawSpellList).toHaveBeenCalledTimes(1);
  });

  it('should throw a generic "Error" if the repository fails', async () => {

    vi.mocked(mockRepository.getRawSpellList).mockRejectedValue(new Error('Network Fail'));

    await expect(useCase.execute()).rejects.toThrow('Network Fail');
  });
});

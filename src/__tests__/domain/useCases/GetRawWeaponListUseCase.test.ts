import { describe, it, expect, vi, beforeEach } from 'vitest';
import { GetRawWeaponListUseCase } from '../../../domain/Weapons/useCases/GetRawWeaponListUseCase';
import type { WeaponApiRepository } from '../../../data/WeaponApiRepository';

describe('GetRawWeaponListUseCase', () => {
  let useCase: GetRawWeaponListUseCase;
  let mockRepository: WeaponApiRepository;

  beforeEach(() => {
    mockRepository = {
      getRawWeaponList: vi.fn(),
    } as unknown as WeaponApiRepository;

    useCase = new GetRawWeaponListUseCase(mockRepository);
  });

  it('should call getRawWeaponList on the repository when executed', async () => {
    vi.mocked(mockRepository.getRawWeaponList).mockResolvedValue(undefined);

    await useCase.execute();

    expect(mockRepository.getRawWeaponList).toHaveBeenCalledTimes(1);
  });

  it('should throw a generic "Error" if the repository fails', async () => {

    vi.mocked(mockRepository.getRawWeaponList).mockRejectedValue(new Error('Network Fail'));

    await expect(useCase.execute()).rejects.toThrow('Network Fail');
  });
});

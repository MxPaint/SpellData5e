import { describe, it, expect, vi, beforeEach } from 'vitest';
import { GetWeaponListUseCase } from '../../../domain/Weapons/useCases/GetWeaponListUseCase';
import type { WeaponApiRepository } from '../../../data/WeaponApiRepository';
import { Weapon } from '../../../domain/Weapons/entities/Weapon';

describe('Tests of GetWeaponListUseCase', () => {
  let useCase: GetWeaponListUseCase;

  const mockRepo = {
    getWeaponList: vi.fn(),
  } as unknown as WeaponApiRepository;

  beforeEach(() => {
    useCase = new GetWeaponListUseCase(mockRepo);
    vi.clearAllMocks();
  });

  it('should return Weapon[] when the api succeeds', async () => {

    const mockApi: Weapon[] = [
      Weapon.create({
        id: 'Scimitar',
        category: 'Martial Melee Weapon',
        damageDice: '1d6',
        damageType: 'slashing',
        properties: ['finesse', 'light']
      }),
      Weapon.create({
        id: 'Glaive',
        category: 'Martial Melee Weapon',
        damageDice: '1d10',
        damageType: 'slashing',
        properties: ['heavy', 'reach', 'two-handed']
      }),
    ];

    vi.mocked(mockRepo.getWeaponList).mockResolvedValue(mockApi);

    const result = await useCase.execute();

    expect(result).toEqual(mockApi);
    expect(mockRepo.getWeaponList).toHaveBeenCalledTimes(1);
  });

  it('should throw "Error" when the api fails', async () => {
   
    vi.mocked(mockRepo.getWeaponList).mockRejectedValue(new Error('Network Fail'));

    await expect(useCase.execute()).rejects.toThrow('Network Fail');
  });

});

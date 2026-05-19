import { describe, beforeEach, vi, it, expect } from "vitest";
import { WeaponApiRepository } from "../../data/WeaponApiRepository";

describe('WeaponApiRepository', () => {
  
  const repo = WeaponApiRepository.instance;

  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn());
  });

  it('should fetch and map weapons', async () => {
    
    vi.mocked(fetch)
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          results: [{ name: 'Dagger', category: 'Simple Melee Weapons', damage_dice: '1d4', damage_type:'piercing', properties:['finesse', 'light', 'thrown (range 20/60)'] }]
        })
      } as Response)

    await repo.getRawWeaponList();
    
    expect(repo.getWeaponList()).toHaveLength(1);
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  it('should throw error if fetch fails', async () => {
    vi.mocked(fetch).mockResolvedValue({
      ok: false,
      status: 404,
      statusText: 'Not Found'
    } as Response);

    await expect(repo.getRawWeaponList()).rejects.toThrow('Open5e API Error: 404 Not Found');
  });

});
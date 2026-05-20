import { describe, it, expect } from 'vitest';
import { Weapon, type WeaponData } from '../../../domain/Weapons/entities/Weapon';
import { Id } from '../../../domain/Shared/valueObjects/Id';
import { TextField } from '../../../domain/Shared/valueObjects/TextField';
import { Damage } from '../../../domain/Shared/valueObjects/Damage';

describe('Tests of Entity Weapon', () => {

  const validWeaponData: WeaponData = {
    id: 'Rapier',
    category: 'Martial Melee Weapons',
    damageDice: '1d8',
    damageType: 'piercing',
    properties: ['finesse']
  };


  it('Should create a Weapon', () => {
    const weapon = Weapon.create(validWeaponData);
    expect(weapon).toBeInstanceOf(Weapon);
  });

  it('Should correctly instantiate nested Value Objects', () => {
    const weapon = Weapon.create(validWeaponData);

    expect(weapon.id).toBeInstanceOf(Id);
    expect(weapon.category).toBeInstanceOf(TextField);
    expect(weapon.damageDice).toBeInstanceOf(TextField);
    expect(weapon.damageType).toBeInstanceOf(Damage);
    expect(weapon.properties[0]).toBeInstanceOf(TextField);
  });
  
  it('Should update Weapon properties with new data', () => {
    const weapon = Weapon.create(validWeaponData);
    
    const updatedData: WeaponData = {
      id: 'Rapier',
      category: 'Simple Melee Weapons',
      damageDice: '1d10',
      damageType: 'slashing',
      properties: ['light']
    };

    weapon.update(updatedData);

    expect(weapon.category.value).toBe(updatedData.category);
    expect(weapon.damageDice.value).toBe(updatedData.damageDice);
    expect(weapon.damageType.value).toBe(updatedData.damageType);
    expect(weapon.properties[0].value).toBe(updatedData.properties[0]);
  });
  
  it('Should throw an error if Value Object validation fails', () => {
    
    const invalidData = { ...validWeaponData, category: '' };

    expect(() => Weapon.create(invalidData)).toThrow();
  });
  
});

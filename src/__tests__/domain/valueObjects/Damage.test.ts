import { describe, it, expect } from 'vitest';
import { Damage } from '../../../domain/valueObjects/Damage';

describe('Tests on Damage Value Object', () => {

  it('should create a new Damage', () => {
    const damageStr = 'piercing';
    const damage = Damage.create(damageStr);

    expect(damage.value).toBe(damageStr);
  });

  it('should throw an error with an invalid value', () => {
    expect(() => Damage.create('A')).toThrow(/Damage must be valid/i);
  });

  it('should format a Damage', () => {
    const damageStr = ' bludgeoning ';
    const damage = Damage.create(damageStr);

    expect(damage.value).toBe('bludgeoning');
  });

  it('should compare two Damages', () => {
    const damage1 = Damage.create('slashing');
    const damage2 = Damage.create('slashing');

    expect(damage1.equals(damage2)).toBe(true);
  });

  it('should compare two different Damages', () => {
    const damage1 = Damage.create('piercing');
    const damage2 = Damage.create('');

    expect(damage1.equals(damage2)).toBe(false);
  });
});

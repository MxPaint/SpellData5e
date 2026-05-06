import { describe, expect, it } from 'vitest';
import { Id } from '../../../domain/valueObjects/Id';

describe('Tests on Id Value Object', () => {
  it('should create an Id instance with no value', () => {
    const id = Id.generate();
    expect(id).toBeInstanceOf(Id);
  });

  it('should create an Id instance with a valid value', () => {
    const id = Id.create('id1');
    expect(id).toBeInstanceOf(Id);
  });

  it('should compare two Ids', () => {
    const id1 = Id.create('newId');
    const id2 = Id.create('newId');

    expect(id1.equals(id2)).toBe(true);
  });

  it('should compare two different Ids', () => {
    const id1 = Id.create('newId');
    const id2 = Id.create('oldId');

    expect(id1.equals(id2)).toBe(false);
  });
});

import { Drink } from '../Drink';

describe('Drink model', () => {
  it('creates a drink instance with the expected field values', () => {
    const coffee = new Drink('Coffee', 2, true, 2, 'small');

    expect(coffee).toMatchObject({
      name: 'Coffee',
      basePrice: 2,
      milk: true,
      sugar: 2,
      size: 'small',
    });
  });

  it('stores its data correctly in each property', () => {
    const beverage = new Drink('Coffee', 2, true, 2, 'small');

    expect(beverage.name).toEqual('Coffee');
    expect(beverage.basePrice).toEqual(2);
    expect(beverage.milk).toBeTruthy();
    expect(beverage.sugar).toBe(2);
    expect(beverage.size).toEqual('small');
  });
});

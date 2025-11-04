import { Drink } from '../Drink';
import { CoffeeMachine } from '../CoffeeMachine';

describe('CoffeeMachine functionality', () => {
  
  it('serves coffee when exact paymentt is provided', () => {
    const coffeeMachine = new CoffeeMachine();
    const coffee = new Drink('Coffee', 2, false, 0, 'small');

    const response = coffeeMachine.serve(coffee, 2, false, 10);

    expect(response).toEqual('Serving Coffee (small)');
  });

  it('refuses to serve when insufficient money is inserted', () => {
    const coffeeMachine = new CoffeeMachine();
    const coffee = new Drink('Coffee', 2, false, 0, 'small');

    const result = coffeeMachine.serve(coffee, 1.5, false, 10);

    expect(result).toEqual('Not enough money');
  });

  it('returns change when user inserts more money than needed', () => {
    const coffeeMachine = new CoffeeMachine();
    const drink = new Drink('Coffee', 2, false, 0, 'small');
    const inserted = 3;
    const expectedChange = 1;

    const output = coffeeMachine.serve(drink, inserted, false, 10);

    expect(output).toEqual(`Serving ${drink.name} (${drink.size}) with change ${expectedChange.toFixed(2)}`);
  });

  it('adds 0.50€ to the price for medium sized drinks', () => {
    const coffeeMachine = new CoffeeMachine();
    const drink = new Drink('Coffee', 2, false, 0, 'medium');
    const payment = 2.5;

    const message = coffeeMachine.serve(drink, payment, false, 10);

    expect(message).toEqual('Serving Coffee (medium)');
  });

  it('throws an error if sugar cubes exceed 5', () => {
    const coffeeMachine = new CoffeeMachine();
    const drink = new Drink('Coffee', 2, false, 6, 'small');
    const amount = 2.4;

    const message = coffeeMachine.serve(drink, amount, false, 10);

    expect(message).toBe('Error: too much sugar');
  });

  it('applies a 20% discount during happy hour', () => {
    const coffeeMachine = new CoffeeMachine();
    const drink = new Drink('Coffee', 2, false, 2, 'small');
    const insertedMoney = 1.6; // 20% off

    const output = coffeeMachine.serve(drink, insertedMoney, false, 16);

    expect(output).toBe('Serving Coffee (small)');
  });

  it('charges an extra 1€ for large drinks', () => {
    const coffeeMachine = new CoffeeMachine();
    const drink = new Drink('Coffee', 2, false, 0, 'large');
    const inserted = 3;

    const served = coffeeMachine.serve(drink, inserted, false, 10);

    expect(served).toEqual('Serving Coffee (large)');
  });

  it('adds 0.20€ when milk is included', () => {
    const coffeeMachine = new CoffeeMachine();
    const drink = new Drink('Coffee', 2, true, 2, 'small');
    const cash = 2.2;

    const result = coffeeMachine.serve(drink, cash, false, 10);

    expect(result).toBe('Serving Coffee (small)');
  });

  it('rejects drinks with negative price values', () => {
    const coffeeMachine = new CoffeeMachine();
    const drink = new Drink('Coffee', -1, false, 2, 'small');
    const payment = 2;

    const outcome = coffeeMachine.serve(drink, payment, false, 10);

    expect(outcome).toEqual('Error: invalid price');
  });

  it('gives every fifth drink free for loyal customers', () => {
    const machine = new CoffeeMachine();
    const drink = new Drink('Coffee', 2, false, 1, 'small');

    for (let i = 0; i < 4; i++) {
      machine.serve(drink, 2, true, 10);
    }

    const finalResult = machine.serve(drink, 0, true, 10);

    expect(finalResult).toBe('Serving Coffee (small)');
  });
});

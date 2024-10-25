import exampleReducer, {
    increment,
    decrement,
    incrementByAmount,
  } from './exampleSlice';
  
  describe('counter reducer', () => {
    const initialState = {
      value: 3,
      status: 'idle',
    };
    it('should handle initial state', () => {
      expect(exampleReducer(undefined, { type: 'unknown' })).toEqual({
        value: 0,
        status: 'idle',
      });
    });
  
    it('should handle increment', () => {
      const actual = exampleReducer(initialState, increment());
      expect(actual.value).toEqual(4);
    });
  
    it('should handle decrement', () => {
      const actual = exampleReducer(initialState, decrement());
      expect(actual.value).toEqual(2);
    });
  
    it('should handle incrementByAmount', () => {
      const actual = exampleReducer(initialState, incrementByAmount(2));
      expect(actual.value).toEqual(5);
    });
  });
  
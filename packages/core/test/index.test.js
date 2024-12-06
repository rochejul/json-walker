import { describe, test, expect } from '@jest/globals';
import { Walker, ObjectRequiredError } from '../src/walker';

describe('core', () => {
  test('the Walker class should be exposed', () => {
    // Assert
    expect(Walker).toBeDefined();
    expect(Walker).not.toBeNull();
  });

  describe('constructor', () => {
    test('it should raise an exception if no object is provided (nothing provided)', () => {
      // Assert
      expect(() => {
        new Walker();
      }).toThrow(ObjectRequiredError);
    });

    test('it should raise an exception if no object is provided (undefined)', () => {
      // Assert
      expect(() => {
        new Walker(undefined);
      }).toThrow(ObjectRequiredError);
    });

    test('it should raise an exception if no object is provided (null)', () => {
      // Assert
      expect(() => {
        new Walker(null);
      }).toThrow(ObjectRequiredError);
    });
  });

  describe('next', () => {
    test('next should be present on the instantiated Walker', () => {
      // Arrange
      const walker = new Walker({});

      // Assert
      expect(walker.next).toBeDefined();
      expect(walker.next).toStrictEqual(expect.any(Function));
    });

    test('next should return null if the object is empty', () => {
      // Arrange
      const walker = new Walker({});

      // Assert
      expect(walker.next()).toBeNull();
    });
  });
});

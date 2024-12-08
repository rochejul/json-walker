import { describe, test, expect } from '@jest/globals';
import { Option } from '../src/option';
import { IllegalInstantationError } from '../src/exceptions/illegal-instantion-error';

describe('util/option', () => {
  test('the Option class cannot be instantiated', () => {
    // Assert
    expect(() => new Option()).toThrow(IllegalInstantationError);
  });

  describe('from method', () => {
    test('it returns an Option', () => {
      // Act
      const actual = Option.from('some value');

      // Assert
      expect(actual instanceof Option).toBeTruthy();
    });

    test('it allows undefined value', () => {
      // Act
      const actual = Option.from(undefined);

      // Assert
      expect(actual instanceof Option).toBeTruthy();
    });

    test('it allows null value', () => {
      // Act
      const actual = Option.from(null);

      // Assert
      expect(actual instanceof Option).toBeTruthy();
    });

    test('it allows value', () => {
      // Act
      const actual = Option.from('some value');

      // Assert
      expect(actual instanceof Option).toBeTruthy();
    });
  });

  describe('none method', () => {
    test('it returns an Option', () => {
      // Act
      const actual = Option.none();

      // Assert
      expect(actual instanceof Option).toBeTruthy();
    });

    test('it returns null', () => {
      // Act
      const actual = Option.none();

      // Assert
      expect(actual.isNone()).toBeTruthy();
      expect(actual.value).toBeNull();
    });
  });

  describe('instance', () => {
    test('the "value" getter returns the provided value', () => {
      // Act
      const actual = Option.from('acme');

      // Assert
      expect(actual.value).toBe('acme');
    });

    describe('isNone', () => {
      test('it returns true if undefined value', () => {
        // Act
        const actual = Option.from(undefined);

        // Assert
        expect(actual.isNone()).toBeTruthy();
      });

      test('it returns true if null value', () => {
        // Act
        const actual = Option.from(null);

        // Assert
        expect(actual.isNone()).toBeTruthy();
      });

      test('it returns false otherwise', () => {
        // Act
        const actual = Option.from('');

        // Assert
        expect(actual.isNone()).toBeFalsy();
      });
    });

    describe('isSome', () => {
      test('it returns false if undefined value', () => {
        // Act
        const actual = Option.from(undefined);

        // Assert
        expect(actual.isSome()).toBeFalsy();
      });

      test('it returns false if null value', () => {
        // Act
        const actual = Option.from(null);

        // Assert
        expect(actual.isSome()).toBeFalsy();
      });

      test('it returns true otherwise', () => {
        // Act
        const actual = Option.from('');

        // Assert
        expect(actual.isSome()).toBeTruthy();
      });
    });
  });
});

import { describe, test, expect } from '@jest/globals';
import { Walker, ObjectRequiredError, IterableWalker } from '../src/walker';
import { Option } from '@json-walker/util';

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
      const walker = new Walker('');

      // Assert
      expect(walker.next).toBeDefined();
      expect(walker.next).toStrictEqual(expect.any(Function));
    });

    test('next should return an Option', () => {
      // Arrange
      const walker = new Walker('');

      // Assert
      expect(walker.next() instanceof Option).toBeTruthy();
    });
  });

  describe('walker', () => {
    function grabProperties(value) {
      const properties = [];
      const walker = new Walker(value);
      let optionalWalkerMetadata;

      do {
        optionalWalkerMetadata = walker.next();

        if (optionalWalkerMetadata.isSome()) {
          properties.push({
            path: optionalWalkerMetadata.value.propertyPath.toString(),
            type: optionalWalkerMetadata.value.propertyType,
            value: optionalWalkerMetadata.value.propertyValue,
          });
        }
      } while (optionalWalkerMetadata.isSome());

      return properties;
    }

    test('when we provide a string as root source', () => {
      // Act
      const actual = grabProperties('foo');

      // Assert
      expect(actual).toStrictEqual([
        {
          path: '',
          type: 'string',
          value: 'foo',
        },
      ]);
    });

    test('when we provide an object with one root level', () => {
      // Act
      const actual = grabProperties({ label: 'foo' });

      // Assert
      expect(actual).toStrictEqual([
        {
          path: 'label',
          type: 'string',
          value: 'foo',
        },
      ]);
    });

    test('when we provide an object with two levels', () => {
      // Act
      const secondLevel = { label: 'foo' };
      const firstLevel = { record: secondLevel };
      const actual = grabProperties(firstLevel);

      // Assert
      expect(actual).toStrictEqual([
        {
          path: 'record',
          type: 'object',
          value: secondLevel,
        },
        {
          path: 'record.label',
          type: 'string',
          value: 'foo',
        },
      ]);
    });

    test('when we provide an array with strings', () => {
      // Act
      const actual = grabProperties(['foo', 'bar']);

      // Assert
      expect(actual).toStrictEqual([
        {
          path: '[0]',
          type: 'string',
          value: 'foo',
        },
        {
          path: '[1]',
          type: 'string',
          value: 'bar',
        },
      ]);
    });

    test('when we provide an array with an object', () => {
      // Act
      const secondLevel = { label: 'foo' };
      const firstLevel = { record: secondLevel };
      const actual = grabProperties([firstLevel]);

      // Assert
      expect(actual).toStrictEqual([
        {
          path: '[0]',
          type: 'object',
          value: firstLevel,
        },
        {
          path: '[0].record',
          type: 'object',
          value: secondLevel,
        },
        {
          path: '[0].record.label',
          type: 'string',
          value: 'foo',
        },
      ]);
    });

    test('when we provide an object with array', () => {
      // Act
      const secondLevel = { label: 'foo' };
      const array = [secondLevel];
      const firstLevel = { records: array };
      const actual = grabProperties(firstLevel);

      // Assert
      expect(actual).toStrictEqual([
        {
          path: 'records',
          type: 'array',
          value: array,
        },
        {
          path: 'records[0]',
          type: 'object',
          value: secondLevel,
        },
        {
          path: 'records[0].label',
          type: 'string',
          value: 'foo',
        },
      ]);
    });
  });

  describe('iterable walker', () => {
    function grabProperties(value) {
      const properties = [];
      const walker = new IterableWalker(value);

      for (const value of walker) {
        properties.push({
          path: value.propertyPath.toString(),
          type: value.propertyType,
          value: value.propertyValue,
        });
      }

      return properties;
    }

    test('when we provide a string as root source', () => {
      // Act
      const actual = grabProperties('foo');

      // Assert
      expect(actual).toStrictEqual([
        {
          path: '',
          type: 'string',
          value: 'foo',
        },
      ]);
    });

    test('when we provide an object with one root level', () => {
      // Act
      const actual = grabProperties({ label: 'foo' });

      // Assert
      expect(actual).toStrictEqual([
        {
          path: 'label',
          type: 'string',
          value: 'foo',
        },
      ]);
    });

    test('when we provide an object with two levels', () => {
      // Act
      const secondLevel = { label: 'foo' };
      const firstLevel = { record: secondLevel };
      const actual = grabProperties(firstLevel);

      // Assert
      expect(actual).toStrictEqual([
        {
          path: 'record',
          type: 'object',
          value: secondLevel,
        },
        {
          path: 'record.label',
          type: 'string',
          value: 'foo',
        },
      ]);
    });

    test('when we provide an array with strings', () => {
      // Act
      const actual = grabProperties(['foo', 'bar']);

      // Assert
      expect(actual).toStrictEqual([
        {
          path: '[0]',
          type: 'string',
          value: 'foo',
        },
        {
          path: '[1]',
          type: 'string',
          value: 'bar',
        },
      ]);
    });

    test('when we provide an array with an object', () => {
      // Act
      const secondLevel = { label: 'foo' };
      const firstLevel = { record: secondLevel };
      const actual = grabProperties([firstLevel]);

      // Assert
      expect(actual).toStrictEqual([
        {
          path: '[0]',
          type: 'object',
          value: firstLevel,
        },
        {
          path: '[0].record',
          type: 'object',
          value: secondLevel,
        },
        {
          path: '[0].record.label',
          type: 'string',
          value: 'foo',
        },
      ]);
    });

    test('when we provide an object with array', () => {
      // Act
      const secondLevel = { label: 'foo' };
      const array = [secondLevel];
      const firstLevel = { records: array };
      const actual = grabProperties(firstLevel);

      // Assert
      expect(actual).toStrictEqual([
        {
          path: 'records',
          type: 'array',
          value: array,
        },
        {
          path: 'records[0]',
          type: 'object',
          value: secondLevel,
        },
        {
          path: 'records[0].label',
          type: 'string',
          value: 'foo',
        },
      ]);
    });
  });
});

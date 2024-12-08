import { describe, test, expect } from '@jest/globals';
import {
  WalkerPath,
  MemberWalkerPathExpression,
  ArrayWalkerPathExpression,
} from '../../src/models/walker-path';

describe('core/models/walker-path', () => {
  test('walker path should provide an empty string if no expression was provided', () => {
    // Arrange
    const walkerPath = new WalkerPath({ paths: [] });

    // Act
    const actual = walkerPath.toString();

    // Assert
    expect(actual).toBe('');
  });

  test('walker path should provide the provided member', () => {
    // Arrange
    const walkerPath = new WalkerPath({
      paths: [new MemberWalkerPathExpression({ expression: 'label' })],
    });

    // Act
    const actual = walkerPath.toString();

    // Assert
    expect(actual).toBe('label');
  });

  test('walker path should provide the provided array item', () => {
    // Arrange
    const walkerPath = new WalkerPath({
      paths: [new ArrayWalkerPathExpression({ expression: '0' })],
    });

    // Act
    const actual = walkerPath.toString();

    // Assert
    expect(actual).toBe('[0]');
  });

  test('walker path should provide the deep path', () => {
    // Arrange
    const walkerPath = new WalkerPath({
      paths: [
        new MemberWalkerPathExpression({ expression: 'results' }),
        new ArrayWalkerPathExpression({ expression: '0' }),
        new MemberWalkerPathExpression({ expression: 'label' }),
      ],
    });

    // Act
    const actual = walkerPath.toString();

    // Assert
    expect(actual).toBe('results[0].label');
  });
});

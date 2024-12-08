import { getPropertyType, WalkerPropertyType } from '@json-walker/util';
import { ArrayWalker } from './array-walker';
import { DeadEndWalker } from './dead-end-walker';
import { ObjectWalker } from './object-walker';

/**
 * @param {{ value: *, currentWalkerPath: WalkerPath }} param
 * @returns {Walker}
 */
export function getWalker({ value, currentWalkerPath }) {
  const propertyType = getPropertyType(value);

  if (WalkerPropertyType.ARRAY === propertyType) {
    return new ArrayWalker({ value, currentWalkerPath });
  }

  if (WalkerPropertyType.OBJECT === propertyType) {
    return new ObjectWalker({ value, currentWalkerPath });
  }

  return new DeadEndWalker({ value, currentWalkerPath });
}

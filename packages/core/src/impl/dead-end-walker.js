import { Option } from '@json-walker/util';
import { WalkerMetadata } from '../models/walker-metadata';

export class DeadEndWalker {
  #lastOptionalWalkerMetadata;

  constructor({ value, currentWalkerPath }) {
    this.#lastOptionalWalkerMetadata = Option.from(
      new WalkerMetadata({
        propertyName: '',
        propertyValue: value,
        propertyPath: currentWalkerPath,
      }),
    );
  }

  nextStep() {
    const optionalWalkerMetadata = this.#lastOptionalWalkerMetadata;
    this.#lastOptionalWalkerMetadata = Option.from(null);
    return optionalWalkerMetadata;
  }
}

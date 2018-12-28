class MyArray {
  constructor(...args) {
    if (args.length === 1 && typeof args[0] === 'number') {
      this.length = args[0];
    } else {
      this.length = args.length;

      for (let i = 0; i < args.length; i++) {
        this[i] = args[i];
      }
    }
  }
  push(...args) {
    for (let i = 0; i < args.length; i++) {
      this[this.length] = args[i];
      this.length += 1;
    }
    return this.length;
  }

  pop() {
    if (this.length > 0) {
      const lastElement = this[this.length - 1];
      delete this[this.length - 1];
      this.length -= 1;
      return lastElement;
    }
  }

  forEach(callback, thisArg) {
    for (let i = 0; i < this.length; i++) {
      callback.call(thisArg, this[i], i, this);
    }
  }

  map(callback, thisArg) {
    const resultArray = new MyArray();

    for (let i = 0; i < this.length; i++) {
      resultArray.push(callback.call(thisArg, this[i], i, this));
    }
    return resultArray;
  }

  filter(callback, thisArg) {
    const resultArray = new MyArray();

    for (let i = 0; i < this.length; i++) {
      if (callback.call(thisArg, this[i], i, this)) {
        resultArray.push(this[i]);
      }
    }
    return resultArray;
  }

  find(callback, thisArg) {
    for (let i = 0; i < this.length; i++) {
      if (callback.call(thisArg, this[i], i, this)) {
        return this[i];
      }
    }
  }

  reduce(callback, startValue) {
    let result = startValue === undefined ? this[0] : startValue;

    if (startValue !== undefined) {
      this[0] = callback(result, this[0], 0, this);
    }

    if (this.length === 0 && startValue === undefined) {
      throw new TypeError('Array is empty, InitialValue is specified, callback shouldnot  be called');
    }

    for (let i = 1; i < this.length; i++) {
      result = callback(result, this[i], i, this);
    }
    return result;
  }

  static from(arg, callback, thisArg) {
    const resultArray = new MyArray();

    if (callback && thisArg || callback && !thisArg) {
      for (let i = 0; i < arg.length; i++) {
        resultArray.push(callback.call(thisArg, arg[i], i, arg));
      }
    } else {
      for (let i = 0; i < arg.length; i++) {
        resultArray.push(arg[i]);
      }
    }
    return resultArray;
  }

  toString() {
    let str = '';

    for (let i = 0; i < this.length - 1; i++) {
      str += `${this[i]},`;
    }
    str += `${this[this.length - 1]}`;

    return this.length === 0 ? '' : str;
  }

  slice(begin, end) {
    const newMassif = new MyArray();
    let startValueIndex = begin ? begin : 0;
    let endValueIndex = end ? end : this.length;

    startValueIndex = begin < 0 ? this.length + begin : startValueIndex;
    endValueIndex = end < 0 ? this.length + end : endValueIndex;

    for (let i = startValueIndex; i < endValueIndex; i++) {
      newMassif.push(this[i]);
    }
    return newMassif;
  }

  sort(callback) {
    let maxValue = null;

    if (callback) {
      for (let i = 0; i < this.length - 1; i++) {
        for (let j = 0; j < this.length - 1; j++) {
          if (callback(this[j], this[j + 1]) > 0) {
            maxValue = this[j];
            this[j] = this[j + 1];
            this[j + 1] = maxValue;
          }
        }
      }
    } else {
      for (let i = 0; i < this.length - 1; i++) {
        for (let j = 0; j < this.length - 1; j++) {
          if (String(this[j]) > String(this[j + 1])) {
            maxValue = this[j];
            this[j] = this[j + 1];
            this[j + 1] = maxValue;
          }
        }
      }
    }
    return this;
  }

  * [Symbol.iterator]() {
    for (let i = 0; i < this.length; i++) {
      yield this[i];
    }
  }
}

export default MyArray;

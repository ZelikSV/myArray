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
    const indexLast = this.length - 1;

    if (this.length > 0) {
      const lastElement = this[indexLast];
      delete this[indexLast];
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
      resultArray[i] = callback.call(thisArg, this[i], i, this);
      resultArray.length += 1;
    }
    return resultArray;
  }

  filter(callback, thisArg) {
    const resultArray = new MyArray();

    for (let i = 0; i < this.length; i++) {
      if (callback.call(thisArg, this[i], i, this)) {
        resultArray[resultArray.length] = this[i];
        resultArray.length += 1;
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

  reduce(callback, initialValue) {
    let result = initialValue === undefined ? this[0] : initialValue;

    if (this.length === 0 && initialValue === undefined) {
      throw new TypeError('Array is empty, InitialValue is specified, callback shouldnot  be called');
    }

    if (initialValue !== undefined) {
      this[0] = callback(result, this[0], 0, this);
    }

    for (let i = 1; i < this.length; i++) {
      result = callback(result, this[i], i, this);
    }
    return result;
  }

  static from(arg, callback, thisArg) {
    const resultArray = new MyArray();

    if (callback) {
      for (let i = 0; i < arg.length; i++) {
        resultArray[i] = callback.call(thisArg, arg[i], i, arg);
        resultArray.length += 1;
      }
    } else {
      for (let i = 0; i < arg.length; i++) {
        resultArray[resultArray.length] = arg[i];
        resultArray.length += 1;
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
    const newArray = new MyArray();

    const startValueIndex = begin < 0 ? this.length + begin : begin || 0;
    const endValueIndex = end < 0 ? this.length + end : end || this.length;

    for (let i = startValueIndex; i < endValueIndex; i++) {
      newArray[newArray.length] = this[i];
      newArray.length += 1;
    }
    return newArray;
  }

  sort(callback) {
    let maxValue = null;
    let cnFunc = callback;

    if (!cnFunc) {
      cnFunc = (a, b) => {
        if (`${a}` > `${b}`) {
          return 1;
        } else if (`${a}` < `${b}`) {
          return -1;
        } else {
          return 0;
        }
      };
    }

    for (let i = 0; i < this.length - 1; i++) {
      for (let j = 0; j < this.length - 1; j++) {
        if (cnFunc(this[j], this[j + 1]) > 0) {
          maxValue = this[j];
          this[j] = this[j + 1];
          this[j + 1] = maxValue;
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

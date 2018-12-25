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
  push(...arg) {
    for (let i = 0; i < arg.length; i++) {
      this[this.length] = arg[i];
      this.length += 1;
    }
    return this.length;
  }

  pop() {
    if (this.length === 0) {
      return undefined;
    }

    const lastElement = this[this.length - 1];
    delete this[this.length - 1];
    this.length -= 1;

    return lastElement;
  }

  forEach(callback, thisArg) {
    const massif = this;

    for (let i = 0; i < massif.length; i++) {
      callback.call(thisArg, massif[i], i, massif);
    }
  }

  map(callback, thisArg) {
    const massif = this;
    const resultMassif = new MyArray();

    for (let i = 0; i < massif.length; i++) {
      resultMassif.push(callback.call(thisArg, massif[i], i, massif));
    }
    return resultMassif;
  }

  filter(callback, thisArg) {
    const massif = this;
    const resultMassif = new MyArray();

    for (let i = 0; i < massif.length; i++) {
      if (callback.call(thisArg, massif[i], i, massif)) {
        resultMassif.push(massif[i]);
      }
    }
    return resultMassif;
  }

  find(callback, thisArg) {
    const massif = this;

    for (let i = 0; i < massif.length; i++) {
      if (callback.call(thisArg, massif[i], i, massif)) {
        return massif[i];
      }
    }
    return undefined;
  }

  reduce(callback, startValue) {
    const massif = this;
    let result = null;

    if (callback && startValue !== undefined) {
      result = startValue;

      for (let i = 0; i < massif.length; i++) {
        result = callback(result, massif[i], i, massif);
      }
    }

    if (callback && startValue === undefined) {
      result = massif[0];

      for (let i = 1; i < massif.length; i++) {
        result = callback(result, massif[i], i, massif);
      }
    }

    if (massif.length === 0 && startValue === undefined) {
      throw new TypeError('Array is empty, InitialValue is specified, callback shouldnot  be called');
    }

    if (massif.length === 1 && startValue === undefined || massif.length === 0 && startValue) {
      return startValue ? startValue : massif[0];
    }
  }

  static from(arg, callback, thisArg) {
    const resultMassive = new MyArray();

    if (callback && thisArg) {
      for (let i = 0; i < arg.length; i++) {
        resultMassive.push(callback.call(thisArg, arg[i], i, arg));
      }
    } else if (callback) {
      for (let i = 0; i < arg.length; i++) {
        resultMassive.push(callback(arg[i], i, arg));
      }
    } else {
      for (let i = 0; i < arg.length; i++) {
        resultMassive.push(arg[i]);
      }
    }
    return resultMassive;
  }

  toString() {
    let str = '';

    for (let i = 0; i < this.length; i++) {
      i === (this.length - 1) ? str += `${this[i]}` : str += `${this[i]},`;
    }
    return str;
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
    const massif = this;
    let maxValue = null;

    if (callback) {
      for (let i = 0; i < massif.length - 1; i++) {
        for (let j = 0; j < massif.length - 1; j++) {
          if (callback(massif[j], massif[j + 1]) > 0) {
            maxValue = massif[j];
            massif[j] = massif[j + 1];
            massif[j + 1] = maxValue;
          }
        }
      }
    } else {
      for (let i = 0; i < massif.length - 1; i++) {
        for (let j = 0; j < massif.length - 1; j++) {
          if (String(massif[j]) > String(massif[j + 1])) {
            maxValue = massif[j];
            massif[j] = massif[j + 1];
            massif[j + 1] = maxValue;
          }
        }
      }
    }
    return massif;
  }

  * [Symbol.iterator]() {
    for (let i = 0; i < this.length; i++) {
      yield this[i];
    }
  }
}

export default MyArray;

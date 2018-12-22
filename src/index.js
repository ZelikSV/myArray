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
  push(...a) {
    for (let i = 0; i < a.length; i++) {
      this[this.length] = a[i];
      this.length += 1;
    }
    return this.length;
  }

  pop() {
    if (this.length === 0) {
      return undefined;
    }
    delete this[this.length - 1];

    this.length -= this.length;
  }

  forEach(callback) {
    const mas = this;

    for (let i = 0; i < mas.length; i++) {
      callback(null, mas[i], i, mas);
    }
  }

  map(callback, thisArg) {
    const mas = this;
    const result = new MyArray();

    for (let i = 0; i < mas.length; i++) {
      result.push(callback.call(thisArg, mas[i], i, mas));
    }
    return result;
  }

  filter(callback, thisArg = this) {
    const mas = this;
    const result = new MyArray();

    for (let i = 0; i < mas.length; i++) {
      if (callback.call(thisArg, mas[i], i, mas)) {
        result.push(mas[i]);
      }
    }
    return result;
  }
  reduce(callback, startValue) {
    const mas = this;
    let result = startValue;

    for (let i = 0; i < mas.length; i++) {
      result = callback(null, result, mas[i], i, mas);
    }
    return result;
  }

  static from(arg) {
    const resultMassive = new MyArray();

    for (let i = 0; i < arg.length; i++) {
      resultMassive.push(arg[i]);
    }
    return resultMassive;
  }
  toString() {
    let str = '';

    for (let i = 0; i < this.length; i++) {
      str = `${str} + ${this[i]} + ', '`;
    }
    return str;
  }
  sort(callback) {
    const mas = this;
    let max = null;

    if (arguments.length === 1 && typeof callback === 'function') {
      for (let i = 0; i < mas.length - 1; i++) {
        for (let j = 0; j < mas.length - 1; j++) {
          if (!(callback(mas[j], mas[j + 1]) <= 0)) {
            max = mas[j];
            mas[j] = mas[j + 1];
            mas[j + 1] = max;
          }
        }
      }
    } else if (arguments.length === 0) {
      for (let i = 0; i < mas.length - 1; i++) {
        for (let j = 0; j < mas.length - i; j++) {
          if (
            !(String(mas[j]) > String(mas[j + 1]) &&
            callback(mas[j], mas[j + 1]) <= 0)) {
            max = mas[j];
            mas[j] = mas[j + 1];
            mas[j + 1] = max;
          }
        }
      }
    }
    return mas;
  }

  * [Symbol.iterator]() {
    const mas = this;

    for (let i = 0; i < mas.length; i++) {
      yield mas[i];
    }
  }
}

export default MyArray;

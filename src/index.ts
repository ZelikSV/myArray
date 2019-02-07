import { IMyArray } from './interfaceMyArray';

class MyArray <T> implements IMyArray<T>{
    [key: number]: T;
    length: number;
    constructor(...args: T[] | number[]) {
      if (args.length === 1 && typeof args[0] === 'number') {
        this.length = <number>args[0] ;
      } else {
        this.length = args.length;
        for (let i = 0; i < args.length; i++) {
          this[i] = <T>args[i];
        }
      }
    }

    push(...args: T[]):number{
        for (let i = 0; i < args.length; i++) {
          this[this.length] = args[i];
          this.length += 1;
        }
        return this.length;
      }
  
    pop(): T | undefined {
        const indexLast = this.length - 1;
    
        if (this.length > 0) {
          const lastElement = this[indexLast];
          delete this[indexLast];
          this.length -= 1;
          return lastElement;
        }
      }
  
      forEach(callback: (value: T, index: number, array: MyArray<T>) => void, thisArg?:T):void {
        for (let i = 0; i < this.length; i++) {
          callback.call(thisArg, this[i], i, this);
        }
      }
  
      map<U>(callback: (value: T, index: number, array: MyArray<T>) => U, thisArg?:any):MyArray<U> {
        const resultArray = new MyArray<U>();
    
        for (let i = 0; i < this.length; i++) {
          resultArray[i] = callback.call(thisArg, this[i], i, this);
          resultArray.length += 1;
        }
        return resultArray;
      }
  
    filter(callback: (value: T, index: number, array: MyArray<T>) => boolean, thisArg?:any):MyArray<T> {
        const resultArray = new MyArray<T>();
    
        for (let i = 0; i < this.length; i++) {
          if (callback.call(thisArg, this[i], i, this)) {
            resultArray[resultArray.length] = this[i];
            resultArray.length += 1;
          }
        }
        return resultArray;
      }
  
      find(callback: (value: T, index: number, array: MyArray<T>) => T, thisArg?:any):T | undefined{
        for (let i = 0; i < this.length; i++) {
          if (callback.call(thisArg, this[i], i, this)) {
            return this[i];
          }
        }
      }
  
      reduce(callback: (accumulator: T, value: T, index: number, array: MyArray<T>) => T, initialValue?: T): T{
        let result = initialValue === undefined ? this[0] : initialValue;
    
        if (this.length === 0 && initialValue === undefined) {
          throw new TypeError('Array is empty, InitialValue is specified, callback should not  be called');
        }
    
        if (initialValue !== undefined) {
          this[0] = callback(result, this[0], 0, this);
        }
    
        for (let i = 1; i < this.length; i++) {
          result = callback(result, this[i], i, this);
        }
        return result;
      }
  
      static from<T>(arg:any, callback: (value: T, index: number, array: MyArray<T>) => void, thisArg?:T): MyArray<T> {
        const resultArray = new MyArray<T>();
    
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
  
    slice(begin?:number, end?:number): MyArray<T>{
        const newArray = new MyArray<T>();
    
        const startValueIndex = begin < 0 ? this.length + begin : begin || 0;
        const endValueIndex = end < 0 ? this.length + end : end || this.length;
    
        for (let i = startValueIndex; i < endValueIndex; i++) {
          newArray[newArray.length] = this[i];
          newArray.length += 1;
        }
        return newArray;
      }
  
    sort(callback ?: (a: T, b: T) => number): this {
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
  
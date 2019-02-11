import MyArray from './index';

export interface IMyArray<T>{
    [key: number]: T;
    length: number;
    push(...args: T[]):number;
    pop():T | undefined;
    forEach(callback: (value: T, index: number, array: MyArray<T>) => void, thisArg?:T): void;
    map<U>(callback: (value: T, index: number, array: MyArray<T>) => U, thisArg?:any[]):MyArray<U>;
    filter(callback: (value: T, index: number, array: MyArray<T>) => boolean, thisArg?:any):MyArray<T>;
    find(callback: (value: T, index: number, array: MyArray<T>) => T, thisArg?:any):T | undefined;
    reduce(callback: (accumulator: T, value: T, index: number, array: MyArray<T>) => T, initialValue?: T):T;
    toString():string;
    slice(begin?:number, end?:number): MyArray<T>;
    sort(callbackFn: any):MyArray<T>;
  }
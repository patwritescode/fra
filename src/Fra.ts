import { isPrimitive } from "./helpers";

export interface IFra<S, T> {
    field<TKey extends keyof T>(fieldName: TKey, callback: (sourceValue: S) => T[TKey]): IFra<S, T>;
    map(sourceValue: S, targetInitial?: T): T;
}

export interface FieldMap<S, T> {
    fieldName: keyof T;
    callback: (sourceValue: Partial<T>) => T[keyof T];
}

class Fra<S, T> implements IFra<S, T> {
    private target: (new() => T) = null;
    private fields: FieldMap<S, T>[] = [];
    constructor(target: (new() => T)) {
        this.target = target;
    }
    public static createMap<S, T>(target: (new() => T)) {
        return new Fra<S, T>(target);
    }
    public field<TKey extends keyof T>(fieldName: TKey, callback: (sourceValue: S) => T[TKey]): IFra<S, T> {
        this.fields.push({
            fieldName,
            callback,
        });
        return this;
    }
    public map(sourceValue: S, targetInitial?: T): T {
        const instance = targetInitial !== null && targetInitial !== undefined ? targetInitial : new (this.target)();
        return this.build(instance, sourceValue);
    }
    private build(instance: T, sourceValue: Partial<T>): T {
        for (const key in sourceValue) {
            if (sourceValue.hasOwnProperty(key) && instance.hasOwnProperty(key) && isPrimitive(sourceValue[key])) {
                instance[key] = sourceValue[key];
            }
        }
        for (const field of this.fields) {
            instance[field.fieldName] = field.callback(sourceValue);
        }
        return instance;
    }
}

export default Fra;
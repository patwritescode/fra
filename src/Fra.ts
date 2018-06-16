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
    public field<TKey extends keyof T>(fieldName: TKey, callback: (sourceValue: S) => T[TKey]): Fra<S, T> {
        this.fields.push({
            fieldName,
            callback,
        });
        return this;
    }
    public map(sourceValue: S, initialTarget?: T): T {
        return this.innerMap(sourceValue, initialTarget);
    }
    private innerMap(sourceValue: Partial<T>, instance: T = new (this.target)()): T {
        for (const key in sourceValue) {
            const keyValue = sourceValue[key];
            if (sourceValue.hasOwnProperty(key) && instance.hasOwnProperty(key) && isPrimitive(keyValue)) {
                instance[key] = keyValue;
            }
        }
        for (const field of this.fields) {
            instance[field.fieldName] = field.callback(sourceValue);
        }
        return instance;
    }
}

export default Fra;
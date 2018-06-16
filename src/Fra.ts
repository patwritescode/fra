import { isPrimitive } from "./helpers";

/**
 * Represents the contract interface for Fra to make easily usable with libraries such as Inversify
 */
export interface IFra<S, T> {
    field<TKey extends keyof T>(fieldName: TKey, callback: (sourceValue: S) => T[TKey]): IFra<S, T>;
    map(sourceValue: S, targetInitial?: T): T;
    mapAll(sourceValues: S[]): T[];
}

/**
 * Represents a mapping of a field to a callback passing in the source value
 */
export interface FieldMap<S, T> {
    fieldName: keyof T;
    callback: (sourceValue: Partial<T>) => T[keyof T];
}

class Fra<S, T> implements IFra<S, T> {
    private target: (new() => T) = null;
    private fields: FieldMap<S, T>[] = [];
    /**
     * You can instantiate a new mapper or use the static createMap method
     * @param target output target class for the mapper. This is used to instantiate new objects on map.
     */
    constructor(target: (new() => T)) {
        this.target = target;
    }
    /**
     * Static helper method for instatiating a Fra object. Makes building off a chain nicer.
     * @param target same as constructor
     */
    public static createMap<S, T>(target: (new() => T)) {
        return new Fra<S, T>(target);
    }
    /**
     * Allows you to explicitly map fields. Good for changing names, mapping from nested objects or other mappers, etc
     * @param fieldName name of the field on the target object
     * @param callback method that passes in the sourceValue object and expects back a match to the field type
     */
    public field<TKey extends keyof T>(fieldName: TKey, callback: (sourceValue: S) => T[TKey]): Fra<S, T> {
        this.fields.push({
            fieldName,
            callback,
        });
        return this;
    }
    /**
     * Map the source object to an existing or new target object
     * @param sourceValue object to map from
     * @param initialTarget object to map to. if left empty a new one will be created from target.
     */
    public map(sourceValue: S, initialTarget?: T): T {
        if(sourceValue === null || sourceValue === undefined) {
            return null;
        }
        return this.innerMap(sourceValue, initialTarget);
    }
    /**
     * Helper wrapper for mapping array of source objects to an array of new targets
     * @param sourceValues array of objects to map from
     */
    public mapAll(sourceValues: S[]): T[] {
        return Array.isArray(sourceValues)
            ? sourceValues.map(sourceValue => this.map(sourceValue))
            : null;
    }
    /**
     * Performs the mapping logic
     * @param sourceValue object to map from
     * @param instance object to map to or create a new one
     */
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
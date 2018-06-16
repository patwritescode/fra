/**
 * Determines if a passed in value is a primitive or complex type
 * @param val any potential primitive or not primitive
 */
export const isPrimitive = (val: any) => Object(val) !== val;
/**
 * Type helper that returns the type of the first argument of a givin function
 */
export type FirstArgument<T> = T extends (arg1: infer U, ...args: any[]) => any ? U : any;
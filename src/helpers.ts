export const isPrimitive = (val: any) => Object(val) !== val;
export type FirstArgument<T> = T extends (arg1: infer U, ...args: any[]) => any ? U : any;
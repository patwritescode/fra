import Fra from "./Fra";
import { FirstArgument } from "./helpers";

export const link = <T, S extends Fra<any, T>>(target: (new() => T), sources: S[]) => {
    return (...values: FirstArgument<S["map"]>[]) => {
        const instance = new target();
        return sources.reduce((prev, curr, index) => curr.map(values[index], prev), instance)
    }
}
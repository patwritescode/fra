import Fra from "./Fra";
import { FirstArgument } from "./helpers";

/**
 * Compose multiple mappers together to return one object
 * @param target class to instantiate and infers the acceptable types of Fra mappers
 * @param sources mappers that match any source type to the target type
 */
export const link = <T, S extends Fra<any, T>>(target: (new() => T), sources: S[]) => {
    /**
     * source objects to map to the target
     */
    return (...values: FirstArgument<S["map"]>[]) => {
        const instance = new target();
        return sources.reduce((prev, curr, index) => curr.map(values[index], prev), instance)
    }
}
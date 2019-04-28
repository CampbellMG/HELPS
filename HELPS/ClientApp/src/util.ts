export function isUndefined(object: Object | undefined): boolean {
    return object === undefined;
}

export function isEmpty<T>(object: string | T[]): boolean {
    return object.length === 0;
}

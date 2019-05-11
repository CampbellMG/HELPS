
export function isEmpty<T>(object: string | T[]): boolean {
    return object.length === 0;
}

export const NOOP = () => ({});

export const fetchRequest = <T>(
    path: string,
    method: 'POST' | 'GET' | 'PUT' | 'DELETE',
    token: string,
    body: T,
    includeJsonContentType: boolean = false
) => {
    const options = includeJsonContentType ?
        ({
            method: method,
            headers: new Headers({
                'Authorization': `Bearer ${token}`,
                'content-type': 'application/json'
            })
        }) :
        ({
            method: method,
            headers: new Headers({
                'Authorization': `Bearer ${token}`
            })
        });
    return fetch(path, options).then((result) => result.json());
};


export function isEmpty<T>(object: string | T[]): boolean {
    return object.length === 0;
}

export const NOOP = () => ({});

export const fetchRequest = (
    path: string,
    method: 'POST' | 'GET' | 'PUT' | 'DELETE',
    token: string,
    body: {} = {},
    includeJsonContentType: boolean = false
): any => {
    const options = includeJsonContentType ?
        ({
            method: method,
            headers: new Headers({
                'Authorization': `Bearer ${token}`,
                'content-type': 'application/json'
            }),
            body: JSON.stringify(body)
        }) :
        ({
            method: method,
            headers: new Headers({
                'Authorization': `Bearer ${token}`
            })
        });
    return fetch(path, options).then((result) => {
        if (result.ok) {
            return Promise.resolve(result.json());
        } else {
            return Promise.reject(`Request failed: ${result.statusText}`);
        }
    });
};

export const NO_MATCH: number = -1;

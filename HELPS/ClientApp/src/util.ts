import {Identifiable} from './types/model/Identifiable';
import {LS_STORAGE_KEY} from './store/actions/AuthActions';

export function isEmpty<T>(object: string | T[]): boolean {
    return object.length === 0;
}

export const NOOP = () => ({});

export const fetchRequest = (
    path: string,
    method: 'POST' | 'GET' | 'PUT' | 'DELETE',
    token?: string,
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

function fetchToken(): string | null {
    return localStorage.getItem(LS_STORAGE_KEY);
}

export const authenticatedFetch = async (
    path: string,
    method: 'POST' | 'GET' | 'PUT' | 'DELETE' = 'GET',
    body: {} = {},
    includeJsonContentType: boolean = false
): Promise<any> => {
    const token = fetchToken();

    if (!token) {
        throw Error('Missing token');
    }

    const options = includeJsonContentType ?
        {
            method: method,
            headers: new Headers({
                'Authorization': `Bearer ${token}`,
                'content-type': 'application/json'
            }),
            body: JSON.stringify(body)
        } :
        {
            method: method,
            headers: new Headers({
                'Authorization': `Bearer ${token}`
            })
        };

    const result = await fetch(path, options);
    if (result.ok) {
        return result.json();
    }

    throw Error(`Request failed: ${result.statusText}`);
};

export const NO_MATCH: number = -1;

export const getIdentifiableIndexById = <T extends Identifiable>(itemsFetcher: () => T[], id: number) =>
    itemsFetcher().findIndex((item) => item.id === id);

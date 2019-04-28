import {Email} from '../model/Email';

export interface EmailState {
    emails: Email[]
    isLoading: boolean
    error?: string
}
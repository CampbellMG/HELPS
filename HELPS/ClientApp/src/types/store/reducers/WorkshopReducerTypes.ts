import {Workshop} from '../../model/Workshop';

export interface WorkshopState {
    isLoading: boolean,
    workshops: Workshop[]
    userWorkshops: Workshop[]
    error?: string
}
import {Workshop, Skill} from '../../model/Workshop';

export interface AdminWorkshopState {
    workshops: Workshop[],
    skills: Skill[]
}
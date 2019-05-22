import { Skill } from '../model/Skill';

export enum SkillActionTypes {
    EDIT = 'SKILL_ACTION_UPDATE_NAME',
    ERROR = 'SKILL_ERROR',
    RECEIVE = 'RECEIVE_SKILLS',
    SELECT = 'SKILL_ACTION_SELECT'
}

export interface SkillAction {
    type: SkillActionTypes;
    skill?: Skill;
    error?: string;
    skills?: Skill[];
}
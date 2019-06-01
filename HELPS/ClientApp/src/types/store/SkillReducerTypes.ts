import { Skill } from '../model/Skill';
import { Editable } from '../util/Editable';

export interface SkillState extends Editable {
    skills: Skill[];
    searchTerm?: string;
    selectedSkill: Skill;
    newSkillTitle: string;
    error?: string;
    filter: string;
}
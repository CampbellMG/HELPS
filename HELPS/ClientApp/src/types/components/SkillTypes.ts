import { Skill } from '../model/Skill';
import { Editable } from '../util/Editable';

export interface SkillStateProps extends Editable {
    skills: Skill[];
    selectedSkill: Skill;
}

export interface SkillDispatchProps {
    deleteSkill: (skill: Skill) => void;
    fetchSkills: () => void;
    selectSkill: (skill: Skill) => void;
    saveSkill: (id: number, title: string, isNewMode: boolean) => void;
}

export interface SkillProps extends SkillStateProps, SkillDispatchProps {}
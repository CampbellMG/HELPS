import { SkillActionTypes, SkillAction } from '../../types/store/SkillActionTypes';
import { Dispatch } from 'react';
import { fetchToken } from './AuthActions';
import { Skill } from '../../types/model/Skill';
import { fetchRequest } from '../../util';

const NO_TOKEN_MESSAGE: string = 'No token, have you authenticated?',
    API_SKILL_PATH = `api/skills`;

const skillError = (message: string): SkillAction => ({
    type: SkillActionTypes.ERROR,
    error: message
});

const receiveSkills = (skills: Skill[]): SkillAction => ({
    type: SkillActionTypes.RECEIVE,
    skills
});

const selectSkillAction = (skill: Skill): SkillAction => ({
    type: SkillActionTypes.SELECT,
    skill
});

export const fetchSkills = () => async (dispatch: Dispatch<SkillAction>) => {
    const token = fetchToken();
    if (token === null) {
        dispatch(skillError(NO_TOKEN_MESSAGE));
    } else {
        try {
            const skills: Skill[] = await fetchRequest(
                API_SKILL_PATH,
                'GET',
                token
            );
            dispatch(receiveSkills(skills));
        } catch (e) {
            dispatch(skillError(`Error fetching skills list`));
        }
    }
};

export const deleteSkill = (skill: Skill) => async (dispatch: Dispatch<any>) => {
    const token = fetchToken();
    if (token === null) {
        dispatch(skillError(NO_TOKEN_MESSAGE));
    } else {
        try {
            await fetch(`${API_SKILL_PATH}/${skill.id}`, {
                method: 'DELETE',
                headers: new Headers({
                    'Authorization': `Bearer ${token}`
                })
            });
        } catch (e) {
            dispatch(skillError(`Error deleting skill - ${e}`));
        }
    }
};

export const updateSkillName = (skillId: number, newTitle: string, isNewMode: boolean) => async (dispatch: Dispatch<SkillAction>) => {
    const token = fetchToken();

    if (token === null) {
        dispatch(skillError(NO_TOKEN_MESSAGE));
    } else {
        try {
            if (isNewMode) {
                await fetchRequest(
                    `${API_SKILL_PATH}`,
                    'POST',
                    token,
                    { title: newTitle },
                    true
                );
            } else {
                const updatedSkill = { id: skillId, title: newTitle };
                await fetchRequest(
                    `${API_SKILL_PATH}/${skillId}`,
                    'PUT',
                    token,
                    updatedSkill,
                    true
                );
            }
        } catch (e) {
            dispatch(skillError(`Error updating skill title: ${e}`));
        }
    }
};

export const selectSkill = (skill: Skill) => async (dispatch: Dispatch<SkillAction>) => dispatch(selectSkillAction(skill));

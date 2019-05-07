import {Dispatch} from 'redux';
import {LS_STORAGE_KEY} from './AuthActions';
import {AdminWorkshopAction, AdminWorkshopActionType} from '../../types/store/actions/AdminWorkshopActionTypes';
import {Workshop} from '../../types/model/Workshop';


const receiveWorkshops = (workshops: Workshop[]): AdminWorkshopAction => ({
    type: AdminWorkshopActionType.RECEIVE_WORKSHOPS,
    payload: workshops
});

export const addSkill = (skill: string): AdminWorkshopAction => ({
    type: AdminWorkshopActionType.ADD_SKILL,
    payload: skill //set string that was typed in (also pass this string as variable above)
});


import { Room } from '../model/Room';
import { Editable } from '../util/Editable';
import {Report} from '../model/Report';

export interface ReportState {
    reports: Report[]
    data: any[]
    error?: string
}
import { Identifiable } from './Identifiable';

export interface ExtraReportFieldOption {
    identifier: string,
    value: string
}

export interface ExtraReportField {
    identifier: string,
    title: string,
    options: ExtraReportFieldOption[]
}

export interface Report extends Identifiable {
    title: string;
    extraFields: ExtraReportField[]
}
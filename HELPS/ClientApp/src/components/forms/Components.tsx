import * as React from 'react';
import Form from 'react-bootstrap/Form';
import moment from 'moment';
import Datetime from 'react-datetime';
import RoomList from './lists/RoomList';
import AdvisorList from './lists/AdvisorList';
import StudentList from './lists/StudentList';
import SkillList from './lists/SkillList';
import ReportList from './lists/ReportList';

export const TextArea = (props: any) => <Form.Control as='textarea' {...props} value={props.input.value}
                                                      onChange={props.input.onChange}/>;
export const TextInput = (props: any) => <Form.Control {...props} value={props.input.value}
                                                       onChange={props.input.onChange}/>;
export const BooleanInput = (props: any) => <Form.Check {...props} value={props.input.value}
                                                        onChange={props.input.onChange}/>;
export const RoomListInput = (props: any) => <RoomList {...props} value={props.input.value}
                                                       onChange={props.input.onChange}/>;
export const AdvisorListInput = (props: any) => <AdvisorList {...props} value={props.input.value}
                                                             onChange={props.input.onChange}/>;
export const StudentListInput = (props: any) => <StudentList {...props} value={props.input.value}
                                                             onChange={props.input.onChange}/>;
export const SkillListInput = (props: any) => <SkillList {...props} value={props.input.value}
                                                         onChange={props.input.onChange}/>;
export const DatePickerInput = (props: any) => <Datetime {...props} value={moment(props.input.value)}
                                                         dateFormat='DD/MM/YYYY'
                                                         onChange={props.input.onChange}/>;
export const ReportListInput = (props: any) => <ReportList {...props} value={props.input.value}
                                                           onChange={props.input.onChange}/>;
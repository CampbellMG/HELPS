import {connect} from 'react-redux';
import * as React from 'react';
import {Component} from 'react';
import {UserDispatchProps, UserProps, UserState, UserStateProps} from '../../types/components/UserTypes';
import {AppState} from '../../types/store/StoreTypes';
import {retrieveUser, updateUser} from '../../store/actions/UserActions';
import UserDetailsForm from './UserDetailsForm';
import Button from 'react-bootstrap/Button';
import {submit} from 'redux-form';
import {ThunkDispatch} from 'redux-thunk';
import EditorList from '../editorlist/EditorList';
import {Student} from '../../types/model/Student';

class User extends Component<UserProps, UserState> {

    private static getDisclaimer() {
        return (
            <div>
                <p>
                    The collected information (after removing any of your personal details) may also
                    be used to:
                </p>
                <ul>
                    <li>
                        analyse demographics of HELPS students and the use of HELPS programs in
                        order to find better ways to assist you; and/or,
                    </li>
                    <li>
                        report to the University community on how HELPS programs are utilised
                    </li>
                </ul>
                <p>
                    Please be advised that any information you provide:</p>
                <ul>
                    <li>
                        will be kept in the system for the purposes outlined above; and
                    </li>
                    <li>
                        will not be disclosed unless required or permitted by law.
                    </li>
                </ul>

            </div>
        );
    }

    private get filteredStudents(): Student[] {
        let {students, filter} = {...this.state, ...this.props};
        if (!students) return [];

        filter = filter.trim().toLowerCase();

        if (filter.length === 0) {
            return students;
        }

        return students.filter(student => (
            student.id.toString().toLowerCase().indexOf(filter) !== -1 ||
            student.name.toLowerCase().indexOf(filter) !== -1
        ));
    }

    constructor(props: UserProps) {
        super(props);

        this.state = {
            filter: ''
        };
    }

    componentDidMount() {
        if (this.props.authenticated) {
            this.props.loadUserDetails(this.props.isAdmin);
        }
    }

    componentDidUpdate(prevProps: Readonly<UserProps>, prevState: Readonly<UserState>, snapshot?: any): void {
        if (this.props.students && !this.state.selectedStudent) {
            this.setState({selectedStudent: this.props.students[0]});
        }
    }

    render() {
        const {isAdmin, error, loading} = this.props;
        if (!isAdmin) {
            return (
                <div className='row h-100 overflow-auto'>
                    {error && <p>{error}</p>}
                    <div className='col-lg-2 border-right m-3'>
                        {User.getDisclaimer()}
                        <Button className='w-100'
                                disabled={loading}
                                onClick={this.props.submit}>
                            Save
                        </Button>
                    </div>
                    <div className='col m-3'>
                        {this.getUserDetails()}
                    </div>
                </div>
            );
        }

        return (
            <EditorList items={this.filteredStudents}
                        activeItem={this.state.selectedStudent}
                        onFilter={filter => this.setState({filter})}
                        onSelect={selectedStudent => this.setState({selectedStudent})}
                        keyExtractor={student => student.id.toString()}
                        titleExtractor={student => `[${student.id}] ${student.name}`}>
                {this.getUserDetails()}
            </EditorList>
        );
    }

    private getUserDetails() {
        return (
            <div className='bg-white'>
                <UserDetailsForm onSubmit={this.props.updateUser}
                                 initialValues={this.state.selectedStudent}/>
            </div>
        );
    }
}

const mapStateToProps = (state: AppState): UserStateProps => ({
    authenticated: state.auth.authenticated,
    students: state.user.user,
    error: state.user.error,
    loading: state.user.isLoading,
    isAdmin: state.auth.isAdmin
});

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>): UserDispatchProps => ({
    loadUserDetails: isAdmin => dispatch(retrieveUser(isAdmin)),
    updateUser: student => dispatch(updateUser(student)),
    submit: () => dispatch(submit('user_details'))
});

export default connect<UserStateProps, UserDispatchProps, {}, AppState>(
    mapStateToProps,
    mapDispatchToProps
)(User);

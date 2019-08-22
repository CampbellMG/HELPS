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
import {fetchMessages} from '../../store/actions/MessageActions';

class User extends Component<UserProps, UserState> {

    private get filteredStudents(): Student[] {
        let {students, filter} = {...this.state, ...this.props};
        if (!students) return [];

        filter = filter.trim().toLowerCase();

        if (filter.length === 0) {
            return students;
        }

        return students.filter(student => (
            student.id.toString().toLowerCase().includes(filter) ||
            student.name.toLowerCase().includes(filter)
        ));
    }

    constructor(props: UserProps) {
        super(props);

        this.state = {
            filter: ''
        };
    }

    componentDidMount() {
        this.props.retrieveMessages()
        if (this.props.authenticated) {
            this.props.loadUserDetails();
        }
    }

    render() {
        const {isAdmin, error, loading, messages} = this.props;
        if (!isAdmin) {
            return (
                <div className='row h-100 overflow-auto'>
                    {error && <p>{error}</p>}
                    <div className='col-lg-2 border-right m-3'>
                        {
                            messages.informationCollection &&
                            <div dangerouslySetInnerHTML={{__html: messages.informationCollection}}/>
                        }
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
            <UserDetailsForm onSubmit={this.props.updateUser}
                             isAdmin={this.props.isAdmin}
                             initialValues={this.state.selectedStudent}/>
        );
    }
}

const mapStateToProps = (state: AppState): UserStateProps => ({
    authenticated: state.auth.authenticated,
    students: state.user.user,
    error: state.user.error,
    loading: state.user.isLoading,
    isAdmin: state.auth.isAdmin,
    messages: state.message.indexedMessages
});

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>): UserDispatchProps => ({
    loadUserDetails: () => dispatch(retrieveUser()),
    updateUser: student => dispatch(updateUser(student)),
    submit: () => dispatch(submit('user_details')),
    retrieveMessages: () => dispatch(fetchMessages())
});

export default connect<UserStateProps, UserDispatchProps, {}, AppState>(
    mapStateToProps,
    mapDispatchToProps
)(User);

import * as React from 'react';
import {Component} from 'react';
import {connect} from 'react-redux';
import {
    AdvisorDispatchProps,
    AdvisorFormData,
    AdvisorProps,
    AdvisorState,
    AdvisorStateProps
} from '../../types/components/AdvisorTypes';
import {AppState} from '../../types/store/StoreTypes';
import {ThunkDispatch} from 'redux-thunk';
import {addAdvisor, deleteAdvisor, retrieveAdvisorList, updateAdvisor} from '../../store/actions/AdvisorActions';
import AdvisorForm from './AdvisorForm';
import EditorList from '../editorlist/EditorList';
import {Advisor} from '../../types/model/Advisor';

class AdvisorEdit extends Component<AdvisorProps, AdvisorState> {

    private static readonly EMPTY_ADVISOR: Advisor = {
        id: 0,
        email: '',
        firstName: '',
        lastName: '',
        isActive: false
    };

    private get filteredAdvisors(): Advisor[] {
        let {advisors, filter} = {...this.state, ...this.props};
        if (!advisors) return [];

        filter = filter.trim().toLowerCase();

        if (filter.length === 0) {
            return advisors;
        }

        return advisors.filter(advisor => (
            advisor.id.toString().toLowerCase().includes(filter) ||
            advisor.firstName.toLowerCase().includes(filter) ||
            advisor.lastName.toLowerCase().includes(filter)
        ));
    }

    constructor(props: AdvisorProps) {
        super(props);

        this.state = {
            filter: ''
        };
    }

    componentDidMount(): void {
        this.props.loadAdvisorList();
    }

    componentWillReceiveProps(props: AdvisorProps): void {
        const advisors: Advisor[] = props.advisors;
        if (advisors.length > 0) {
            this.setState({ selectedAdvisor: advisors[0] });
        }
    }

    render() {
        return (
            <EditorList items={this.filteredAdvisors}
                        activeItem={this.state.selectedAdvisor}
                        onFilter={filter => this.setState({filter})}
                        onAdd={() => this.setState({selectedAdvisor: AdvisorEdit.EMPTY_ADVISOR})}
                        onSelect={selectedAdvisor => this.setState({selectedAdvisor})}
                        keyExtractor={advisor => advisor.id.toString()}
                        titleExtractor={advisor => `[${advisor.id}] ${advisor.firstName} ${advisor.lastName}`}>

                <div className='col-lg-10 mx-auto flex-fill d-flex flex-column justify-content-center'>
                    <AdvisorForm initialValues={{...this.state.selectedAdvisor, delete: false}}
                                 onSubmit={this.onSubmit}/>
                </div>
            </EditorList>
        );
    }

    private onSubmit = (advisorFormData: AdvisorFormData) => {
        if (advisorFormData.delete) {
            return this.props.deleteAdvisor(advisorFormData);
        }

        if (advisorFormData.id === AdvisorEdit.EMPTY_ADVISOR.id) {
            return this.props.addAdvisor(advisorFormData);
        }

        this.props.updateAdvisor(advisorFormData);
    };
}

const mapStateToProps = (state: AppState): AdvisorStateProps => ({
    authenticated: state.auth.authenticated,
    advisors: state.advisors.advisors,
    error: state.advisors.error
});

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>): AdvisorDispatchProps => ({
    loadAdvisorList: () => dispatch(retrieveAdvisorList()),
    deleteAdvisor: advisor => dispatch(deleteAdvisor(advisor)),
    updateAdvisor: advisor => dispatch(updateAdvisor(advisor)),
    addAdvisor: advisor => dispatch(addAdvisor(advisor))
});

export default connect<AdvisorStateProps, AdvisorDispatchProps, {}, AppState>(
    mapStateToProps,
    mapDispatchToProps
)(AdvisorEdit);
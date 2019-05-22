import * as React from 'react';
import {Component} from 'react';
import {
    SkillListDispatchProps,
    SkillListProps,
    SkillListStateProps
} from '../../../types/components/WorkshopRegistrationTypes';
import {Form} from 'react-bootstrap';
import {connect} from 'react-redux';
import {AppState} from '../../../types/store/StoreTypes';
import {ThunkDispatch} from 'redux-thunk';
import {fetchSkills} from '../../../store/actions/SkillActions';

class SkillList extends Component<SkillListProps> {

    componentDidMount(): void {
        this.props.loadSkills();
    }

    render() {
        return (
            <Form.Control as='select' {...this.props}>
                <option value=''/>
                {this.props.skills.map(skill => (
                    <option value={skill.id} key={skill.id}>{skill.title}</option>
                ))}
            </Form.Control>
        );
    }
}

const mapStateToProps = (state: AppState): SkillListStateProps => ({
    skills: state.skill.skills
});

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>): SkillListDispatchProps => ({
    loadSkills: () => dispatch(fetchSkills())
});

export default connect<SkillListStateProps, SkillListDispatchProps, {}, AppState>(
    mapStateToProps,
    mapDispatchToProps
)(SkillList);
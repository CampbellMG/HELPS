import * as React from 'react';
import {Form, Button} from 'react-bootstrap';
import {connect} from 'react-redux';
import {ThunkDispatch} from 'redux-thunk';
import {SkillStateProps, SkillDispatchProps, SkillProps} from '../../types/components/SkillTypes';
import {AppState} from '../../types/store/StoreTypes';
import {deleteSkill, fetchSkills, updateSkillName, selectSkill} from '../../store/actions/SkillActions';
import {Skill} from '../../types/model/Skill';
import {SkillState} from '../../types/store/SkillReducerTypes';
import {editOrSave, deleteEntity, renderEditButtons, getHiddenProperty} from '../../types/util/Editable';
import EditorList from '../editorlist/EditorList';

class SkillEdit extends React.Component<SkillProps, SkillState> {

    constructor(props: Readonly<SkillProps>) {
        super(props);
        this.props.fetchSkills();
        this.state = {
            skills: props.skills,
            selectedSkill: props.selectedSkill,
            editing: false,
            filter: '',
            newSkillTitle: props.selectedSkill.title,
            isNewMode: false
        };
    }

    componentWillReceiveProps(newProps: SkillProps) {
        this.setState({
            selectedSkill: newProps.selectedSkill,
            newSkillTitle: newProps.selectedSkill.title,
            isNewMode: newProps.isNewMode,
            editing: newProps.editing
        });
    }

    render(): React.ReactNode {
        const filteredSkills: Skill[] = [];
        this.props.skills.forEach((skill) => {
            if (skill.title.includes(this.state.filter)) {
                filteredSkills.push(skill);
            }
        });

        return (
            <EditorList items={filteredSkills}
                        activeItem={this.state.selectedSkill}
                        onSelect={this.selectSkill}
                        keyExtractor={(skill) => skill.id.toString()}
                        onFilter={newFilter => this.setState({filter: newFilter})}
                        titleExtractor={(skill) => skill.title}
                        onAdd={this.newSkill}>
                {this.renderSkillEditor()}
            </EditorList>
        );
    }

    private renderSkillEditor = () => {
        return (
            <div className='col-lg-5 mx-auto flex-fill d-flex flex-column justify-content-center'>
                <Form.Control type='text'
                              value={this.state.newSkillTitle}
                              disabled={!this.state.editing}
                              onChange={(e: any) => this.editTitle(e)}/>

                {this.renderEditButtons()}

                <Button style={getHiddenProperty(this.state)}
                        onClick={() => this.deleteSkill()}
                        className='w-100 mt-2'>
                    Delete
                </Button>

            </div>
        );
    };

    private newSkill = (): void => {
        this.setState({
            newSkillTitle: 'New Skill',
            editing: true,
            isNewMode: true
        });
    };

    private editTitle = (e: any): void => {
        this.setState({newSkillTitle: e.target.value});
    };

    private renderEditButtons = (): JSX.Element =>
        renderEditButtons(
            this.state,
            this.editOrSaveIsDisabled(),
            this.cancelOrCommenceEdit,
            this.editOrSave
        );

    private editOrSave = (): void => {
        editOrSave(
            this.state,
            `Edit Skill Title`,
            () => {
                this.props.saveSkill(this.state.selectedSkill.id, this.state.newSkillTitle, this.state.isNewMode);
                this.props.fetchSkills();
            },
            () => this.cancelOrCommenceEdit()
        );
    };

    private editOrSaveIsDisabled = (): boolean =>
        this.state.editing && this.state.selectedSkill.title === this.state.newSkillTitle;

    private cancelOrCommenceEdit = (): void => {
        if (this.state.editing) {
            this.setState({newSkillTitle: this.state.selectedSkill.title});
        }
        this.setState({editing: !this.state.editing});
    };

    private deleteSkill = () => {
        deleteEntity(
            'Skill',
            (skill: Skill) => {
                this.props.deleteSkill(skill);
                this.props.fetchSkills();
            },
            () => this.state.selectedSkill
        );
    };

    private selectSkill = (skill: Skill): void => {
        this.props.selectSkill(skill);
    };
}

const mapStateToProps = (state: AppState): SkillStateProps => {
    return ({
        skills: state.skill.skills,
        editing: state.skill.editing,
        selectedSkill: state.skill.selectedSkill,
        isNewMode: state.skill.isNewMode
    });
};

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>): SkillDispatchProps => ({
    deleteSkill: (skill: Skill) => dispatch(deleteSkill(skill)),
    fetchSkills: () => dispatch(fetchSkills()),
    selectSkill: (skill: Skill) => dispatch(selectSkill(skill)),
    saveSkill: (id: number, newName: string, isNewMode: boolean) => dispatch(updateSkillName(id, newName, isNewMode))
});

export default connect<SkillStateProps, SkillDispatchProps, {}, AppState>(
    mapStateToProps,
    mapDispatchToProps
)(SkillEdit);
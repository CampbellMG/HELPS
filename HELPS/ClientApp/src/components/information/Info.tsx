import * as React from 'react';
import {Component} from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import ListGroupItem from 'react-bootstrap/ListGroupItem';
import {
    InfoDispatchProps,
    InfoProps,
    InfoState,
    InfoStateProps
} from '../../types/components/InfoTypes';
import {AppState} from '../../types/store/StoreTypes';
import {ThunkDispatch} from 'redux-thunk';
import {fetchMessages} from '../../store/actions/MessageActions';
import {connect} from 'react-redux';

class Info extends Component<InfoProps, InfoState> {

    private get contentHTML() {
        const HTML = this.state.activeContent === 'PROGRAMS' ? this.props.messages.programs : this.props.messages.FAQ;
        return HTML ? HTML : '';
    }

    constructor(props: InfoProps) {
        super(props);

        this.state = {
            activeContent: 'PROGRAMS'
        };
    }

    componentDidMount(): void {
        this.props.fetchMessages();
    }

    render() {
        return (
            <div className='row h-100 overflow-auto'>
                <div className='col-lg-2 border-right'>
                    <ListGroup className='m-3 sticky-top'>
                        <ListGroupItem onClick={this.showActivities}
                                       style={{cursor: 'pointer'}}
                                       active={this.state.activeContent === 'PROGRAMS'}>
                            Programs
                        </ListGroupItem>
                        <ListGroupItem onClick={this.showFAQ}
                                       style={{cursor: 'pointer'}}
                                       active={this.state.activeContent === 'FAQ'}>
                            FAQ
                        </ListGroupItem>
                    </ListGroup>
                </div>
                <div className='col m-3' dangerouslySetInnerHTML={{__html: this.contentHTML}}/>
            </div>
        );
    }

    private showActivities = () => this.setState({activeContent: 'PROGRAMS'});
    private showFAQ = () => this.setState({activeContent: 'FAQ'});
}

const mapStateToProps = (state: AppState): InfoStateProps => ({
    messages: state.message.indexedMessages
});

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>): InfoDispatchProps => ({
    fetchMessages: () => dispatch(fetchMessages())
});

export default connect<InfoStateProps, InfoDispatchProps, {}, AppState>(
    mapStateToProps,
    mapDispatchToProps
)(Info);
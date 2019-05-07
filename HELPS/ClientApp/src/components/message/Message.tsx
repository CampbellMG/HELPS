import { Component, ReactElement, ReactNode } from 'react';
import * as React from 'react';
import { connect } from 'react-redux';
import { AppState } from '../../types/store/StoreTypes';
import { InputGroup, Form, ListGroup } from 'react-bootstrap';
import { MessageStateProps, MessageDispatchProps, MessageProps } from '../../types/components/MessageTypes';
import { ListGroupItem } from 'react-bootstrap';
import { fetchMessages } from '../../store/actions/MessageActions';
import { ThunkDispatch } from 'redux-thunk';
import { MessageState } from '../../types/store/MessageReducerTypes';
import { MessageModel } from '../../types/model/Message';
import { isUndefined } from 'util';

export class Message extends Component<MessageProps, MessageState> {

    constructor() {
        // this.props.fetchMessages();

        // TEST CODE ONLY
        super({} as any);
        this.state = {
            messages: [
                { id: 1, title: 'ROOM CHANGE ALERT', content: '<h1>ALERT</h1><p1>Room changed b1 to b2</p1>' },
                { id: 2, title: 'New Workshop', content: '<h1>New Workshop</h1><p1>New workshop announced</p1>' }
            ]
        };
        console.error('didmount');
        // TEST CODE ONLY

    }

    render(): ReactNode {
        return (
            <div>
                <div className='col-lg-2 border-right'>
                    <div>
                        <InputGroup className='align-self-stretch d-flex pb-3 sticky-top right-pad'>
                            <Form.Control type='text'
                                className='flex-fill'
                                placeholder='Search...'
                                onChange={(e: any) => this.updateSearch(e)}
                            />
                        </InputGroup>
                    </div>

                    <ListGroup className='m-3 sticky-top'>
                        {this.makeMessagesDisplayList()}
                    </ListGroup>
                </div>

                <div className='col m-3'>
                    <div className='d-flex h-100 justify-content-center'>
                        <div className='align-self-center w-50 h-50'>
                            <div className='shadow bg-white d-flex h-100 justify-content-center flex-column login-container'>
                            <h1>ALERT</h1>
                            </div>
                        </div>
                    </div>
                </div >
            </div>);

    }

    private updateSearch(e: any): void {

    }

    private makeMessagesDisplayList(): ReactElement[] {
        const messageElements: ReactElement[] = [];
        // const messages = this.props.messages;
        const messages = this.state.messages;
        messages.forEach((message) => {
            messageElements.push(<ListGroupItem
                key={message.id}
                style={{ cursor: 'pointer' }}
                active={this.isActive(message)}
                onClick={(e: any) => this.selectMessage(message)}>
                {message.title}
            </ListGroupItem>);
        });
        return messageElements;
    }

    private isActive = (message: MessageModel): boolean => {
        return !isUndefined(this.state.selectedMessage) && this.state.selectedMessage.id === message.id;
    };

    private selectMessage = (message: MessageModel): void => {
        this.setState({ selectedMessage: message });
    };
}

const mapStateToProps = (state: AppState): MessageStateProps => {
    console.error('mapping', state.message.messages);
    return { messages: state.message.messages };
};

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>): MessageDispatchProps =>
    ({
        fetchMessages: () => dispatch(fetchMessages())
    });

export default connect<MessageStateProps, MessageDispatchProps, any, AppState>(
    mapStateToProps,
    mapDispatchToProps
)(Message);

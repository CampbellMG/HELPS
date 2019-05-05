import { Component, ReactElement } from 'react';
import { connect } from 'react-redux';
import { AppState } from '../../types/store/StoreTypes';
import { InputGroup, Form, ListGroup } from 'react-bootstrap';
import { MessageStateProps, MessageDispatchProps, MessageProps } from '../../types/components/MessageTypes';
import { ListGroupItem } from 'react-bootstrap';

export class Message extends Component<MessageProps> {
    render(): React.ReactNode {
        return (<div><div className='col-lg-2 border-right'>
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
        </div>);

    }

    private updateSearch(e: any): void {
    }

    private makeMessagesDisplayList(): ReactElement[] {
        const messageElements: ReactElement[] = [];
        this.props.messages.forEach((message) => {
            messageElements.push(<ListGroupItem
                key={message.id}>
            {message.title}
            </ListGroupItem>);
        });
        return messageElements;
    }
}

const mapStateToProps = (state: AppState): MessageStateProps => ({ messages: state.message.messages });

const mapDispatchToProps = () => ({});

export default connect<MessageStateProps, MessageDispatchProps, any, AppState>({
    mapStateToProps,
    mapDispatchToProps
} as any)(Message);
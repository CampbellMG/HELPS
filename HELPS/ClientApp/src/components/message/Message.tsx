import { Component, ReactElement } from 'react';
import { connect } from 'react-redux';
import { AppState } from '../../types/store/StoreTypes';
import { InputGroup, Form, ListGroup } from 'react-bootstrap';
import { MessageStateProps, MessageDispatchProps } from '../../types/components/MessageTypes';

export class Message extends Component {
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
        const messageElements: ReactElement[] = [];
        this.
    }

    private makeMessagesDisplayList(): ReactElement[] {
        return [];
    }
}

const mapStateToProps = (state: AppState) => { messages: state.message.message };

export default connect<MessageStateProps, MessageDispatchProps, any, AppState>({
    mapStateToProps
} as any)(Message);
import * as React from 'react';
import { Component } from 'react';
import ListGroupItem from 'react-bootstrap/ListGroupItem';
import ListGroup from 'react-bootstrap/ListGroup';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import { Form } from 'react-bootstrap';
import { EditorListProps } from '../../types/components/EditorListTypes';
import { isUndefined, isNull } from 'util';
import { NOOP } from '../../util';

export default class EditorList<T> extends Component<EditorListProps<T>> {

    render() {
        return (
            <div className='row h-100 overflow-auto'>
                <div className='col-lg-2 border-right'>
                    {this.renderList()}
                </div>
                <div className='col m-3 d-flex flex-column'>
                    {this.props.children}
                </div>
            </div>
        );
    }

    private renderList() {
        const { items, keyExtractor, titleExtractor, onSelect, activeItem, onFilter, addItem } = this.props;

        return (
            <div className='m-3 sticky-top'>
                {
                    onFilter &&
                    <InputGroup className='mb-3'>
                        <Form.Control placeholder='Filter...'
                            onChange={(event: any) => onFilter(event.target.value)} />
                        <InputGroup.Append>
                            <Button onClick={(e: any) => this.getAddItem(addItem)()}>Add</Button>
                        </InputGroup.Append>
                    </InputGroup>
                }

                <ListGroup>
                    {items.map(item => (
                        <ListGroupItem onClick={() => onSelect(item)}
                            style={{ cursor: 'pointer' }}
                            active={activeItem && keyExtractor(item) === keyExtractor(activeItem)}
                            key={keyExtractor(item)}>
                            {titleExtractor(item)}
                        </ListGroupItem>
                    ))}
                </ListGroup>
            </div>
        );
    }

    private getAddItem(getItem: (() => void) | undefined) {
        return isUndefined(getItem) || isNull(getItem) ? NOOP : getItem;
    }
}
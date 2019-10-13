import * as React from 'react';
import {Component} from 'react';
import ListGroupItem from 'react-bootstrap/ListGroupItem';
import ListGroup from 'react-bootstrap/ListGroup';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import {Form} from 'react-bootstrap';
import {EditorListProps} from '../../types/components/EditorListTypes';
import './EditorList.css';
import {MdAdd} from 'react-icons/md';

export default class EditorList<T> extends Component<EditorListProps<T>> {

    render() {
        return (
            <div className='h-100 d-flex flex-fill row flex-nowrap'>
                <div className='col-lg-3 border-right overflow-auto list shadow'>
                    {this.renderList()}
                </div>
                <div className='d-flex flex-column flex-fill overflow-auto content'>
                    {this.props.children}
                </div>
            </div>
        );
    }

    private renderList() {
        const {items, keyExtractor, titleExtractor, onSelect, activeItem, onFilter, onAdd} = this.props;

        return (
            <div className='m-3 sticky-top'>
                {
                    onFilter &&
                    <InputGroup className='mb-3'>
                        <Form.Control placeholder='Filter...'
                                      onChange={(event: any) => onFilter(event.target.value)}/>
                        {
                            onAdd &&
                            <InputGroup.Append>
                                <Button onClick={onAdd}><MdAdd size={22}/></Button>
                            </InputGroup.Append>
                        }
                    </InputGroup>
                }

                <ListGroup>
                    {items.map(item => (
                        <ListGroupItem onClick={() => onSelect(item)}
                                       style={{cursor: 'pointer'}}
                                       active={activeItem && keyExtractor(item) === keyExtractor(activeItem)}
                                       key={keyExtractor(item)}>
                            {titleExtractor(item)}
                        </ListGroupItem>
                    ))}
                </ListGroup>
            </div>
        );
    }
}
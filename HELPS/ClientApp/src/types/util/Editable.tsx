import * as React from 'react';
import {Button} from 'react-bootstrap';

export interface Editable {
    editing: boolean;
    isNewMode: boolean;
}

export const editOrSave = <S extends Editable>(
    props: S,
    actionName: string,
    save: () => void,
    callback: () => void
): void => {
    if (props.editing) {
        const confirmSave = confirm(`Confirm action - ${actionName}`);
        if (confirmSave) {
            save();
        }
    }

    callback();
};

export const deleteEntity = <S extends {}>(entityType: string, doDelete: (item: S) => void, fetchItem: () => S) => {
    const confirmDelete = confirm(`Confirm action - Delete ${entityType}`);
    if (confirmDelete) {
        doDelete(fetchItem());
    }
};

export const renderEditButtons = <T extends Editable>(
    props: T,
    edit:  boolean,
    cancel: () => void,
    saveOrEdit: () => void
) => {
    return props.editing ? (
        <div className='d-flex justify-content-around'>
            <Button onClick={cancel}
                    className='flex-fill mt-4 p-1 mr-1'>
                Cancel
            </Button>
            < Button onClick={saveOrEdit}
                     className='flex-fill mt-4 p-1 ml-1'
                     type='submit'
                     disabled={edit}>
                Save
            </ Button>
        </div>
    ) : (
        <Button onClick={saveOrEdit}
                className='w-100 mt-4'
                disabled={edit}>
            Edit
        </Button>
    );
};

export const getHiddenProperty = <T extends Editable>(state: T): React.CSSProperties | undefined => {
    return state.isNewMode ? {display: 'none'} : undefined;
};

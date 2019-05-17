import * as React from 'react';
import { Button } from 'react-bootstrap';

export interface Editable {
    editing: boolean;
}

const EDIT_TEXT: string = 'Edit',
    SAVE_TEXT: string = 'Save';

export function getEditOrSaveText<S extends Editable>(state: S): string {
    return state.editing ? SAVE_TEXT : EDIT_TEXT;
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
    isEditing: boolean,
    cancelOrCommenceEdit: () => void,
    props: T,
    editOrSaveIsDisabled: () => boolean,
    getEditOrSave: () => void
) => {
    return isEditing ? (<div>
        <Button onClick={(e: any) => cancelOrCommenceEdit()} className='w-50 mt-4 p-1' >
            Cancel
        </Button>
        < Button onClick={(e: any) => getEditOrSave()} className='w-50 mt-4 p-1' disabled={editOrSaveIsDisabled()} >
            {getEditOrSaveText(props)}
        </ Button>
    </div>) :
        (<Button onClick={(e: any) => getEditOrSave()} className='w-100 mt-4' disabled={editOrSaveIsDisabled()} >
            {getEditOrSaveText(props)}
        </Button>);
};

export interface Editable {
    editing: boolean;
}

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

export const deleteEntity = <S>(entityType: string, doDelete: (item: S) => void, fetchItem: () => S) => {
    const confirmDelete = confirm(`Confirm action - Delete ${entityType}`);
    if (confirmDelete) {
        doDelete(fetchItem());
    }
};

const EDIT_TEXT: string = 'Edit',
    SAVE_TEXT: string = 'Save';

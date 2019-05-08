export interface Editable {
    editing: boolean;
}

export function getEditOrSaveText<S extends Editable>(state: S): string {
    return state.editing ? SAVE_TEXT : EDIT_TEXT;
}

export const editOrSave = <S extends Editable>(
    state: S,
    actionName: string,
    save: () => void,
    setState: (editing: Editable) => void
): void => {
    if (state.editing) {
        const confirmSave = confirm(`Confirm action - ${actionName}`);
        if (confirmSave) {
            save();
        }
    }
    setState({ editing: !state.editing });
};

const EDIT_TEXT: string = 'Edit',
    SAVE_TEXT: string = 'Save';

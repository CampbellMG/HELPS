export type DialogButtonType = 'POSITIVE' | 'NEGATIVE' | 'NEUTRAL'

export type DialogButtons = {
    [button in DialogButtonType]: {
        onClick: () => void;
        text?: string;
    };
};

export interface DialogProps {
    title: string
    visible: boolean
    onHidden: () => void
    content?: string
    buttons?: DialogButtons
}
import * as React from 'react';
import {ReactElement} from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import {DialogButtonType, DialogProps} from '../../types/components/DialogTypes';

export default class Dialog extends React.Component<DialogProps> {

    constructor(props: DialogProps) {
        super(props);
    }

    render() {
        return (
            <Modal show={this.props.visible} onHide={this.onClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{this.props.title}</Modal.Title>
                </Modal.Header>
                {
                    this.props.content &&
                    <Modal.Body>{this.props.content}</Modal.Body>
                }

                {this.getFooter()}
            </Modal>
        );
    }

    private getFooter() {
        const {buttons} = this.props;
        if (!buttons) {
            return undefined;
        }

        const buttonComponents: ReactElement[] = [];

        if (buttons.NEUTRAL) {
            buttonComponents.push(
                <Button variant='secondary' onClick={this.onNeutral}>
                    {buttons.NEUTRAL.text ? buttons.NEUTRAL.text : 'Return'}
                </Button>
            );
        }

        if (buttons.NEGATIVE) {
            buttonComponents.push(
                <Button variant='danger' onClick={this.onNegative}>
                    {buttons.NEGATIVE.text ? buttons.NEGATIVE.text : 'Cancel'}
                </Button>
            );
        }

        if (buttons.POSITIVE) {
            buttonComponents.push(
                <Button variant='success' onClick={this.onPositive}>
                    {buttons.POSITIVE.text ? buttons.POSITIVE.text : 'Confirm'}
                </Button>
            );
        }

        return (
            <Modal.Footer>
                {buttonComponents}
            </Modal.Footer>
        );
    }

    private onPositive = () => this.invokeCallback('POSITIVE');
    private onNeutral = () => this.invokeCallback('NEUTRAL');
    private onNegative = () => this.invokeCallback('NEGATIVE');
    private onClose = () => this.props.onHidden();

    private invokeCallback(buttonType: DialogButtonType) {
        const {buttons} = this.props;

        if (buttons && buttonType in buttons) {
            buttons[buttonType].onClick();
        }

        this.props.onHidden();
    }
}
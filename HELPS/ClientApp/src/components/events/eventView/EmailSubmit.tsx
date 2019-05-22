import * as React from 'react';
import {Component, ReactElement} from 'react';
import {EmailSubmitProps, EmailSubmitState, EmailType} from '../../../types/components/WorkshopRegistrationTypes';
import {ButtonGroup, DropdownButton, Dropdown, Button} from 'react-bootstrap';

export default class EmailSubmit extends Component<EmailSubmitProps, EmailSubmitState> {
    constructor(props: EmailSubmitProps) {
        super(props);

        this.state = {
            emailType: EmailType.NONE
        };
    }

    render() {
        const {onSubmit, buttonText, emailType} = {...this.state, ...this.props};
        return (
            <ButtonGroup className='mt-4 d-flex'>
                <DropdownButton as={ButtonGroup} title={emailType} id={buttonText + 'email.button'}>
                    {this.getOptions()}
                </DropdownButton>
                <Button onClick={() => onSubmit(emailType)}
                        type='submit'>
                    {buttonText}
                </Button>
            </ButtonGroup>
        );
    }

    private getOptions() {
        const options: ReactElement[] = [];
        for (let emailType in EmailType) {
            options.push(
                <Dropdown.Item onSelect={() => this.setState({emailType: EmailType[emailType] as EmailType})}
                               key={emailType}>
                    {EmailType[emailType]}
                </Dropdown.Item>
            );
        }
        return options;
    }
}
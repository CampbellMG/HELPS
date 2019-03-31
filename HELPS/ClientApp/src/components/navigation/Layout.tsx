import {Container} from 'reactstrap';
import NavMenu from './NavMenu';
import * as React from "react";

export default (props: any) => (
    <div>
        <NavMenu/>
        <Container>
            {props.children}
        </Container>
    </div>
);

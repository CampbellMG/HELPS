import { Route } from 'react-router';
import Layout from './components/navigation/Layout';
import * as React from 'react';
import User from './components/user/User';
import WorkshopRegistration from './components/workshops/WorkshopRegistration';
import Login from './components/login/Login';
import Info from './components/information/Info';
import Register from './components/register/Register';
import Room from './components/room/Room';
import Message from './components/message/Message';
import EmailList from './components/email/EmailList';

export default () => (
    <div className='p-3 h-100'>
        <Layout>
            <Route path='/register/' component={Register} />
            <Route path='/message/' component={Message} />
            <Route path='/room/' component={Room} />
            <Route exact path='/' component={Login}/>
            <Route path='/user/' component={User}/>
            <Route path='/workshop_registration/' component={WorkshopRegistration}/>
            <Route path='/info/' component={Info}/>
            <Route path='/email' component={EmailList}/>
        </Layout>
    </div>
);
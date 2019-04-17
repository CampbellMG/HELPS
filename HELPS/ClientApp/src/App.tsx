import {Route} from 'react-router';
import Layout from './components/navigation/Layout';
import * as React from 'react';
import User from './components/user/User';
import WorkshopRegistration from './components/workshops/WorkshopRegistration';
import Login from './components/login/Login';
import Info from './components/information/Info';

export default () => (
    <div className='p-3 h-100'>
        <Layout>
            <Route exact path='/' component={Login}/>
            <Route path='/user/' component={User}/>
            <Route path='/workshop_registration/' component={WorkshopRegistration}/>
            <Route path='/info/' component={Info}/>
        </Layout>
    </div>
);
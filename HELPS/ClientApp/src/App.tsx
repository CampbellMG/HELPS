import {Route} from 'react-router';
import Layout from './components/navigation/Layout';
<<<<<<< HEAD
import Home from './components/home/Home';
import AdminWorkshops from './components/adminWorkshops/adminWorkshops';
=======
>>>>>>> 4cc801208e3175e8aa811062f83d5776fa4c0b61
import * as React from 'react';
import User from './components/user/User';
import WorkshopRegistration from './components/workshops/WorkshopRegistration';
import Login from './components/login/Login';
import Info from './components/information/Info';
import EmailList from './components/email/EmailList';

export default () => (
<<<<<<< HEAD
    <Layout>
        <Route exact path='/' component={Home}/>
        <Route path='/user/' component={User}/>
        <Route path='/workshop_registration/' component={WorkshopRegistration}/>
        <Route path='/admin_workshops/' component={AdminWorkshops}/>
    </Layout>
);
=======
    <div className='p-3 h-100'>
        <Layout>
            <Route exact path='/' component={Login}/>
            <Route path='/user/' component={User}/>
            <Route path='/workshop_registration/' component={WorkshopRegistration}/>
            <Route path='/info/' component={Info}/>
            <Route path='/email' component={EmailList}/>
        </Layout>
    </div>
);
>>>>>>> 4cc801208e3175e8aa811062f83d5776fa4c0b61

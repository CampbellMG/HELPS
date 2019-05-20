import { Route } from 'react-router';
import Layout from './components/navigation/Layout';
import * as React from 'react';
import User from './components/user/User';
import WorkshopRegistration from './components/workshops/WorkshopRegistration';
import Login from './components/login/Login';
import Info from './components/information/Info';
import Register from './components/register/Register';
import EmailList from './components/email/EmailList';
import RoomEdit from './components/room/RoomEdit';
import MessageEdit from './components/message/MessageEdit';
import AdvisorEdit from './components/advisors/AdvisorEdit';
import ReportGenerate from "./components/reports/ReportGenerate";

export default () => (
    <div className='p-3 h-100'>
        <Layout>
            <Route path='/register/' component={Register} />
            <Route path='/message/' component={MessageEdit} />
            <Route path='/room/' component={RoomEdit} />
            <Route exact path='/' component={Login}/>
            <Route path='/user/' component={User}/>
            <Route path='/workshop_registration/' component={WorkshopRegistration}/>
            <Route path='/info/' component={Info}/>
            <Route path='/email' component={EmailList}/>
            <Route path='/advisors/' component={AdvisorEdit}/>
            <Route path='/reports/' component={ReportGenerate}/>
        </Layout>
    </div>
);
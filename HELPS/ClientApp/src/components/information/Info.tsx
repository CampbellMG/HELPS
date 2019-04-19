import * as React from 'react';
import {Component} from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import ListGroupItem from 'react-bootstrap/ListGroupItem';
import {InfoState} from '../../types/components/InfoTypes';

export default class Info extends Component<{}, InfoState> {

    constructor(props: {}) {
        super(props);

        this.state = {
            activeContent: 'PROGRAMS'
        };
    }

    render() {
        return (
            <div className='row h-100 overflow-auto'>
                <div className='col-lg-2 border-right'>
                    <ListGroup className='m-3 sticky-top'>
                        <ListGroupItem onClick={this.showActivities}
                                       style={{cursor: 'pointer'}}
                                       active={this.state.activeContent === 'PROGRAMS'}>
                            Programs
                        </ListGroupItem>
                        <ListGroupItem onClick={this.showFAQ}
                                       style={{cursor: 'pointer'}}
                                       active={this.state.activeContent === 'FAQ'}>
                            FAQ
                        </ListGroupItem>
                    </ListGroup>
                </div>
                <div className='col m-3'>
                    {this.getContent()}
                </div>
            </div>
        );
    }

    private showActivities = () => this.setState({activeContent: 'PROGRAMS'});
    private showFAQ = () => this.setState({activeContent: 'FAQ'});

    private getContent() {
        if (this.state.activeContent === 'PROGRAMS') {
            return (
                <div>
                    <h2>Drop-in consultations</h2>
                    <p>
                        At the initial stage of your assignment writing or preparation process, you are strongly
                        encouraged to come and see HELPS. The best time to see us is when you first receive your
                        assignment.
                    </p>
                    <p>
                        <strong>HELPS Advisors can help edit your assignment WITH you, not FOR you</strong>&nbsp;-
                        helping you to edit for:
                    </p>
                    <ul>
                        <li>
                            Structure and argument – that your writing is logically organised with well-developed and
                            well-supported arguments.
                        </li>
                        <li>
                            Style and expression – that your choice of vocabulary is appropriate, sentences are well
                            constructed, ideas are clearly introduced, and paragraphs are fully developed.
                        </li>
                        <li>
                            Grammar – that your issues are identified and explained so you can learn from your mistakes
                            and avoid making them in the future.
                        </li>
                    </ul>
                    <p>
                        Proofreading is the final step in the editing process, with the aim of producing an error-free
                        assignment. It is&nbsp;<strong>your</strong>&nbsp;responsibility to check for mistakes in
                        spelling, punctuation, typing and formatting in your assignment before you submit it to your
                        lecturer.
                    </p>
                    <p>
                        We offer 15-minute drop-in advice sessions and 40-minute one-to-one consultations by referral to
                        help you with your assignment writing and preparation.
                    </p>
                    <h3>Drop-in consultations are held during:</h3>
                    <ul>
                        <li>
                            <h4>2019 Autumn&nbsp;session (from week 2 to week 12)</h4>
                        </li>
                        <li>
                            <h4><em>Not offered on Public Holidays.</em></h4>
                            <div>
                                <ul>
                                    <li>
                                        HELPS office (CB01.05.25)
                                        <p>Monday to Thursday: 12noon - 6pm / Friday: 12noon - 5pm&nbsp;&nbsp;</p>
                                    </li>
                                    <li>
                                        UTS Blake Library (Study Help Desk)&nbsp;
                                        <p>Monday to Thursday: 2pm - 7pm / Saturday: 1pm - 4pm<span>&nbsp;</span></p>
                                    </li>
                                    <li>
                                        Pop-up drop-ins: Bld 10 foyer (Pod1)
                                        <p>Monday to Thursday: 10am - 1pm<span>&nbsp;</span></p>
                                    </li>
                                    <li>
                                        Pop-up drop-ins: Bld 11 Level 5 (FEIT Learning Precinct CB11.05.300)
                                        <p>Tuesday and&nbsp;Thursday: 1pm - 4pm<span>&nbsp;</span></p>
                                    </li>
                                </ul>
                            </div>
                        </li>
                    </ul>
                    <p>
                        At the drop-in advice session we can, if you need it, book you in for a longer&nbsp;<a
                        href='https://www.uts.edu.au/current-students/support/helps/assignment-writing-assistance/one-one-consultation-referral'>one-to-one
                        consultation&nbsp;</a>closer to the due date for when you have your draft ready.
                    </p>
                    <h2>Individual assistance by referral</h2>
                    <p>
                        After you have attended a&nbsp;<a
                        href='https://www.uts.edu.au/current-students/support/helps/assignment-writing-assistance'>drop-in
                        advice&nbsp;</a>session; if a longer consultation is required you may be able to book in for a
                        40-minute one-to-one consultation.
                    </p>
                    <p>
                        Having a one-to-one consultation is an opportunity for an in-depth discussion in relation to
                        your specific needs on an assessment.
                    </p>
                    <p>A 40-minute one-to-one consultation may involve:</p>
                    <ul>
                        <li>
                            discussing your draft to ensure that you have addressed the assessment criteria
                        </li>
                        <li>
                            addressing a number of grammar or referencing issues that require assistance
                        </li>
                        <li>
                            preparing for an oral presentation.
                        </li>
                    </ul>
                    <h2>Daily workshops</h2>
                    <ul>
                        <li>
                            <a href='https://www.uts.edu.au/current-students/support/helps/daily-workshops/assignment-writing-series'>Improve
                                Your Writing Series</a></li>
                        <li>
                            <a href='https://www.uts.edu.au/current-students/support/helps/daily-workshops/improve-your-speaking'>Improve
                                Your Speaking&nbsp;Series</a></li>
                        <li>
                            <a href='https://www.uts.edu.au/current-students/support/helps/daily-workshops/improve-your-grammar'>Improve
                                Your Grammar&nbsp;Series</a></li>
                        <li>
                            <a href='https://www.uts.edu.au/current-students/support/helps/daily-workshops/2018-19-summer-special-workshops'>Summer
                                Special Workshops</a></li>
                        <li>
                            <a href='https://www.uts.edu.au/current-students/support/helps/daily-workshops/orientation-workshops'>Orientation
                                Workshops</a></li>
                    </ul>
                    <p>
                        You will need to register for these workshops as places are limited.
                        To <em><strong>register</strong></em>, click on the <strong>workshop registration tab </strong>and
                        follow the instructions. If you wish your cancel your registration, please do so online or
                        contact us via email. Failing to turn up for your registered workshops are not fair to those on
                        the waiting lists. Repeat offenders may be barred from attending workshops for the rest of the
                        semester.
                    </p>
                    <h2>Writing Support sessions</h2>
                    <h3><strong>WriteNow! Writing support sessions @ the Library</strong></h3>
                    <ul>
                        <li>
                            The sessions run<strong>&nbsp;1:00 pm to 5:00 pm every Friday from Week 2 to Week
                            12</strong>.
                        </li>
                        <li>
                            They are held in a training room at the UTS Library where we also provide desktop computers.
                        </li>
                        <li>
                            You will need to&nbsp;<a href='https://helps-booking.uts.edu.au/'>register&nbsp;</a>for
                            these sessions as places are limited.
                        </li>
                    </ul>
                    <h3><strong>WriteNow! Writing support sessions @ HELPS</strong></h3>
                    <ul>
                        <li>
                            The sessions run<strong>&nbsp;1:00 pm to 4:00 pm Monday to Thursday from Week 2 to Week
                            12</strong>.
                        </li>
                        <li>
                            <span>They are held in the HELPS office (CB01.05.25)&nbsp;</span></li>
                        <li>
                            <span>Please remember to bring your laptop as there are no desktop computers in this room.</span>
                        </li>
                        <li>
                            <span>Online registration is not required.</span>
                        </li>
                    </ul>
                    <h2>Intensive academic English program</h2>
                    <h2>Academic Writing Program</h2>
                    <p>
                        <em>You can choose from a Day or Evening class</em></p>
                    <ul>
                        <li>9 July to 13 July 2018&nbsp;(daily)
                        </li>
                        <li>Day class (13:00 - 16:00)&nbsp;<em>or&nbsp;</em>Evening class (18:00 - 20:00)
                        </li>
                    </ul>
                    <h2>
                        <span>Academic Speaking Program</span></h2>
                    <p>
                        <em>You can choose from either a Pronunciation or Seminar presentation class</em>.</p>
                    <h3>Pronunciation Correction</h3>
                    <ul>
                        <li>
                            16&nbsp;July to 20&nbsp;July 2018&nbsp;(daily)
                        </li>
                        <li>13:00 - 16:00&nbsp;</li>
                    </ul>
                    <h3>Seminar Presentation</h3>
                    <ul>
                        <li>
                            16&nbsp;July to 20&nbsp;July 2018&nbsp;(daily)
                        </li>
                        <li>
                            <span>Day class (14:00 - 16:00)&nbsp;</span><em>or&nbsp;</em><span>Evening class (18:00 - 20:00)</span>
                        </li>
                    </ul>
                    <h2>
                        <span>Communication for Employment Program</span></h2>
                    <ul>
                        <li>
                            <span>9 July to 13&nbsp;July 2018&nbsp;</span><span>10:00 - 12:00&nbsp;</span><span>(daily)</span>
                        </li>
                        <li>
                            16&nbsp;July to 20&nbsp;July 2018&nbsp;<span>10:00 - 12:00&nbsp;</span><span>(daily)</span>
                        </li>
                    </ul>
                    <p>Applications will be available in May and June 2018 at
                        <a href='http://www.helps.uts.edu.au' target='_blank'>www.helps.uts.edu.au</a>
                    </p>
                    <h2>Self-help resources for essential academic skills</h2>
                    <p>click <a href='http://www.uts.edu.au/current-students/support/helps/self-help-resources'
                                target='_blank'>here </a>to acces the resources</p>
                    <p>&nbsp;</p>
                </div>
            );
        }

        return (
            <div>
                <h3><a>About the HELPS programs</a></h3>
                <h6><a>Who can use HELPS?</a></h6>
                <ul><li>Any student enrolled in any faculty at UTS</li></ul>
                <h6><a>Where is HELPS?</a></h6>
                <ul><li>HELPS is located on Building 1, Level 5 , room 25</li></ul>
                <h6><a>How much does it cost?</a></h6>
                <ul><li>Services are free of tuition fees for non-credit workshops and individual consultations.</li></ul>
                <h6><a>Can you help me with my assignment?</a></h6>
                <ul><li>Yes. HELPS offers various workshops and individual consultations. For more information, check
                    out our <a href='http://www.ssu.uts.edu.au/helps/index.html'>website</a>.</li></ul>
                <h6><a>Can you proofread and correct my assignment?</a></h6>
                <ul><li>No. Our role is not to correct grammar or other errors in an assignment. We can help you
                    develop your own editing strategies. You should also use a computer spell-check, find a
                    competent friend and a good dictionary.</li></ul>
                <h6><a>Can you help me with the content of
                    my assignment?</a></h6>
                <ul><li>No. We can’t tell you what to say, we can only help you say it better and more clearly. While
                    we’re happy to act as a sounding board for your ideas, content questions require the specialised
                    disciplinary knowledge of lecturers and tutors in your faculty. You should take specific content
                    questions directly to them.</li></ul>
                <h6><a>My lecturer says I
                    need to improve my grammar. Can you help me?</a></h6>
                <ul><li>Yes. Please check our&nbsp;website&nbsp;for information on our&nbsp;<a
                    href='https://www.uts.edu.au/current-students/support/helps/daily-workshops'>workshops&nbsp;</a>and&nbsp;
                    <a href='https://www.uts.edu.au/current-students/support/helps/self-help-resources'>Learning
                        resources</a>.</li></ul>
                <h6><a>Can you help me with my pronunciation?</a></h6>
                <ul><li>Yes. Please check our&nbsp;website&nbsp;for information on our <a
                    href='https://www.uts.edu.au/current-students/support/helps/english-speaking-practice'>English
                    speaking programs</a>, <a
                    href='https://www.uts.edu.au/current-students/support/helps/daily-workshops'>workshops&nbsp;</a>and&nbsp;
                    <a href='https://www.uts.edu.au/current-students/support/helps/self-help-resources'>Learning
                        resources</a>.</li></ul>
                <h6><a>Can I practise my seminar presentation with someone?</a></h6>
                <ul><li>Yes. You can attend our workshops or drop in for an individual consultation session.</li></ul>
                <hr/>
                <h3><a>About the Special Conditions in Exams</a></h3>
                <h6>
                    <a>I am not a native English speaker and I feel that I need more time in exams. Can you
                        help?
                    </a>
                </h6>
                <ul><li>Maybe. You might be eligible to apply for Special Conditions in Exams.</li></ul>
                <h6><a>I'm a second/third year student. Can I get Special Conditions in my exams?</a></h6>
                <ul><li>No. Only first year (1st/2nd semester) students are eligible to apply.</li></ul>
                <h6><a>What is the deadline to apply for the Special Conditions?</a></h6>
                <ul><li>The application closes on the Census date. Click on<a
                    href='https://www.uts.edu.au/current-students/support/helps/special-conditions-exams-students-non-english-speaking-backgrounds'> Special
                    Conditions in Exams</a> for more information.</li></ul>
                <hr/>
                <h6>If you have a question which has not been answered above, please email us: HELPS@uts.edu.au</h6>
            </div>
        );
    }
}
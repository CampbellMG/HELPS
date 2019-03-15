import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {actionCreators} from '../store/Students';

class FetchData extends Component {
  componentDidMount() {
    this.props.requestStudents();
  }

  render() {
    return (
      <div>
        <h1>Students</h1>
        {renderStudentTable(this.props)}
      </div>
    );
  }
}

function renderStudentTable(props) {
  return (
    <table className='table table-striped'>
      <thead>
        <tr>
          <th>Student ID</th>
          <th>Name</th>
        </tr>
      </thead>
      <tbody>
        {props.students.map(student =>
          <tr key={student.studentId}>
            <td>{student.studentId}</td>
            <td>{student.name}</td>
          </tr>
        )}
      </tbody>
    </table>
  );
}

export default connect(
  state => state.students,
  dispatch => bindActionCreators(actionCreators, dispatch)
)(FetchData);

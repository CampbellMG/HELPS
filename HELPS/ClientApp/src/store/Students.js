const requestStudentsType = 'REQUEST_STUDENT';
const receiveStudentsType = 'RECEIVE_STUDENT';
const initialState = { students: [], isLoading: false };

export const actionCreators = {
  requestStudents: () => async (dispatch, getState) => {
    dispatch({ type: requestStudentsType });

    const url = 'api/Student/Students';
    const response = await fetch(url);
    const students = await response.json();

    dispatch({ type: receiveStudentsType, students });
  }
};

export const reducer = (state, action) => {
  state = state || initialState;

  if (action.type === requestStudentsType) {
    return {
      ...state,
      isLoading: true
    };
  }

  if (action.type === receiveStudentsType) {
    return {
      ...state,
      students: action.students,
      isLoading: false
    };
  }

  return state;
};

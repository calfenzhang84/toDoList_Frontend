export const initialState = {
    errors: "",
    projects: [],
    // project: {},
    id: "",

    projectTasks: [],
    // projectTask: {},
    projectSequence:"",

    user: {},
    validToken: false,
  };
  
  export const actionTypes = {
    GET_PROJECTS: "GET_PROJECTS",
    GET_ERRORS: "GET_ERRORS",
    DELETE_PROJECTS: "DELETE_PROJECT",

    GET_BACKLOG: "GET_BACKLOG",
    GET_PROJECT_TASK: "GET_PROJECT_TASK",
    DELETE_PROJECT_TASK: "DELETE_PROJECT_TASK",

    SET_CURRENT_USER: "SET_CURRENT_USER",
  };
  
  const reducer = (state, action) => {
    console.log(action);
    switch (action.type) {
      case "GET_PROJECTS": //==case actionTypes.SET_SEARRCH_TERM:
        return {
          ...state,
          projects: action.projects,
        };
      case "GET_ERRORS": //==case actionTypes.SET_SEARRCH_TERM:
          return {
            ...state,
            errors: action.errors,
          };
      case "DELETE_PROJECT": //==case actionTypes.SET_SEARRCH_TERM:
        return {
          ...state,
          projects: state.projects.filter(project => project.projectIdentifier !== action.id),
        };
        case "GET_BACKLOG": //==case actionTypes.SET_SEARRCH_TERM:
          return {
            ...state,
            projectTasks: action.projectTasks,
          };
        case "GET_PROJECT_TASK": //==case actionTypes.SET_SEARRCH_TERM:
          return {
            ...state,
            projectTask: action.projectTask,
          };
        case "DELETE_PROJECT_TASK": //==case actionTypes.SET_SEARRCH_TERM:
          return {
            ...state,
            projectTasks: state.projectTasks.filter(projectTask =>  projectTask.projectSequence !== action.projectSequence),
          };
        case "SET_CURRENT_USER": //==case actionTypes.SET_SEARRCH_TERM:
          return {
            ...state,
            user: action.decodedToken,
            validToken: state.user ? true : false, //action.decodedToken ? true : false  need empty
          };
      default:
        return state;
    }
  };

  
  export default reducer;
  
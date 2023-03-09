const AuthReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_START":
      return {
        user: null,
        isFetching: true,
        error: false,
        userID: null,
        token: null,
        message: null,
        savePasswordError: null
      };
    case "LOGIN_SUCCESS":
      return {
        user: action.payload,
        isFetching: false,
        error: false,

        userID: null,
        token: null

      };
    case "LOGIN_FAILURE":
      return {
        user: null,
        isFetching: false,
        error: true,

        userID: null,
        token: null
      };
      ;
    case "LOGOUT":
      return {
        user: null,
        isFetching: false,
        error: true,

        userID: null,
        token: null
      };
    case "FOLLOW":
      return {
        ...state,
        user: {
          ...state.user,
          followings: [...state.user.followings, action.payload],
        },
      };
    case "UNFOLLOW":
      return {
        ...state,
        user: {
          ...state.user,
          followings: state.user.followings.filter(
            (following) => following !== action.payload
          ),
        },
      };
    case "RESET_PASSWORD":
      return {
        ...state,

        userID: null,
        token: null,
        error: null,
        savePasswordError: null
      };
    case "RESET_PASSWORD_SUCCESS":
      return {
        ...state,
        userID: action.payload.userID,
        token: action.payload.token,
        error: action.payload.error

      };

    // case "RESET_PASSWORD_FAILURE":
    //   return {
    //     ...state,
    //     userID: null,
    //     token: null,
    //     error: action.payload.error
    //   };


    case "SAVE_PASSWORD":
      return {
        ...state,

        userID: null,
        token: null,
        message: null,
        error: null,
        savePasswordError: null
      };
    case "SAVE_PASSWORD_SUCCESS":
      return {
        ...state,
        savePasswordError: action.payload.error,
        message: action.payload.message
      };

    case "UPDATE_PROFILE":
      return {
        ...state,
        message: null,
        error: null,
      };
    case "UPDATE_PROFILE_SUCCESS":
      return {
        user:action.payload,
      };

    default:
      return state;
  }
};

export default AuthReducer;

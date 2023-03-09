export const LoginStart = (userCredentials) => ({
  type: "LOGIN_START",
});

export const LoginSuccess = (user) => ({
  type: "LOGIN_SUCCESS",
  payload: user,
});
export const Logout = () => ({
  type: "LOGOUT",
});
export const LoginFailure = () => ({
  type: "LOGIN_FAILURE",
});

export const Follow = (userId) => ({
  type: "FOLLOW",
  payload: userId,
});

export const Unfollow = (userId) => ({
  type: "UNFOLLOW",
  payload: userId,
});

export const ResetPassword = () => ({
  type: "RESET_PASSWORD",
});

export const ResetPasswordSuccess = (payload) => ({
  type: "RESET_PASSWORD_SUCCESS",
  payload: payload,
});

// export const ResetPasswordFailure = (payload) => ({
//   type: "RESET_PASSWORD_FAILURE",
//   payload: payload.data,
// });

export const SavePassword = () => ({
  type: "SAVE_PASSWORD",
});

export const SavePasswordSuccess = (payload) => ({
  type: "SAVE_PASSWORD_SUCCESS",
  payload: payload,
});


export const UpdateProfile = () => ({
  type: "UPDATE_PROFILE",
});

export const UpdateProfileSuccess = (payload) => ({
  type: "UPDATE_PROFILE_SUCCESS",
  payload: payload,
});
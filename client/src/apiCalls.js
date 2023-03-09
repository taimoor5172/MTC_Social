import axios from "axios";

export const loginCall = async (userCredential, dispatch) => {
  dispatch({ type: "LOGIN_START" });
  try {
    const res = await axios.post("/auth/login", userCredential);

    console.log('res', res)
    dispatch({ type: "LOGIN_SUCCESS", payload: res.data });

  } catch (err) {

    console.log('res in fail', err)
    dispatch({ type: "LOGIN_FAILURE", payload: err });
  }
};

export const resetPasswordCall = async (email, dispatch) => {
  dispatch({ type: "RESET_PASSWORD" });
  try {
    const res = await axios.post("/auth/resetPassword", email);

    dispatch({ type: "RESET_PASSWORD_SUCCESS", payload: res.data });

  } catch (err) {

  }
};


export const savePasswordCall = async (savePasswordData, dispatch) => {
  dispatch({ type: "SAVE_PASSWORD" });
  try {
    const res = await axios.post("/auth/savePassword", savePasswordData)

    dispatch({ type: "SAVE_PASSWORD_SUCCESS", payload: res.data });

  } catch (err) {

  }
}

export const updateProfileCall = async (updateProfileData, dispatch) => {
  dispatch({ type: "UPDATE_PROFILE" });
  try {
    const res = await axios.put(`/users/${updateProfileData.userId}`, updateProfileData)

    dispatch({ type: "UPDATE_PROFILE_SUCCESS", payload: res.data });

  } catch (err) {

  }
}


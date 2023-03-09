import {useState } from "react";
import axios from "axios";
import "./changepassword.css"
export default function ChangePassword({ history, match,user }) {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    // let user = localStorage.getItem("user")
    let id = user._id
    
    const changePasswordHandler = async (e) => {
        e.preventDefault();

        const config = {
            header: {
                "Content-Type": "application/json",
            },
        };

        if (newPassword !== confirmNewPassword) {
            setNewPassword("");
            setConfirmNewPassword("");
            setTimeout(() => {
                setError("");
            }, 5000);
            return setError("Passwords don't match");
        }

        try {
            console.log(id)

            const { data } = await axios.put(

                `http://localhost:3000/users/changepassword/${id}`,
                {
                    oldPassword,newPassword
                },
                config
            );
            setNewPassword("")
            setOldPassword("")
            setConfirmNewPassword("")
            setSuccess(data.data)
            setTimeout(() => {
                setSuccess("")
            }, 5000)

        } catch (error) {
           console.log(error);
        }
    };

    return (
        <div className="forgotPassword" >

            <div className="Form" style={{ marginTop: 15 }}>
                <form
                    onSubmit={changePasswordHandler}>
                    <div className="">
                        <h1 className="text-center">Change Password</h1>
                        {error && <span className="error-message">{error} </span>}
                        {success && (
                            <span className="success-message">
                                {success}
                            </span>
                        )}

                        {/* <label className="label">Email</label>
                <input className="input" placeholder="123@.com" /> */}
                        <label className="label">Old Password</label>
                        <input type="password" required id="oldpassword" className="input" placeholder="Enter Old Password" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} />


                        <label className="label">New Password</label>
                        <input type="password" required id="newpassword" className="input" placeholder="Enter New Password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />

                        <label className="label">Confirm New Password</label>
                        <input type="password" required id="confirmpassword" className="input" placeholder="Confirm Password" value={confirmNewPassword} onChange={(e) => setConfirmNewPassword(e.target.value)} />


                        {/* <input className="label" type='checkbox'>Rememeber me </input> */}


                        <button type="submit" className="submit" >Reset Password</button>
                    </div>

                </form>

            </div>
        </div>
    );
}

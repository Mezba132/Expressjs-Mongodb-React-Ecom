import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { auth } from '../../firebase';
import { Spin } from 'antd';
import { useSelector } from "react-redux";

const ForgotPassword = ({history}) => {

      const [email, setEmail] = useState('');
      const [loading, setLoading] = useState(false);

      const { user } = useSelector(user => user);

      useEffect(() => {
            if (user && user.idToken) history.push('/');
      },[user])

      const handleSubmit = async (e) => {
            e.preventDefault();
            setLoading(true);

            const config = {
                  url: process.env.REACT_APP_FORGOT_PASSWORD_REDIRECT,
                  handleCodeInApp: true
            }

            try {
                  await auth.sendPasswordResetEmail(email, config);
                  setEmail('');
                  toast.success(`Email is sent to ${email}. Click the link to reset your password`);
                  setLoading(false);
            }
            catch (err) {
                  console.log(err)
                  toast.error(err.message);
                  setLoading(false);
            }
      }

      const forgotPasswordForm = () => (
            <form onSubmit={handleSubmit}>
                  <div className="form-group input-group mb-2">
                        <span className="input-group-text"> <i className="fa fa-envelope"></i> </span>
                        <input
                              name=""
                              placeholder="Type Your Email"
                              className="form-control"
                              type="email"
                              value={email}
                              onChange={e => setEmail(e.target.value)}
                              autoFocus
                        />
                  </div>
                  <div class="form-group">
                        <button type="submit" className="btn btn-primary btn-block" disabled={!email}> Send </button>
                  </div>
            </form>
      )

      return (
            <div className="container">
                  <div className="card bg-light mb-5">
                        <article className="card-body mx-auto">
                              {loading ? <div > <Spin tip="Loading..." /> </div> :
                                    <div>
                                          <h4 className="card-title mt-3 text-center">Forgot Password</h4>
                                          {forgotPasswordForm()}
                                    </div>
                              }
                        </article>
                  </div>
            </div>
      )

}

export default ForgotPassword;
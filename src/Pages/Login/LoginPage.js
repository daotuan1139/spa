import React from "react";
import { Formik } from "formik";
import { Button, Form } from "react-bootstrap";
import axios from 'axios';
import '../../Components/Input/LoginInput.css'

const initialValues = {
    email: '',
    password: '',
    university: 'default'
};
const validateValues = values => {
    const errors = {};
    if (!values.email) {
        errors.email = 'Required';
    } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
    ) {
        errors.email = 'Invalid email address';
    }
    if (values.password.length < 8) {
        errors.password = 'Password too short'
    }
    return errors;
};

const LoginPage = ({currentUser, setCurrentUser,title }) => {
  
    const onSubmit = (values, { setSubmitting }) => {
        console.log('values = ', values);
        sessionStorage.setItem(values.email, values.password);
    
        axios.get('https://60dff0ba6b689e001788c858.mockapi.io/token', {
          email: values.email,
          password: values.password,
        }).then((response) => {
          setCurrentUser({
            token: response.data.token,
            userId: response.data.userId,
          })
          axios.defaults.headers.common["Authorization"] = response.data.token;
          sessionStorage.setItem('token', JSON.stringify(response.data));
        })
        console.log(currentUser);

        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          setSubmitting(false);
        }, 400)
      }


    return (
        <div className='login-form'>
            <Formik
                initialValues={initialValues}
                validate={validateValues}
                onSubmit={onSubmit}
            >
                {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    isSubmitting,
                    /* and other goodies */
                }) => (
                    <div>
                        <h3 className="login-form--title">Login Form</h3>
                        { title && <center><h5>{ title }</h5></center> }
                        <Form
                            noValidate
                            onSubmit={handleSubmit}
                            style={{ display: "flex", justifyContent: 'center' }}
                        >
                            <div className="login-form--container">
                                <Form.Group controlId="validationFormik01">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="email"
                                        value={values.email}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        isInvalid={!!errors.email}
                                        className="email-input"
                                    />

                                    <Form.Control.Feedback type="invalid">
                                        {errors.email}
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group controlId="validationFormik02">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        name="password"
                                        value={values.password}
                                        onChange={handleChange}
                                        isInvalid={touched.password && errors.password}
                                        className="email-input"
                                    />
                                    <Form.Control.Feedback type='invalid'>
                                        {errors.password}
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Check
                                        required
                                        name="terms"
                                        label="Agree to terms and conditions"
                                        onChange={handleChange}
                                        isInvalid={!!errors.terms}
                                        feedback={errors.terms}
                                        id="validationFormik0"
                                    />
                                </Form.Group>
                                <Form.Group controlId="validationFormik03">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control
                                        as='select'
                                        defaultValue="Choose..."
                                        value={values.university}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        name="university"
                                        className="mb3"
                                    >
                                        <option value="default">None</option>
                                        <option value="FPT">FPT</option>
                                        <option value="NEU">NEU</option>
                                        <option value="HaUI">HaUI</option>
                                    </Form.Control>
                                </Form.Group>

                                <Button className="login-form--input" type="submit">Submit form</Button>
                            </div>
                        </Form>
                    </div>
                )}
            </Formik>
        </div>
    );
};

export default LoginPage;
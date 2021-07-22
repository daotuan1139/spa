import React from 'react';
import { Button, Form } from 'react-bootstrap';
import { Formik } from 'formik';
import '../../Components/Input/RegisterInput.css'

const initialValues = {
    email: '',
    password: '',
    confirmPassword: '',
    university: 'default'
};

const validateValues = values => {
    const errors = {};
    if (!values.email) {
        errors.email = "Required";
    } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
    ) {
        errors.email = 'Invalid email address';
    } else if (values.password.length < 8) {
        errors.password = 'At least 8 characters';
    } else if (values.confirmPassword !== values.password) {
        errors.confirmPassword = 'Confirm Password must match password'
    }
    return errors;
};


const onSubmit = (values, { setSubmitting }) => {
    console.log('values: ', values)
    setTimeout(() => {
        alert(JSON.stringify(values, null, 2));
        setSubmitting(false);
    }, 400)

}

const RegisterPage = () => {
    const style = {
        padding: 2.2 + '%',
        border: '0.5px solid rbga(180,180,180,0.6)',
        borderRadius: '5px',
        width: '100%',
    }
    return (
        <div className="register-form">
            <Formik
                initialValues={initialValues}
                validate={validateValues}
                onSubmit={onSubmit}
            >
                {({
                    handleSubmit,
                    handleChange,
                    handleBlur,
                    values,
                    touched,
                    isValid,
                    errors,

                }) => (
                    <div>
                        <h3 className="register-form--title">Register Form</h3>
                        <Form
                            noValidate
                            onSubmit={handleSubmit}
                            style={{ display: "flex", justifyContent: 'center' }}
                        >
                            <div className="register-form--container">
                                <Form.Group controlId="validationFormik01">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="email"
                                        value={values.email}
                                        onChange={handleChange}
                                        isValid={touched.email && !errors.email}
                                        isInvalid={!!errors.email}
                                        className="email-input"
                                    />
                                    <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group controlId="validationFormik02">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        name="password"
                                        value={values.password}
                                        onChange={handleChange}
                                        isValid={touched.password && !errors.password}
                                        isInvalid={errors.password}
                                        className="email-input"
                                    />
                                    <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group controlId="validationFormik02">
                                    <Form.Label>Confirm Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        name="confirmPassword"
                                        onChange={handleChange}
                                        isValid={touched.confirmPassword && !errors.confirmPassword}
                                        isInvalid={errors.confirmPassword}
                                        className="email-input"
                                    />
                                    <Form.Control.Feedback type="invalid">{errors.confirmPassword}</Form.Control.Feedback>
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

                                <Button className="login-form--input" type="submit">Register</Button>
                            </div>
                        </Form>
                    </div>
                )}
            </Formik>
        </div>
    )
}


export default RegisterPage;
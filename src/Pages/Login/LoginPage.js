import { useState, useEffect, useRef } from "react";
import "./login.css";

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isEmailValid, setValidEmail] = useState(false);

    const emailValidator = (email) => {
        const validEmailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        if (email.match(validEmailRegex)) {
            setValidEmail(true);
        } else {
            setValidEmail(false);
        }
    }
    const didMountEmail = useRef(false);
    useEffect(() => {
        if (didMountEmail.current) {
            emailValidator(email);
        } else {
            didMountEmail.current = true;
        }
    }, [email]);

    const handleEmailChange=(e) => {
        setEmail(e.target.value);
    }

    const handlePasswordChange=(e) => {
        setPassword(e.target.value);
    }

    const handleSubmit = (e) => {
        if (password.length >= 8 && isEmailValid===true ) {
            alert("Email & Password are valid");
            console.log(`Email: ${email}`);
            console.log(`Password: ${password}`);
            sessionStorage.setItem(email, password);
        }
        e.preventDefault();
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>

                <label htmlFor="email">
                    Email
                </label>
                <br />
                <input
                    id="email"
                    type="email"
                    className="email-input"
                    onChange={handleEmailChange}
                />
                <br />
                {isEmailValid && email.length ? (
                    <p className="valid-email">Email is valid</p>
                ) : email.length ? (
                    <p className="invalid-email">Invalid email</p>
                ) : (
                    ""
                )}
                <br />

                <label htmlFor="email">
                    Password
                </label>
                <br />
                <input
                    id="password"
                    type="password"
                    className="password-input"
                    onChange={handlePasswordChange}
                />
                <br />
                {(password.length >= 8) ? (
                    <p className="valid-password">Password is valid</p>
                ) : (password.length < 8) ? (
                    <p className="invalid-password">Too short</p>
                ) : (
                    ""
                )}
                <br />
                <button className="submit-button form-item" type="submit">
                    Submit
                </button>
                <br />
                <br />
            </form>
        </div>
    );
};
export default LoginPage;
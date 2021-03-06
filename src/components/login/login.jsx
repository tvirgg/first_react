import React from 'react';
import {Field, reduxForm} from "redux-form";
import {Input} from "../FormsControls/FormsControls";
import {required} from "../../utils/validators/validators";
import {connect} from "react-redux";
import {login} from "../../redux/state/Auth_reducer";
import {Redirect} from "react-router-dom";
import style from "./../FormsControls/FormsControls.module.css";
import "react-widgets/styles.css";
import DatePicker from "react-widgets/DatePicker";
const LoginForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field placeholder={"Email"} name={"email"}
                       validate={[required]}
                       component={Input}/>
            </div>
            <div>
                <Field placeholder={"Password"} name={"password"} type={"password"}
                       validate={[required]}
                       component={Input}/>
            </div>
            <div>
                <Field component={Input} name={"rememberMe"} type={"checkbox"}/> remember me
            </div>
            {props.captchaUrl && <div>
                <img src={props.captchaUrl}/>
                <Field placeholder={"Symbols from image"} name={"captcha"}
                       validate={[required]}
                       component={Input}/>

            </div>}
            { props.error && <div className={style.formSummaryError}>
                {props.error}
            </div>
            }
            <div>
                <button>Login</button>
            </div>
        </form>
    )
}

const LoginReduxForm =  reduxForm({form: 'login'})(LoginForm)

const Login = (props) => {
    const onSubmit = (formData) => {
       console.log(formData.email, formData.password, formData.rememberMe, formData.captcha);
    }
    if (props.isAuth) {
        return <Redirect to={"/profile"} />
    }
    return <div>
        <h1>Login</h1>
        <LoginReduxForm onSubmit={onSubmit} captchaUrl={props.captchaUrl}/>
    </div>
}
const mapStateToProps = (state) => ({
    isAuth: state.AuthData.isAuth,
    captchaUrl: state.AuthData.captchaUrl
})
export default connect(mapStateToProps, {login} )(Login);

import * as datasource from "../../api/datasource";
import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import {connect} from "react-redux";
import {mapStateToProps} from "../components/BaseComponent";
import {
    actionBeginLogin,
    actionChangeLoginInfo,
    actionChangeRemember,
    actionChangeSession,
    actionErrorLogin
} from "../../redux/actions/actionSignIn";
import {withRouter} from "react-router-dom";

function SignIn(props) {
    const {classes, onChangeLoginInfo, onChangeRemember, onBeginLogin, onSuccessLogin, onErrorLogin} = props;
    const {authenticationReducers} = props;
    const {isRemember, account, isBeginLogin, isSuccessLogin, isErrorLogin, session} = authenticationReducers;
    const token = session?.token;

    function onChangeTextField({target}) {
        onChangeLoginInfo(target);
    }

    function onChangeRememberCheckbox({target}) {
        onChangeRemember();
        localStorage["isRemember"] = isRemember;
        if (isRemember) {
            Object.keys(account).forEach(name => localStorage[name] = account[name]);
        } else {
            Object.keys(account).forEach(name => localStorage[name] = "");
        }
    }

    if (!isErrorLogin && !isBeginLogin && !isSuccessLogin && token != null) {// is first login
        login(true);
    }

    function login(loginWithToken = false) {
        onBeginLogin();
        datasource.login(loginWithToken ? {token} : account)
            .then(session => {
                if (session != null) {
                    onSuccessLogin(session);
                    props.history.push('/');
                } else {
                    onErrorLogin()
                }
            });
    }

    function onLogin(e) {
        e.preventDefault();

        function isValidateForm() {
            for (const key of Object.keys(account)) {
                if (account[key].trim().length === 0) {
                    return false;
                }
            }
            return true;
        }

        if (isValidateForm()) {

            if (isRemember) {
                Object.keys(account).forEach(name => localStorage[name] = account[name]);
            } else {
                Object.keys(account).forEach(name => localStorage[name] = "");
            }

            login();
        }
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline/>
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon/>
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <form className={classes.form} noValidate method={"POST"}>
                    <TextField
                        disabled={isBeginLogin}
                        variant="outlined"
                        margin="normal"
                        error={account["username"].length === 0}
                        floatingLabelText="Phone"
                        required
                        fullWidth
                        id="username"
                        label="Username"
                        value={account["username"]}
                        name="username"
                        autoComplete="username"
                        autoFocus
                        onChange={onChangeTextField}
                    />
                    <TextField
                        disabled={isBeginLogin}
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        error={account["password"].length === 0}
                        value={account["password"]}
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        onChange={onChangeTextField}
                    />
                    <FormControlLabel
                        disabled={isBeginLogin}
                        control={<Checkbox checked={isRemember} color="primary" onChange={onChangeRememberCheckbox}/>}
                        label="Remember me"
                    />
                    <Button
                        disabled={isBeginLogin}
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        onClick={onLogin}
                        className={classes.submit}
                    >
                        Sign In
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            <Link href={"/forgot-password"} variant="body2">
                                Forgot password?
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link href={"/sign-up"} variant="body2">
                                {"Don't have an account? Sign Up"}
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
    );
}

function mapDispatchToProps(dispatch) {
    return {
        ...dispatch,
        onChangeRemember: (e) => dispatch(actionChangeRemember(e)),
        onChangeLoginInfo: (e) => dispatch(actionChangeLoginInfo(e)),
        onBeginLogin: (e) => dispatch(actionBeginLogin(e)),
        onSuccessLogin: (e) => dispatch(actionChangeSession(e)),
        onErrorLogin: (e) => dispatch(actionErrorLogin(e)),
    }
}

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(SignIn));
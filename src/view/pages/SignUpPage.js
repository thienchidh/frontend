import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import {connect} from "react-redux";
import {mapStateToProps} from "../components/BaseComponent";
import {actionChangeSession} from "../../redux/actions/actionSignIn";
import {
    actionBeginSignUp,
    actionChangeAccountInfo,
    actionChangeUserInfo,
    actionErrorSignUp,
    actionSuccessSignUp
} from "../../redux/actions/actionSignUp";
import * as dataSource from "../../api/datasource";
import autoBind from "auto-bind";
import {withRouter} from "react-router-dom";

class SignUp extends React.Component {

    constructor(props, context) {
        super(props, context);
        autoBind(this)
    }

    componentDidMount() {
        const {onSuccessLogout, authenticationReducers} = this.props;
        const {session} = authenticationReducers;
        if (session != null) {
            dataSource.logout(session.token)
                .finally(() => {
                    onSuccessLogout();
                });
        }
    }

    onChangeAccount({target}) {
        const {onChangeAccountInfo} = this.props;
        onChangeAccountInfo(target)
    }

    onChangeUser({target}) {
        const {onChangeUserInfo} = this.props;
        onChangeUserInfo(target)
    }

    onSignUp(e) {
        e.preventDefault();
        const {signUpReducers} = this.props;
        const {onBeginSignUp, onSuccessSignUp, onErrorSignUp, onSignUpComplete} = this.props;

        const {account} = signUpReducers;

        function isValidForm() {
            if (account.username.trim().length === 0 || account.password.trim().length === 0) {
                return false
            }
            const {user} = account;
            const keys = Object.keys(user);
            for (const key of keys) {
                if (user[key].trim().length === 0) {
                    return false;
                }
            }
            return true;
        }

        if (isValidForm()) {
            onBeginSignUp();
            dataSource.register(account).then(
                session => {
                    onSuccessSignUp(session);
                    onSignUpComplete(session);
                    this.props.history.push("/");
                }
            ).catch(ignored => {
                onErrorSignUp()
            });
        }
    }

    render() {
        const {classes} = this.props;
        const {signUpReducers} = this.props;
        const {account} = signUpReducers;
        const {username, password, user: {firstName, lastName, email}} = account;

        return (
            <Container component="main" maxWidth="xs">
                <CssBaseline/>
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon/>
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign up
                    </Typography>
                    <form className={classes.form} noValidate>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    autoComplete="firstName"
                                    variant="outlined"
                                    error={firstName.trim().length === 0}
                                    value={firstName}
                                    required
                                    fullWidth
                                    id="firstName"
                                    name="firstName"
                                    label="First Name"
                                    autoFocus
                                    onChange={this.onChangeUser}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    variant="outlined"
                                    required
                                    value={lastName}
                                    error={lastName.trim().length === 0}
                                    fullWidth
                                    id="lastName"
                                    label="Last Name"
                                    name="lastName"
                                    autoComplete="lastName"
                                    onChange={this.onChangeUser}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    value={email}
                                    error={email.trim().length === 0}
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    onChange={this.onChangeUser}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    value={username}
                                    error={username.trim().length === 0}
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="username"
                                    label="Username"
                                    name="username"
                                    autoComplete="username"
                                    onChange={this.onChangeAccount}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    value={password}
                                    error={password.length === 0}
                                    variant="outlined"
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="current-password"
                                    onChange={this.onChangeAccount}
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            onClick={this.onSignUp}
                        >
                            Sign Up
                        </Button>
                        <Grid container justify="flex-end">
                            <Grid item>
                                <Link href={"/login"} variant="body2">
                                    Already have an account? Sign in
                                </Link>
                            </Grid>
                        </Grid>
                    </form>
                </div>
            </Container>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return {
        ...dispatch,
        onSuccessLogout: () => dispatch(actionChangeSession(null)),
        onBeginSignUp: (e) => dispatch(actionBeginSignUp(e)),
        onSuccessSignUp: (e) => dispatch(actionSuccessSignUp(e)),
        onErrorSignUp: (e) => dispatch(actionErrorSignUp(e)),
        onChangeAccountInfo: (e) => dispatch(actionChangeAccountInfo(e)),
        onChangeUserInfo: (e) => dispatch(actionChangeUserInfo(e)),
        onSignUpComplete: (e) => dispatch(actionChangeSession(e)),
    }
}

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(SignUp));
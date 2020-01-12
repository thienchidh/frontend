import {mapDispatchToProps, mapStateToProps} from "./BaseComponent";
import * as React from "react";
import {connect} from "react-redux";
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';

const footers = [
    {
        title: 'Company',
        description: ['Team', 'History', 'Contact us', 'Locations'],
    },
    {
        title: 'Features',
        description: ['Cool stuff', 'Random feature', 'Team feature', 'Developer stuff', 'Another one'],
    },
    {
        title: 'Resources',
        description: ['Resource', 'Resource name', 'Another resource', 'Final resource'],
    },
    {
        title: 'Legal',
        description: ['Privacy policy', 'Terms of use'],
    },
];

function Footer(props) {
    const {classes} = props;
    return <>
        {/* Footer */}
        <Container maxWidth="md" component="footer" className={classes.footer}>
            <Grid container spacing={4} justify="space-evenly">
                {footers.map(footer => (
                    <Grid item xs={6} sm={3} key={footer.title}>
                        <Typography variant="h6" color="textPrimary" gutterBottom>
                            {footer.title}
                        </Typography>
                        <ul>
                            {footer.description.map(item => (
                                <li key={item}>
                                    <Link href="#" variant="subtitle1" color="textSecondary">
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </Grid>
                ))}
            </Grid>
            <Box mt={5}>
                <Copyright/>
            </Box>
        </Container>
        {/* End footer */}
    </>;
}

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            Your Website
            {' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Footer);

import React from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import { NativeRouter, Route, Redirect, Switch } from 'react-router-native';

import { styles } from '../styles';

import Home from './Home';
import UserProfile from './UserProfile';
import Login from './Login';
import SignUpPage from './SignUp';

const Root = props => {
    return (
        <NativeRouter>
            <SafeAreaView
                style={[
                    styles.container,
                    { marginTop: StatusBar.currentHeight },
                ]}
            >
                <Switch>
                    <Redirect exact from="/" to="/home" />
                    <Route path="/home" component={Home} />
                    <Route path="/user" component={UserProfile} />
                    <Route path="/login" component={Login} />
                    <Route path="/signup" component={SignUpPage} />
                </Switch>
            </SafeAreaView>
        </NativeRouter>
    );
};

export default Root;
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withFirebase, withFirestore } from 'react-redux-firebase';
import { Redirect, Route, Link } from 'react-router-native';
import Button from './Button';
import { styles, pallette } from '../styles';
import UserProfile from './UserProfile';

const style = StyleSheet.create({
    screen: {
        display: 'flex',
        backgroundColor: pallette.lightgray,
    },
    button: {
        backgroundColor: pallette.crimson,
        color: pallette.white,
        padding: 16,
        fontSize: 18,
        fontWeight: 'bold',
        alignSelf: 'center',
        margin: 5,
    }
});

const MyProfile = props => {

    const { games, templates, currentUser, auth } = props;

    return auth.isEmpty || auth.isAnonymous ? (
        <Redirect to="/login" from="/me" />
    ) : (
        <View style={style.screen}>
            <UserProfile userId={auth.uid}/>
            <Button
                onPress={() => {
                    props.firebase
                        .logout()
                        .then(() => props.history.replace("/login"));
                }}
                text="Log out"
                style={style.button}
                textStyle={{fontSize: 18, fontWeight: 'bold'}}
            />
            <Link
                to="/follow/new"
                component={TouchableOpacity}
            >
                <Text style={style.button}>Follow More People!</Text>
            </Link>
        </View>
    );
}

const mapStateToProps = state => ({
    auth: state.firebase.auth,
    games: state.firestore.ordered.games || [],
    templates: state.firestore.data.templates || {},
    currentUser: state.firestore.data.users && state.firestore.data.users[state.firebase.auth.uid],
});

export default compose(
    withFirestore,
    withFirebase,
    connect(mapStateToProps)
)(MyProfile);
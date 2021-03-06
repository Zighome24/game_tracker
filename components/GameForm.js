import React, { Component } from 'react';
import { Text, View, TextInput } from 'react-native';

import { compose } from 'redux';
import { connect } from 'react-redux';
import { withFirestore } from 'react-redux-firebase';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import Button from './Button';

import { pallette, styles } from '../styles';

class GameForm extends Component {
    state = this.props.defaultState;

    render() {
        const { template, logic } = this.props;

        // TODO: add form validation for types
        // TODO: add readable name to vars (maybe just setup vars)
        const setupList = logic.setup.map((setupVar, index) => (
            <View key={index} style={{ flexDirection: 'row', padding: 10 }}>
                <Text style={{ fontSize: 20 }}>{setupVar.name + ': '}</Text>
                <TextInput
                    style={{
                        borderRadius: 10,
                        backgroundColor: pallette.lightgray,
                        flex: 1,
                        padding: 10,
                    }}
                    value={this.state[setupVar.name]}
                    onChangeText={text =>
                        this.setState({ [setupVar.name]: text })
                    }
                />
            </View>
        ));

        return (
            <KeyboardAwareScrollView
                style={{ backgroundColor: 'white' }}
                contentContainerStyle={styles.content}
            >
                <Text style={[styles.header, { padding: 20 }]}>
                    {template.name}
                </Text>
                <View style={{ minWidth: 300 }}>{setupList}</View>
                <Button
                    style={{ margin: 20 }}
                    onPress={() => this.props.onSubmit(this.state)}
                    text={this.props.submitText}
                />
            </KeyboardAwareScrollView>
        );
    }
}

const mapStateToProps = ({ firestore: { data }, firebase }, { templateId }) => {
    const template = data.templates && data.templates[templateId];
    const logic = template && JSON.parse(template.logic);
    return {
        template,
        logic,
        auth: firebase.auth,
    };
};

// not connected to Firestore because new data isn't needed
export default compose(
    withFirestore,
    connect(mapStateToProps)
)(GameForm);

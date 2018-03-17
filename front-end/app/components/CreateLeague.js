import React, { Component } from 'react';
import { Alert, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import styles from '../styles/styles';

import Auth from '../lib/Auth';

class CreateLeague extends Component {

  constructor() {
    super();
    this.state = {
      user: {},
      league: {
        name: '',
        stake: '',
        code: null
      }
    };
  }

  componentDidMount() {
    Auth.getPayload()
      .then(user => {
        fetch(`http://127.0.0.1:3001/users/${user.userId}`, {
          method: 'GET',
          headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' }
        })
          .then(response => response.json())
          .then(user => {
            this.setState({ user });
          });
      })
      .catch(err => console.error(err));
  }

  handleChange = ({ target: { name, value } }) => {
    const league = Object.assign({}, this.state.league, { [name]: value });
    this.setState({ league });
  }

  handleSubmit() {
    fetch('http://127.0.0.1:3001/leagues', {
      method: 'POST',
      headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: this.state.name,
        stake: this.state.stake
      })
    })
      .then(league => console.log(league))
      .then(() => {
        Alert.alert('League created!');
        Actions.Dashboard();
      })
      .catch(err => console.error(err));
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.itemContainer}>
          <View style={styles.form}>
            <TextInput
              editable={true}
              onChangeText={(name) => this.setState({ name })}
              placeholder='League name'
              returnKeyType='next'
              style={styles.inputText}
              value={this.state.name}
            />

            <TextInput
              editable={true}
              onChangeText={(stake) => this.setState({ stake })}
              placeholder='Stake (£)'
              returnKeyType='next'
              style={styles.inputText}
              value={this.state.stake}
            />

            <TouchableOpacity style={styles.buttonWrapper} onPress={this.handleSubmit.bind(this)}>
              <Text style={styles.buttonText}>Create League</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }

}

export default CreateLeague;

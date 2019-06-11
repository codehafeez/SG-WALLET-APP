import React, { Component } from 'react';
import { createStackNavigator, createSwitchNavigator } from 'react-navigation';
import Login from './src/components/Login';
import ForgotPassword from './src/components/ForgotPassword';
import Home from './src/components/Home';
import Profile from './src/components/Profile';
import POS from './src/components/POS';
import { View, StatusBar, ImageBackground, AsyncStorage, StyleSheet } from 'react-native';
import { Spinner } from 'native-base';
export default class App extends Component {

  constructor() {
    super();
    this.state = { isVisible: true, session_login_id: "", }
  }

  componentDidMount() {
    var thisVal = this;
    setTimeout(function () {
      thisVal.setState({ isVisible: false });
    }, 3000);
  }

  splash_screen_view_function = () => {
    if (this.state.isVisible == true) {
      return (
        <View>
          <ImageBackground style={styles.splash_screen_bg} source={require('./src/components/splashScreen.jpg')}>
            <StatusBar backgroundColor='#008CBA' />
            <Spinner size='large' style={styles.splash_screen_spinner} color='#008CBA' />
          </ImageBackground>
        </View>
      )
    }
    else {
      AsyncStorage.getItem('session_login_id').then((value) => this.setState({ session_login_id: value }))
      if (this.state.session_login_id !== null && this.state.session_login_id !== "") {
        return (this.home_view_function())
      }
      else {
        return (this.login_view_function())
      }
    }
  }



  home_view_function() { return (<HomeNav />); }
  login_view_function() { return (<MainNav />); }
  render() { return (this.splash_screen_view_function()); }

}




const HomeNav = createStackNavigator({
  Home: { screen: Home },
  Profile: { screen: Profile },
  POS: { screen: POS },
});
const LoginNav = createStackNavigator({
  Login: { screen: Login },
  ForgotPassword: { screen: ForgotPassword }
},
  {
    initialRouteName: 'Login'
  }
);

const MainNav = createSwitchNavigator({
  LoginNav: LoginNav,
  HomeNav: HomeNav,
});




const styles = StyleSheet.create({
  splash_screen_bg: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  splash_screen_spinner: {
    marginTop: 250,
  }
});

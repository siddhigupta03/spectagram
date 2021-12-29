import React, { Component } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import StackNav from '../Nav/Stack'
import Profile from '../Sceens/Profile'
import LogOut from '../Sceens/Logout'
import CustomSidebarMenu from '../Sceens/CustomSideBarMenu';

const Drawer = createDrawerNavigator();

export default class DrawerNav extends Component {
    constructor(props) {
        super(props);
        this.state = {
            light_theme: true,
        }
    }

    componentDidMount() {
        let theme;
        firebase
          .database()
          .ref("/users/" + firebase.auth().currentUser.uid)
          .on("value", function(snapshot) {
            theme = snapshot.val().current_theme;
          });
        this.setState({ light_theme: theme === "light" ? true : false });
      }

    render() {
        let props = this.props
        return(
            <Drawer.Navigator
                drawerContentOptions={{
                    activeTintColor: "#e91e63",
                    inactiveTintColor: this.state.light_theme ? "black" : "white",
                    itemStyle: { marginVertical: 5 }
                }}
                drawerContent={props => <CustomSidebarMenu {...props}/>}
            >
                <Drawer.Screen name='Home' component={StackNav} options={{unmountOnBlur: true }}/>
                <Drawer.Screen name='Profile' component={Profile} options={{unmountOnBlur: true }}/>
                <Drawer.Screen name='Logout' component={LogOut} options={{unmountOnBlur: true }}/>
            </Drawer.Navigator>
        )
    }
}
import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import CustomDrawer from './CustomDrawer';
import Login from '../Screens/Login';


const Drawer = createDrawerNavigator();
const DrawerNavigator = () => {
  return (
    <Drawer.Navigator drawerContent={props => <CustomDrawer {...props} />} screenOptions={{drawerPosition:"right"}}>
      <Drawer.Screen
        name="Login"
        component={Login}
        options={{headerShown: false}}
      />
     
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
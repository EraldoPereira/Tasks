import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { NavigationContainer } from '@react-navigation/native'

import Auth from './screens/Auth'
import TaskList from './screens/TaskList'


const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Auth">
        <Drawer.Screen name="Auth" component={Auth} />
        <Drawer.Screen name="Home" component={TaskList} />
      </Drawer.Navigator>
    </NavigationContainer>
  )
}
import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack';

import Auth from './screens/Auth'
import TaskList from './screens/TaskList'
import Menu from './screens/Menu'
import AuthOrApp from './screens/AuthOrApp';

const menuConfig = {
  initialRouteName: 'Hoje',
  contentComponent: Menu,
  contentOptions: {
    labelStyle: {
      fontFamily: 'Montserrat-Regular',
      fontSize: 20
    },
    activeLabelStyle: {
      fontFamily: 'Montserrat-Bold',
      color: '#080'
    }
  }
}


const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();


const menuRoutes = {
  Hoje: {
    nome: 'Hoje',
    screen: props => <TaskList title='Hoje' diasAfrente={0} {...props} />,
    navigationOptions: {
      title: 'Hoje'
    }
  },
  Amanha: {
    nome: 'Amanhã',
    screen: props => <TaskList title='Amanhã' diasAfrente={1} {...props} />,
    navigationOptions: {
      title: 'Amanhã'
    }
  },
  Semana: {
    nome: 'Semana',
    screen: props => <TaskList title='Semana' diasAfrente={7} {...props} />,
    navigationOptions: {
      title: 'Semana'
    }
  },
  Mes: {
    nome: 'Mês',
    screen: props => <TaskList title='Mês' diasAfrente={30} {...props} />,
    navigationOptions: {
      title: 'Mês'
    }
  }
}

export default function MyStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator >
        <Stack.Screen name="AuthOrApp" component={AuthOrApp} options={{ headerShown: false }} />
        <Stack.Screen name="Auth" component={Auth} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={App} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function App() {
  return (
    <Drawer.Navigator
      initialRouteName="Hoje"
      drawerContent={(props) => <Menu {...props} />}
      drawerContentOptions={{
        activeTintColor: '#080',
      }}
    >
      <Drawer.Screen name="Hoje" component={menuRoutes.Hoje.screen} />
      <Drawer.Screen name="Amanhã" component={menuRoutes.Amanha.screen} />
      <Drawer.Screen name="Semana" component={menuRoutes.Semana.screen} />
      <Drawer.Screen name="Mês" component={menuRoutes.Mes.screen} />
    </Drawer.Navigator>
  )
}
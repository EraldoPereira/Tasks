import React from 'react'
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer'
import { Avatar } from 'react-native-elements'

import axios from 'axios'
import AsyncStorage from '@react-native-community/async-storage'
import Icon from 'react-native-vector-icons/FontAwesome'


export default props => {

    const logout = () => {
        delete axios.defaults.headers.common['Authorization']
        AsyncStorage.removeItem('userData')
        props.navigation.navigate('Auth')
    }
    return (
        <DrawerContentScrollView >
            <View style={styles.header} >
                <Text style={styles.title} >Tasks</Text>
                <Avatar size="large" title="CL" titleStyle={{ color: '#000', }} rounded containerStyle={{ backgroundColor: '#DDD', marginBottom: 10 }} />
                <Text style={styles.nome} >Cleitin Rasta</Text>
                <Text style={styles.email} >cleiton@gmail.com</Text>
                <TouchableOpacity onPress={logout} >
                    <View style={{marginBottom: 10}} >
                        <Icon name='sign-out' size={30} color='#800' />
                    </View>
                </TouchableOpacity>
            </View>
            <DrawerItemList {...props} labelStyle={styles.telas} />
        </DrawerContentScrollView>
    );
}

const styles = StyleSheet.create({
    telas: {
        fontSize: 20,
        fontFamily: 'Montserrat-Regular',
    },
    header: {
        borderBottomWidth: 1,
        borderColor: '#DDD',
        marginLeft: 10
    },
    title: {
        color: '#000',
        fontFamily: 'Montserrat-SemiBold',
        fontSize: 30,
        paddingTop: 15,
        padding: 10
    },
    avatar: {
        width: 50,
        height: 50
    },
    userInfo: {

    },
    nome: {
        fontFamily: 'Montserrat-SemiBold',
        fontSize: 25,
        marginBottom: 5
    },
    email: {
        fontFamily: 'Montserrat-Regular',
        fontSize: 15,
        marginBottom: 10
    }
})
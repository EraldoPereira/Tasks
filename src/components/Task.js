import React from 'react'
import { View, Text, StyleSheet, TouchableWithoutFeedback, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import Swipeable from 'react-native-gesture-handler/Swipeable'

import moment from 'moment'
import 'moment/locale/pt-br'

import commonStyles from '../commonStyles'

export default props => {

    const doneOrNotStyle = props.status ? { textDecorationLine: 'line-through' } : {}
    const date = props.data_concluida ? props.data_concluida : props.data_estimada
    const formatedDate = moment(date).locale('pt-br').format('ddd, D [de] MMMM')

    const getRightContent = () => {
        return (
            <TouchableOpacity style={styles.right} onPress={ () => props.onDelete && props.onDelete(props.id_task) } >
                <Icon name="trash" size={30} color="#FFF" />
            </TouchableOpacity>
        )
    }

    const getLeftContent = () => {
        return (
            <View style={styles.left} >
                <Icon name="trash" size={30} color="#FFF" style={styles.excludeIcon} />
                <Text style={styles.excludeText} >Excluir</Text>
            </View>
        )
    }

    return (
        <Swipeable renderRightActions={getRightContent} renderLeftActions={getLeftContent} onSwipeableLeftOpen={ () => props.onDelete && props.onDelete(props.id_task) } >
            <View style={styles.container} >
                <TouchableWithoutFeedback onPress={() => props.toggleTask(props.id_task)} >
                    <View style={styles.checkContainer} >
                        {getCheckView(props.status)}
                    </View>
                </TouchableWithoutFeedback>
                <View>
                    <Text style={[styles.desc, doneOrNotStyle]}  >{props.descricao}</Text>
                    <Text style={styles.date} >{formatedDate}</Text>
                </View>
            </View>
        </Swipeable>
    )
}

function getCheckView(status) {
    if (status) {
        return (
            <View style={styles.done} >
                <Icon name="check" size={20} color="#fff" ></Icon>
            </View>
        )
    } else {
        return (
            <View style={styles.pending} ></View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        borderColor: '#AAA',
        borderBottomWidth: 1,
        alignItems: 'center',
        paddingVertical: 10,
        backgroundColor: '#FFF'
    },
    checkContainer: {
        width: '20%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    pending: {
        height: 30,
        width: 30,
        borderRadius: 30 / 2,
        borderWidth: 1,
        borderColor: '#555'
    },
    done: {
        height: 30,
        width: 30,
        borderRadius: 30 / 2,
        borderWidth: 1,
        borderColor: '#4D7',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#4d7'
    },
    desc: {
        fontFamily: 'Montserrat-SemiBold',
        color: commonStyles.color.mainText,
        fontSize: 18
    },
    date: {
        fontFamily: commonStyles.fontFamily,
        color: commonStyles.color.subText,
        fontSize: 15
    },
    right: {
        backgroundColor: 'red',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20
    },
    left: {
        flex:1,
        backgroundColor: 'red',
        flexDirection: 'row',
        alignItems: 'center',
    },
    excludeText: {
        fontFamily: 'Montserrat-Regular',
        color: '#FFF',
        fontSize: 20,
        margin: 10
    },
    excludeIcon:{
        marginLeft:10
    }
})
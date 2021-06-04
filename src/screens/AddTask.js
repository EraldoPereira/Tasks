import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableWithoutFeedback, Modal, TouchableOpacity, TextInput } from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker'

import commonStyles from '../commonStyles'

import moment from 'moment'

const initialState = { desc: '', date: new Date(), showDatePicker: false }

export default class AddTask extends Component {

    state = {
        ...initialState
    }

    save = () => {
        const newTask = {
            desc: this.state.desc,
            date: this.state.date
        }
        if(this.props.onSave){
            this.props.onSave(newTask)
        }
        this.setState({ ...initialState })
    }

    getDatePicker = () => {
        let datePicker = <DateTimePicker value={this.state.date} onChange={(_, date) => this.setState({ date: date, showDatePicker: false })} mode='date' />
        const dateString = moment(this.state.date).format('dddd, D [de] MMMM')
        datePicker = (
            <View>
                <TouchableOpacity onPress={ ()=> this.setState({ showDatePicker: true }) } >
                    <Text style={styles.date} >
                        {dateString}
                    </Text>
                </TouchableOpacity>
                {/* Essa espressão significa que a segunda parte só será executada caso a primeira seja verdadeira */}
                {this.state.showDatePicker && datePicker}
            </View>
        )

        return datePicker
    }

    render() {
        return (
            <Modal transparent={true} visible={this.props.isVisible} onRequestClose={this.props.onCancel} animationType='slide' >
                <TouchableWithoutFeedback onPress={this.props.onCancel} >
                    <View style={styles.background} ></View>
                </TouchableWithoutFeedback>
                <View style={styles.container} >
                    <Text style={styles.header}>Nova Tarefa</Text>
                    <TextInput style={styles.input} placeholder="Informe a descrição..." value={this.state.desc} onChangeText={desc => this.setState({ desc })}></TextInput>
                    {this.getDatePicker()}
                    <View style={styles.buttons} >
                        <TouchableOpacity onPress={this.props.onCancel} >
                            <Text style={styles.button}>Cancelar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this.save} >
                            <Text style={styles.button}>Salvar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <TouchableWithoutFeedback onPress={this.props.onCancel} >
                    <View style={styles.background} ></View>
                </TouchableWithoutFeedback>
            </Modal>
        )
    }
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.7)'
    },
    container: {
        backgroundColor: '#FFF'
    },
    header: {
        fontFamily: 'Montserrat-Regular',
        backgroundColor: commonStyles.color.today,
        color: commonStyles.color.secondary,
        textAlign: 'center',
        padding: 15,
        fontSize: 20
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    input: {
        fontFamily: 'Montserrat-SemiBold',
        width: '90%',
        height: 40,
        margin: 15,
        backgroundColor: '#FFF',
        borderWidth: 1,
        borderColor: '#E3E3E3',
        borderRadius: 6,
        fontSize: 16
    },
    button: {
        margin: 20,
        marginRight: 30,
        color: commonStyles.color.today
    },
    date: {
        fontSize: 20,
        fontFamily: 'Montserrat-Regular',
        marginLeft: 15
    }
})
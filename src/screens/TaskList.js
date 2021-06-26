import React, { Component } from 'react'
import { View, Text, ImageBackground, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import AsyncStorage from '@react-native-community/async-storage'
import axios from 'axios'
import { server, showError } from '../common'

import todayImage from '../assets/imgs/today.jpg'
import tomorrowImage from '../assets/imgs/tomorrow.jpg'
import weekImage from '../assets/imgs/week.jpg'
import monthImage from '../assets/imgs/month.jpg'
import commonStyles from '../commonStyles'

import moment from 'moment'
import 'moment/locale/pt-br'

import Task from '../components/Task'
import AddTask from './AddTask'


const initialState = {
    showDoneTasks: true,
    showAddTask: false,
    visibleTasks: [],
    tasks: []
}

export default class TaskList extends Component {

    state = { ...initialState }


    componentDidMount = async () => {
        const stateString = await AsyncStorage.getItem('tasksState')
        const savedState = JSON.parse(stateString) || initialState
        this.setState({ showDoneTasks: savedState.showDoneTasks }, this.filterTasks)
        this.loadTasks()
    }

    toggleTask = async taskId => {
        try {
            await axios.put(`${server}/tasks/toggle/${taskId}`)
            await this.loadTasks()
        } catch (error) {
            showError(error)
        }
    }


    loadTasks = async () => {
        try {
            const maxDate = moment().add({ days: this.props.diasAfrente }).format('YYYY-MM-DD')
            const res = await axios.get(`${server}/tasksemail?data=${maxDate}`)
            this.setState({ tasks: res.data }, this.filterTasks)
        } catch (error) {
            showError(error)
        }
    }


    toggleFilter = () => {
        this.setState({ showDoneTasks: !this.state.showDoneTasks }, this.filterTasks)
    }

    filterTasks = () => {
        let visibleTasks = null
        if (this.state.showDoneTasks) {
            visibleTasks = [...this.state.tasks]
        } else {
            const pending = task => task.status === false
            visibleTasks = this.state.tasks.filter(pending)
        }

        this.setState({ visibleTasks })
        AsyncStorage.setItem('tasksState', JSON.stringify({ showDoneTasks: this.state.showDoneTasks }))
    }


    addTask = async newTask => {
        if (!newTask.descricao || !newTask.descricao.trim()) {
            Alert.alert('Dados invalidos', 'Descrição não informada!')
            return
        }
        try {
            await axios.post(`${server}/tasks`, {
                descricao: newTask.descricao,
                data_estimada: newTask.data_estimada,
                id_proprietario: "1",
                status: newTask.status
            })
            this.setState({ howAddTask: false }, this.loadTasks)
        } catch (error) {
            showError(error)
        }
    }

    deleteTask = async taskId => {
        try {
            await axios.delete(`${server}/tasks/${taskId}`)
            this.loadTasks()
        } catch (error) {
            showError(error)
        }
    }

    getImage = () =>{
        switch(this.props.diasAfrente){
            case 0: return todayImage
            case 1: return tomorrowImage
            case 7: return weekImage
            default : return monthImage
        }
    }

    getColor = () =>{
        switch(this.props.diasAfrente){
            case 0: return commonStyles.color.today
            case 1: return commonStyles.color.tomorrow
            case 7: return commonStyles.color.week
            default : return commonStyles.color.month
        }
    }

    render() {

        const today = moment().locale('pt-br').format('ddd, D [de] MMMM')

        return (
            <View style={styles.container} >
                <AddTask isVisible={this.state.showAddTask} onCancel={() => this.setState({ showAddTask: false })} onSave={this.addTask} />
                <ImageBackground source={this.getImage()} style={styles.background} >
                    <View style={styles.iconBar} >
                    <TouchableOpacity onPress={()=> this.props.navigation.openDrawer()} >
                            <Icon name='bars' size={28} color={commonStyles.color.secondary} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this.toggleFilter} >
                            <Icon name={this.state.showDoneTasks ? 'eye' : 'eye-slash'} size={28} color={commonStyles.color.secondary} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.titleBar} >
                        <Text style={styles.title} >{this.props.title}</Text>
                        <Text style={styles.subTitle} >{today}</Text>
                    </View>
                </ImageBackground>
                <View style={styles.taskList} >
                    <FlatList
                        data={this.state.visibleTasks}
                        keyExtractor={item => `${item.id_task}`}
                        renderItem={({ item }) => <Task {...item} toggleTask={this.toggleTask} onDelete={this.deleteTask} />}
                    />
                </View>
                <TouchableOpacity style={[styles.addButton, { backgroundColor: this.getColor() }]} onPress={() => this.setState({ showAddTask: true })} activeOpacity={0.9} >
                    <Icon name="plus" size={25} color={commonStyles.color.secondary} />
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    background: {
        flex: 3
    },
    taskList: {
        flex: 7
    },
    titleBar: {
        flex: 1,
        justifyContent: 'flex-end',

    },
    title: {
        fontFamily: commonStyles.fontFamily,
        fontSize: 55,
        color: commonStyles.color.secondary,
        marginLeft: 20,
        marginBottom: 20
    },
    subTitle: {
        fontFamily: commonStyles.fontFamily,
        color: commonStyles.color.secondary,
        fontSize: 20,
        marginBottom: 30,
        marginLeft: 20,
    },
    iconBar: {
        flexDirection: 'row',
        marginHorizontal: 20,
        justifyContent: 'space-between',
        marginTop: 8
    },
    addButton: {
        position: 'absolute',
        right: 30,
        bottom: 30,
        width: 55,
        height: 55,
        borderRadius: 55 / 2,
        backgroundColor: commonStyles.color.today,
        justifyContent: 'center',
        alignItems: 'center'
    }
})
import React, { Component } from 'react'
import { View, Text, ImageBackground, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import AsyncStorage from '@react-native-community/async-storage'
import axios from 'axios'

import todayImage from '../assets/imgs/today.jpg'
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

    state = {...initialState}


    componentDidMount = async () => {
        const stateString = await AsyncStorage.getItem('tasksState')
        const savedState = JSON.parse(stateString) || initialState
        this.setState({ showDoneTasks: savedState.showDoneTasks }, this.filterTasks)
    }

    toggleTask = taskId => {
        const tasks = [...this.state.tasks]
        tasks.forEach(task => {
            if (task.id === taskId) {
                task.doneAt = task.doneAt ? null : new Date()
            }
        })
        this.setState({ tasks }, this.filterTasks)
    }

    toggleFilter = () => {
        this.setState({ showDoneTasks: !this.state.showDoneTasks }, this.filterTasks)
    }

    filterTasks = () => {
        let visibleTasks = null
        if( this.state.showDoneTasks ){
            visibleTasks = [...this.state.tasks]
        }else{
            const pending = task => task.doneAt === null
            visibleTasks = this.state.tasks.filter(pending)
        }

        this.setState({ visibleTasks })
        AsyncStorage.setItem('tasksState', JSON.stringify({showDoneTasks: this.state.showDoneTasks}))
    }


    addTask = newTask => {
        if(!newTask.desc || !newTask.desc.trim() ){
            Alert.alert('Dados invalidos', 'Descrição não informada!')
            return
        }

        const tasks = [ ...this.state.tasks ]
        tasks.push({
            id: Math.random(),
            desc: newTask.desc,
            estimateAt: newTask.date, 
            doneAt: null
        })
        this.setState({ tasks, showAddTask: false }, this.filterTasks)
    }

    deleteTask = id => {
        const tasks = this.state.tasks.filter( task => task.id !== id )
        this.setState( {tasks}, this.filterTasks )
    }

    render() {

        const today = moment().locale('pt-br').format('ddd, D [de] MMMM')

        return (
            <View style={styles.container} >
                <AddTask isVisible={this.state.showAddTask} onCancel={ () => this.setState({ showAddTask : false}) } onSave={this.addTask} />
                <ImageBackground source={todayImage} style={styles.background} >
                    <View style={styles.iconBar} >
                        <TouchableOpacity onPress={this.toggleFilter} >
                            <Icon name={this.state.showDoneTasks ? 'eye' : 'eye-slash'} size={28} color={commonStyles.color.secondary} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.titleBar} >
                        <Text style={styles.title} >Hoje</Text>
                        <Text style={styles.subTitle} >{today}</Text>
                    </View>
                </ImageBackground>
                <View style={styles.taskList} >
                    <FlatList
                        data={this.state.visibleTasks}
                        keyExtractor={item => `${item.id}`}
                        renderItem={({ item }) => <Task {...item} toggleTask={this.toggleTask} onDelete={this.deleteTask} />}
                    />
                </View>
                <TouchableOpacity style={styles.addButton} onPress={() => this.setState({ showAddTask: true })} activeOpacity={0.9} >
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
        justifyContent: 'flex-end',
        marginTop: 8
    },
    addButton:{
        position: 'absolute',
        right: 30,
        bottom: 30,
        width: 55,
        height: 55,
        borderRadius: 55/2,
        backgroundColor: commonStyles.color.today,
        justifyContent: 'center',
        alignItems: 'center'
    }
})
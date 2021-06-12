import React, { Component } from 'react'
import { ImageBackground, StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native'

import backgroundImage from '../assets/imgs/login.jpg'
import AuthInput from '../components/AuthInput'

export default class Auth extends Component {


    state = {
        nome: '', 
        email: '',
        senha: '',
        confirmaSenha: '',
        stageNew: false
    }


    signinOrSignup = () => {
        if(this.state.stageNew){
            Alert.alert('Sucesso!','Criar Conta')
        }else{
            Alert.alert('Sucesso!', 'Logar')
        }
    }

    render(){
        return (
            <ImageBackground source={backgroundImage} style={styles.background} >
                <Text style={styles.title} >Tasks</Text>
                <View style={styles.formContainer} >
                    <Text style={styles.subtittle} >{this.state.stageNew ? 'Crie sua conta': 'Informe seus dados'}</Text>
                    {this.state.stageNew && <AuthInput icon='user' placeholder="Nome" value={this.state.nome} style={styles.input} onChangeText={ nome => this.setState({ nome }) } /> }
                    <AuthInput icon='at' placeholder="E-mail" value={this.state.email} style={styles.input} onChangeText={ email => this.setState({ email }) } />
                    <AuthInput icon='lock' placeholder="Senha" value={this.state.senha} style={styles.input} onChangeText={ senha => this.setState({ senha }) } secureTextEntry={true} />
                    {this.state.stageNew && <AuthInput icon='asterisk' placeholder="Confirma Senha" value={this.state.confirmaSenha} style={styles.input} onChangeText={ confirmaSenha => this.setState({ confirmaSenha }) } /> }
                    <TouchableOpacity onPress={this.signinOrSignup} >
                        <View style={styles.button} >
                            <Text style={styles.buttonText} >{this.state.stageNew ? 'Registrar' : 'Entrar'}</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={{ padding: 10 }} onPress={ () => { this.setState({ stageNew: !this.state.stageNew }) } } > 
                    <Text style={styles.buttonText} >{ this.state.stageNew ? 'Já possui conta?' : 'Ainda não possui conta?' }</Text>
                </TouchableOpacity>
            </ImageBackground>
        )
    }

}

const styles = StyleSheet.create({
    title:{
        fontFamily: 'Montserrat-Regular',
        color:'#FFF',
        fontSize: 70,
        marginBottom: 10
    },
    subtittle:{
        fontFamily: 'Montserrat-Regular',
        color: '#FFF',
        fontSize: 20,
        textAlign: 'center',
        marginBottom: 10
    },
    background:{
        flex: 1,
        width: '100%',
        alignItems:'center',
        justifyContent: 'center',
    },
    input:{
        marginTop: 10,
        backgroundColor: '#FFF',
    },
    formContainer:{
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        padding: 20,
        width: '90%'
    },
    button:{
        backgroundColor: '#080',
        marginTop: 10,
        padding: 10,
        alignItems: 'center',
        borderRadius: 20
    },
    buttonText: {
        fontFamily: 'Montserrat-Regular',
        color: '#FFF',
        fontSize: 20
    }
})
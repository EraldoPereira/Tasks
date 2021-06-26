import { Alert } from "react-native";

const server = 'http://192.168.0.66:3000'

function showError(error) {
    console.log(error.response.data);
    if (error.response && error.response.data) {
        Alert.alert('Ops! Ocorreu um problema!', `Mensagem: ${error.response.data.mensagem}`)
    } else {
        Alert.alert('Ops! Ocorreu um problema!', `Mensagem: ${error}`)
    }
}

function showSuccess(msg) {
    Alert.alert('Sucesso!', msg)
}

export { server, showError, showSuccess }
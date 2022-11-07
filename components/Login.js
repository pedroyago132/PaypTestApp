import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Image, TextInput, TouchableOpacity } from 'react-native';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import '@react-native-firebase/app';
import TelaDePassagem from './TelaDePassagem';

export default function Login({ route, navigation }) {

    const [textEmail, setEmail] = useState();
    const [textSenha, setSenha] = useState();

    const [initializing, setInitializing] = useState(true);
    const [user, setUser] = useState();

    function onAuthStateChanged(user) {
        setUser(user)
        if (initializing) setInitializing(false);
    }


    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber; // unsubscribe on unmount
    }, [console.log(user)]);

    const login = () => {
        auth().signInWithEmailAndPassword(textEmail, textSenha)
            .then(() => null)
            .catch(error => alert(error))
    }

    const passagem = () => {
        navigation.navigate('TelaDePassagem')
    }

    if (!user) return (
        <View style={styles.container}>
           
            <Text style={{ fontSize: 26, padding: 20, color: 'white' }}>Clube <Text style={{ fontSize: 33, fontWeight: "bold", padding: 25, color: '#AC08A4' }} >PayP TEST</Text></Text>
            <TextInput style={{ width: 200, height: 60, color: "white", borderWidth: 1, borderColor: 'black', backgroundColor: 'grey' }} value={textEmail} placeholderTextColor='white' onChangeText={text => setEmail(text)} placeholder=' Email' />
            <TextInput style={{ marginTop: 20, width: 200, height: 60, color: "white", borderWidth: 1, borderColor: 'black', backgroundColor: "grey" }} value={textSenha} placeholderTextColor='white' onChangeText={text => setSenha(text)} placeholder='Senha' />

            <TouchableOpacity onPress={() => login()} style={{ marginTop: 30, height: 50, width: 130, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ fontWeight: 'bold', fontSize: 15, color: 'black' }}> Acessar </Text>
            </TouchableOpacity>

            <Text onPress={() => navigation.navigate('MembroNovo')} style={{ fontSize: 17, marginTop: 60, color: 'white' }}>Ainda não é membro? <Text style={{ fontSize: 22, fontWeight: "bold", padding: 10, color: '#AC08A4' }} > Cadastre-se.</Text></Text>

        </View>
    )


    navigation.navigate('TelaDePassagem')


}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '000616'
    },
    paragraph: {
        margin: 24,
        marginTop: 0,
        fontSize: 14,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    logo: {
        height: 128,
        width: 128,
        padding: 20
    }
});

import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, TextInput, ScrollView, FlatList } from 'react-native';
import storage from '@react-native-firebase/storage';
import { launchImageLibrary } from 'react-native-image-picker';
import base64 from 'react-native-base64';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import { Picker } from '@react-native-picker/picker';


export default function infoFuncionario({ navigation, route }) {
    const email = route.params.email;
    const [valorItemServ, setValorItemServ] = useState();
    const [user, setUser] = useState();


    function onAuthStateChanged(user) {
        if (user) {
            database()
                .ref(`estabelecimento/${base64.encode(user.email)}`)
                .on('value', snapshot => {
                    setUser(snapshot.val())
                });
        }
    }

    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber; // unsubscribe on unmount
    }, []);

    const ValorMesFuncionario = ({ mes }) => {
        if (user) {
            console.log(salvarDados)
            const [salvarDados, setSalvar] = useState()
            database()
                .ref(`estabelecimento/${base64.encode(user.email)}/funcionarios/${base64.encode(email)}/${mes}`)
                .on('value', snapshot => {
                    setSalvar(snapshot.val().valorMovimentado)
                });

            if (salvarDados) {
                return <Text style={{ padding: 25, borderWidth: 1, marginTop: 20, borderColor: 'black', fontSize: 15 }} >{mes} -- <Text style={{ fontWeight: 'bold', fontSize: 12,color:'green' }} >R$ {salvarDados}</Text> </Text>
            }

        }


    }



    return (

        <View style={{ flex: 1, justifyContent: "center", alignItems: 'center' }} >
            <TouchableOpacity onPress={() => navigation.navigate('ExcluirFuncionario', { email })} style={{
                height: 80, borderRadius: 60, marginTop: 20,
                width: '80%', backgroundColor: 'white', alignItems: 'center', justifyContent: "center", borderWidth: 1
            }} >
                <Text>Excluir Funcionário</Text>
            </TouchableOpacity>

            <Text>Lucro do funcionário no mês</Text>

            <ValorMesFuncionario mes='Janeiro' />
            <ValorMesFuncionario mes='Fevereiro' />
            <ValorMesFuncionario mes='Março' />
            <ValorMesFuncionario mes='Abril' />
            <ValorMesFuncionario mes='Maio' />
            <ValorMesFuncionario mes='Junho' />
            <ValorMesFuncionario mes='Julho' />
            <ValorMesFuncionario mes='Agosto' />
            <ValorMesFuncionario mes='Setembro' />
            <ValorMesFuncionario mes='Outubro' />
            <ValorMesFuncionario mes='Novembro' />
            <ValorMesFuncionario mes='Dezembro' />
        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,

        backgroundColor: '#ecf0f1',
        padding: 8,


    },
    paragraph: {
        margin: 24,
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

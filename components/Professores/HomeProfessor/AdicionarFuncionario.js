import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, TextInput, ScrollView, FlatList } from 'react-native';
import storage from '@react-native-firebase/storage';
import { launchImageLibrary } from 'react-native-image-picker';
import base64 from 'react-native-base64';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import { Picker } from '@react-native-picker/picker';


export default function AdicionarFuncionario({ navigation, route }) {
    const emailEstabelecimento = route.params.emailEstabelecimento;
    const [funcionarioList, setListFuncionarios] = useState();
    const [email, setEmail] = useState();

    const [nome, setNome] = useState(null);

    function l() {
        database().ref(`estabelecimento/${base64.encode(emailEstabelecimento)}/funcionarios/${base64.encode(email)}`)
            .set({
                nome, email
            })

        database().ref(`estabelecimento/${base64.encode(emailEstabelecimento)}/funcionarios/${base64.encode(email)}/Janeiro`)
            .set({
                quantidadeServiços: 0, valorMovimentado: 0
            })

        database().ref(`estabelecimento/${base64.encode(emailEstabelecimento)}/funcionarios/${base64.encode(email)}/Fevereiro`)
            .set({
                quantidadeServiços: 0, valorMovimentado: 0
            })

        database().ref(`estabelecimento/${base64.encode(emailEstabelecimento)}/funcionarios/${base64.encode(email)}/Março`)
            .set({
                quantidadeServiços: 0, valorMovimentado: 0
            })

        database().ref(`estabelecimento/${base64.encode(emailEstabelecimento)}/funcionarios/${base64.encode(email)}/Abril`)
            .set({
                quantidadeServiços: 0, valorMovimentado: 0
            })

        database().ref(`estabelecimento/${base64.encode(emailEstabelecimento)}/funcionarios/${base64.encode(email)}/Maio`)
            .set({
                quantidadeServiços: 0, valorMovimentado: 0
            })

        database().ref(`estabelecimento/${base64.encode(emailEstabelecimento)}/funcionarios/${base64.encode(email)}/Junho`)
            .set({
                quantidadeServiços: 0, valorMovimentado: 0
            })

        database().ref(`estabelecimento/${base64.encode(emailEstabelecimento)}/funcionarios/${base64.encode(email)}/Julho`)
            .set({
                quantidadeServiços: 0, valorMovimentado: 0
            })

        database().ref(`estabelecimento/${base64.encode(emailEstabelecimento)}/funcionarios/${base64.encode(email)}/Agosto`)
            .set({
                quantidadeServiços: 0, valorMovimentado: 0
            })

        database().ref(`estabelecimento/${base64.encode(emailEstabelecimento)}/funcionarios/${base64.encode(email)}/Setembro`)
            .set({
                quantidadeServiços: 0, valorMovimentado: 0
            })

        database().ref(`estabelecimento/${base64.encode(emailEstabelecimento)}/funcionarios/${base64.encode(email)}/Outubro`)
            .set({
                quantidadeServiços: 0, valorMovimentado: 0
            })

        database().ref(`estabelecimento/${base64.encode(emailEstabelecimento)}/funcionarios/${base64.encode(email)}/Novembro`)
            .set({
                quantidadeServiços: 0, valorMovimentado: 0
            })

        database().ref(`estabelecimento/${base64.encode(emailEstabelecimento)}/funcionarios/${base64.encode(email)}/Dezembro`)
            .set({
                quantidadeServiços: 0, valorMovimentado: 0
            })
        navigation.goBack()
    }

    function adicionar() {
        if (!email || !nome) {
            return alert('Preencha todos os campos')
        } return l()
    }

    return (


        <View style={{ flex: 1, justifyContent: "center", alignItems: 'center' }} >

            <Text style={{ fontWeight: 'bold', fontSize: 17, marginTop: 20 }} > Adicionar Funcionario/Profissional </Text>
            <Text style={{ fontWeight: 'bold', fontSize: 17, marginTop: 5 }} > do estabelecimento </Text>


            <TextInput style={{ width: '90%', height: 80, color: "black", borderBottomWidth: 1, marginTop: 15, borderColor: 'black' }} value={email} onChangeText={text => setEmail(text)} placeholder='Email' />

            <TextInput style={{ width: '90%', height: 80, color: "black", borderBottomWidth: 1, marginTop: 15, borderColor: 'black' }} value={nome} onChangeText={text => setNome(text)} placeholder='Nome' />



            <View style={{ width: '100%', alignItems: 'center', justifyContent: 'center' }}>
                <TouchableOpacity onPress={() => adicionar()} style={{ height: 80, borderRadius: 60, marginTop: 20, width: '80%', backgroundColor: 'white', alignItems: 'center', justifyContent: "center", borderWidth: 1 }}>
                    <Text  > Adicionar </Text>
                    <Text  > Funcionario/Profissional </Text>
                </TouchableOpacity>
            </View>

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

import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import base64 from 'react-native-base64';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';



export default function PerfilOuContaBancaria({ navigation }) {
    const [nome, setNome] = useState();
    const [mensalidade, setMensalidade] = useState();
    const [anoDeNascimento, setAnoDeNascimento] = useState();
    const [chavePIX, setChavePix] = useState();
    const [cpf, setCpf] = useState();
    const [selectedChavePix, setSelectedChavePix] = useState('0');

    const [initializing, setInitializing] = useState(true);
    const [user, setUser] = useState();

    function onAuthStateChanged(user) {
        if (user) {
            database().ref(`membros/${base64.encode(user.email)}`)
                .on('value', snapshot => {

                    setUser(snapshot.val());
                });
        }

        if (initializing) setInitializing(false);
    }

    function nenhumDadoSalvo() {
        navigation.goBack();
        alert('Nenhum dado alterado');
    }

    function l() {
        navigation.goBack()
        alert('Nenhum dado foi alterado')
    }


    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber; // unsubscribe on unmount
    }, [console.log(user)]);

    function sucess() {

        alert('Salvo com sucesso.')
    }

    function salvar() {
        if (selectedChavePix == '0') {
            database().ref(`membros/${base64.encode(user.email)}`)
                .update({ cpf: cpf, chavePIX: chavePIX, mensalidade: mensalidade, nome: nome, anoDeNascimento: anoDeNascimento })
                .then(e => sucess())
        } else {
            database().ref(`membros/${base64.encode(user.email)}`)
                .update({ cpf: cpf, chavePIX: chavePIX, mensalidade: mensalidade, selectedChavePix: selectedChavePix, nome: nome, anoDeNascimento: anoDeNascimento })
                .then(e => sucess())
        }

    }

    if (!user) return null;

    return (
        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ alignItems: "center", justifyContent: "center" }} >

                <Text style={{ fontWeight: 'bold', fontSize: 18, marginTop: 10 }} >Informações sobre o seu Perfil</Text>

                <Text style={{ fontWeight: 'bold', fontSize: 13, marginTop: 10 }} >Seu email: {user.email} </Text>

                <Text style={{ fontWeight: 'bold', fontSize: 13, marginTop: 10 }} >Sua senha: {user.senha} </Text>


                <Text style={{ fontWeight: 'bold', fontSize: 25, color: 'green', marginTop: 25 }} >Depósito Bancario.</Text>
                <Text style={{ fontSize: 14, marginTop: 10, color: 'grey' }} > O processo de saque leva apenas 15 horas para ser concluído e depositado na sua conta indepedente de feriados ou finais de semana,
                    faça o pedido de saque a qualquer momento e enviamos dentro do prazo! </Text>

                <Text style={{ fontWeight: 'bold', fontSize: 15, marginTop: 30, color: 'blue' }} > TIPO DE CHAVE : {user.selectedChavePix}</Text>
                <Text style={{ fontWeight: 'bold', fontSize: 15, marginTop: 10, color: "blue" }} > SUA CAHAVE PIX : {user.chavePIX} </Text>
                <Text style={{ fontWeight: 'bold', fontSize: 15, marginTop: 10, color: 'blue' }} > SEU CPF : {user.cpf}</Text>
                <Text style={{ fontSize: 13, fontWeight: 'bold', marginTop: 30, color: 'black' }} > O CPF da conta bancaria deve ser o mesmo </Text>
                <Text style={{ fontSize: 13, fontWeight: 'bold', marginTop: 10, color: 'black' }} >  registrado no app GoToPlay. </Text>

                <Text style={{ fontSize: 13, marginTop: 10, color: 'red', fontWeight: 'bold' }} > Caso contrario o pedido de saque será negado! </Text>

                <TextInput style={{ width: '90%', height: 80, color: "black", borderBottomWidth: 1, borderColor: 'black' }} value={cpf} onChangeText={text => setCpf(text)} placeholder='Digite seu CPF...' />
                <TextInput style={{ width: '90%', height: 80, color: "black", borderBottomWidth: 1, borderColor: 'black' }} value={chavePIX} onChangeText={text => setChavePix(text)} placeholder='Digite sua chave... ' />

                <Picker
                    selectedValue={selectedChavePix}
                    style={{ height: 35, width: '70%', marginTop: 20 }}
                    onValueChange={(itemValue, itemIndex) => setSelectedChavePix(itemValue)}
                >
                    <Picker.Item label="Selecionar Chave" value='0' />
                    <Picker.Item label="CPF" value="cpf" />
                    <Picker.Item label="Email" value="email" />
                    <Picker.Item label="Numero de celular" value="numeroDeCelular" />
                    <Picker.Item label="Chave Aleatoria" value="chaveAleatoria" />


                </Picker>

                <TouchableOpacity onPress={() => salvar()} style={{ height: 80, borderRadius: 60, marginTop: 20, marginBottom: 20, width: '70%', backgroundColor: 'white', alignItems: 'center', justifyContent: "center" }}>
                    <Text  > Salvar </Text>
                </TouchableOpacity>

            </ScrollView>
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

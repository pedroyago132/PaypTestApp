import React, { useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import base64 from 'react-native-base64';



export default function MembroNovo({ navigation }) {
    const [nome, setNome] = useState();
    const [senha, setSenha] = useState();
    const [confirmarSenha, setConfirmarSenha] = useState();
    const [idade, setIdade] = useState();
    const [email, setEmail] = useState();
    const [confirmarEmail, setConfirmarEmail] = useState();
    const [anoDeNascimento, setAnoDeNascimento] = useState();
    const [tipoDeMembro, setTipoDeMembro] = useState();

    const cadastro = () => {
        if (!nome || !senha || !tipoDeMembro || !confirmarEmail || !confirmarSenha || !email || tipoDeMembro == '0' || confirmarSenha != senha) {
            return alert('Verifique se todos os dados foram preenchidos ou se as senhas conferem')
        }
        auth()
            .createUserWithEmailAndPassword(email, confirmarSenha)
            .then(() => {
                const email64 = base64.encode(email);

                if (tipoDeMembro === 'estabelecimento') {
                    database().ref(`estabelecimento/${email64}`)
                        .set({ nome, senha, email, idade, anoDeNascimento, tipoDeMembro, valorDisponivel: 0 })


                    database().ref(`estabelecimento/${email64}/horariosMarcados/Janeiro`)
                        .set({ valorMovimentadoMes: 0, despesas: 0, valorRepassadoMes: 0, idMes: 1 })

                    database().ref(`estabelecimento/${email64}/horariosMarcados/Fevereiro`)
                        .set({ valorMovimentadoMes: 0, despesas: 0, valorRepassadoMes: 0, idMes: 2 })

                    database().ref(`estabelecimento/${email64}/horariosMarcados/Março`)
                        .set({ valorMovimentadoMes: 0, despesas: 0, valorRepassadoMes: 0, idMes: 3 })

                    database().ref(`estabelecimento/${email64}/horariosMarcados/Abril`)
                        .set({ valorMovimentadoMes: 0, despesas: 0, valorRepassadoMes: 0, idMes: 4 })

                    database().ref(`estabelecimento/${email64}/horariosMarcados/Maio`)
                        .set({ valorMovimentadoMes: 0, despesas: 0, valorRepassadoMes: 0, idMes: 5 })

                    database().ref(`estabelecimento/${email64}/horariosMarcados/Junho`)
                        .set({ valorMovimentadoMes: 0, despesas: 0, valorRepassadoMes: 0, idMes: 6 })

                    database().ref(`estabelecimento/${email64}/horariosMarcados/Julho`)
                        .set({ valorMovimentadoMes: 0, despesas: 0, valorRepassadoMes: 0, idMes: 7 })

                    database().ref(`estabelecimento/${email64}/horariosMarcados/Agosto`)
                        .set({ valorMovimentadoMes: 0, despesas: 0, valorRepassadoMes: 0, idMes: 8 })

                    database().ref(`estabelecimento/${email64}/horariosMarcados/Setembro`)
                        .set({ valorMovimentadoMes: 0, despesas: 0, valorRepassadoMes: 0, idMes: 9 })

                    database().ref(`estabelecimento/${email64}/horariosMarcados/Outubro`)
                        .set({ valorMovimentadoMes: 0, despesas: 0, valorRepassadoMes: 0, idMes: 10 })

                    database().ref(`estabelecimento/${email64}/horariosMarcados/Novembro`)
                        .set({ valorMovimentadoMes: 0, despesas: 0, valorRepassadoMes: 0, idMes: 11 })

                    database().ref(`estabelecimento/${email64}/horariosMarcados/Dezembro`)
                        .set({ valorMovimentadoMes: 0, despesas: 0, valorRepassadoMes: 0, idMes: 12 })



                    database().ref(`estabelecimento/${email64}/diasDisponiveis/Segunda`)
                        .set({ horarioDisponivel: 'fechado' })

                    database().ref(`estabelecimento/${email64}/diasDisponiveis/Terça`)
                        .set({ horarioDisponivel: 'fechado' })

                    database().ref(`estabelecimento/${email64}/diasDisponiveis/Quarta`)
                        .set({ horarioDisponivel: 'fechado' })

                    database().ref(`estabelecimento/${email64}/diasDisponiveis/Quinta`)
                        .set({ horarioDisponivel: 'fechado' })

                    database().ref(`estabelecimento/${email64}/diasDisponiveis/Sexta`)
                        .set({ horarioDisponivel: 'fechado' })

                    database().ref(`estabelecimento/${email64}/diasDisponiveis/Sabado`)
                        .set({ horarioDisponivel: 'fechado' })

                    database().ref(`estabelecimento/${email64}/diasDisponiveis/Domingo`)
                        .set({ horarioDisponivel: 'fechado' })


                }

                if (tipoDeMembro === 'Membro') {
                    return database().ref(`membros/${email64}`)
                        .set({ nome, senha, email, idade, anoDeNascimento, tipoDeMembro })

                }

                alert('Membro Cadastrado')

            })
            .catch(error => {
                if (error.code === 'auth/email-already-in-use') {
                    alert('Esse Email ja esta em uso!');
                }

                if (error.code === 'auth/invalid-email') {
                    alert('Endereço de email invalido!');
                }

            });

    }

    return (

        <View style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: "center",

            backgroundColor: '#ecf0f1',
            padding: 8,
        }}>

            <Picker
                selectedValue={tipoDeMembro}
                style={{ height: 50, width: '80%', marginTop: 30, marginBottom: 30 }}
                onValueChange={(itemValue, itemIndex) => setTipoDeMembro(itemValue)}
            >
                <Picker.Item label="Selecione o tipo da conta" value='0' />
                <Picker.Item label="Estabelecimento" value="estabelecimento" />
                <Picker.Item label="Membro" value="Membro" />

            </Picker>

            <TextInput placeholderTextColor='black' style={{ height: 45, width: '80%', backgroundColor: 'white', marginBottom: 5 }} value={nome} onChangeText={text => setNome(text)} placeholder='Nome' />
            <TextInput placeholderTextColor='black' style={{ height: 45, width: '80%', backgroundColor: 'white', marginBottom: 5 }} value={email} onChangeText={text => setEmail(text)} placeholder='Email' />
            <TextInput placeholderTextColor='black' style={{ height: 45, width: '80%', backgroundColor: 'white', marginBottom: 5 }} value={confirmarEmail} onChangeText={text => setConfirmarEmail(text)} placeholder='Digite novamente seu email' />
            <TextInput placeholderTextColor='black' style={{ height: 45, width: '80%', backgroundColor: 'white', marginBottom: 5 }} value={senha} onChangeText={text => setSenha(text)} placeholder='Senha' />
            <TextInput placeholderTextColor='black' style={{ height: 45, width: '80%', backgroundColor: 'white', marginBottom: 5 }} value={confirmarSenha} onChangeText={text => setConfirmarSenha(text)} placeholder='Confirmar Senha' />

            <TouchableOpacity onPress={() => cadastro()} style={{ height: 70, width: '80%', borderRadius: 50, borderWidth: 2, marginTop: 30, borderColor: 'purple', backgroundColor: 'white', alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ color: "purple" }}>Cadastrar</Text>
            </TouchableOpacity>
        </View>


    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
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

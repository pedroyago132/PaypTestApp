
import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, ImageBackground, Image, ScrollView } from 'react-native';
import database from '@react-native-firebase/database';
import base64 from 'react-native-base64';
import auth from '@react-native-firebase/auth';
import { useOpenPix } from '@openpix/react';
import { ThemeProvider } from 'styled-components';
import { ToastProvider } from 'react-native-styled-toast';
import { Provider as PaperProvider } from 'react-native-paper';



export default function ConfirmarHorario({ route, navigation }) {

    const dataEstabelecimento = route.params.dataEstabelecimento;
    const semana = route.params.semana;
    const horas = route.params.horas;
    const dia = route.params.dia;
    const mesNome = route.params.mesNome;
    const minutos = route.params.minutos;
    const valorItemServ = route.params.valorItemServ;
    const nomeItem = route.params.nomeItem;
    const nomeFuncionario = route.params.nomeFuncionario;
    const valorMovimentado = route.params.valorItemServ;
    const quantidadeServiços = route.params.quantidadeServiços;
    const email = route.params.email;
    const nomeProfissional = route.params.nome;
    const dataHoraPagamento = new Date();
    const valorRepassado = route.params.valorRepassado;
    const despesas = route.params.despesas;


    const [user, setUser] = useState();
    const [initializing, setInitializing] = useState(true);
    const [infoFuncionario, setInfoFuncionario] = useState(true);
    const [infoMes, setInfoMes] = useState(true);
    const [infoEstabelecimento, setInfoEstabelecimento] = useState(true);
    const [mesNumero, setMesNumero] = useState(true);



    function onAuthStateChanged(user) {
        if (user) {
            database()
                .ref(`membros/${base64.encode(user.email)}`)
                .on('value', snapshot => {
                    setUser(snapshot.val())
                })

        }
        if (initializing) setInitializing(false);
    }

    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber; // unsubscribe on unmount
    }, [console.log(mesNome)]);


    useEffect(() => {
        database()
            .ref(`estabelecimento/${base64.encode(dataEstabelecimento.emailEstabelecimento)}/funcionarios/${base64.encode(email)}`)
            .on('value', snapshot => {

                setInfoFuncionario(snapshot.val())
            })
    }, [])

    useEffect(() => {
        database()
            .ref(`estabelecimento/${base64.encode(dataEstabelecimento.emailEstabelecimento)}/horariosMarcados/${mesNome}`)
            .on('value', snapshot => {

                setInfoMes(snapshot.val())
            })
    }, [])

    useEffect(() => {
        database()
            .ref(`estabelecimento/${base64.encode(dataEstabelecimento.emailEstabelecimento)}`)
            .on('value', snapshot => {

                setInfoEstabelecimento(snapshot.val())
            })
    }, [])

    useEffect(() => {
        carregarNumeroMes()
    }, [])

    function carregarNumeroMes() {
        if (mesNome == 'Janeiro') {
            setMesNumero(1)
        }

        if (mesNome == 'Fevereiro') {
            setMesNumero(2)
        }

        if (mesNome == 'Março') {
            setMesNumero(3)
        }

        if (mesNome == 'Abril') {
            setMesNumero(4)
        }

        if (mesNome == 'Maio') {
            setMesNumero(5)
        }

        if (mesNome == 'Junho') {
            setMesNumero(6)
        }

        if (mesNome == 'Julho') {
            setMesNumero(7)
        }

        if (mesNome == 'Agosto') {
            setMesNumero(8)
        }

        if (mesNome == 'Setembro') {
            setMesNumero(9)
        }

        if (mesNome == 'Outubro') {
            setMesNumero(10)
        }

        if (mesNome == 'Novembro') {
            setMesNumero(11)
        }

        if (mesNome == 'Dezembro') {
            setMesNumero(12)
        }
    }


    const uploadDadosProfissional = () => {

        database().ref(`estabelecimento/${base64.encode(dataEstabelecimento.emailEstabelecimento)}/horariosMarcados/${mesNome}/horarios`)
            .push({ emailFuncionario: email, disponivel: false, dia, semana, horas, minutos, mesNome, emailCliente: user.email, nomeProfissional, mesNumero, nomeItem, valorRepassado, despesas, valorItemServ, nomePagador: user.nome, pagamentoConfirmado: false, emailEstabelecimento: dataEstabelecimento.emailEstabelecimento })


        database().ref(`estabelecimento/${base64.encode(dataEstabelecimento.emailEstabelecimento)}/horariosFuncionarios/${base64.encode(email)}/${semana}${dia}${mesNome}${horas}${minutos}`)
            .set({ emailFuncionario: email, disponivel: false, dia, semana, horas, minutos, mesNome, nomeProfissional, emailCliente: user.email, mesNumero, nomeItem, valorRepassado, despesas, valorItemServ, nomePagador: user.nome, pagamentoConfirmado: false }).then(() => navigation.navigate('MenuTabnavigationUser'))


        database().ref(`estabelecimento/${base64.encode(dataEstabelecimento.emailEstabelecimento)}/agendamentos`) /* MIGRAR PARA COMPROVANTE */
            .push({ emailFuncionario: email, dia, horas, minutos, semana, mesNome, emailCliente: user.email, mesNumero, valorRepassado, despesas, nomeProfissional, nomeItem, valorItemServ, nomePagador: user.nome, pagamentoConfirmado: false, emailEstabelecimento: dataEstabelecimento.emailEstabelecimento }).then(() => alert('Horário Marcado com sucesso!'))



        database().ref(`membros/${base64.encode(user.email)}/horarios`)
            .push({ emailFuncionario: email, dia, horas, minutos, mesNome, semana, nomeProfissional, nomeItem, mesNumero, valorItemServ, nomePagador: user.nome, dataHoraPagamento, emailEstabelecimento: dataEstabelecimento.emailEstabelecimento, pagamentoConfirmado: false })


    }

    function marcarHorario() {
        database().ref(`estabelecimento/${base64.encode(dataEstabelecimento.emailEstabelecimento)}/horarios/${base64.encode(email)}/${semana}${dia}${mesNome}${horas}${minutos}`)
            .once('value')
            .then(snapshot => {
                if (snapshot.val() == null) {
                    return uploadDadosProfissional()
                } else {
                    return alert('Funcionario não disponível para esse horário')
                }
            });
    }


    return (
        <View style={styles.container}>

            <Text style={{ fontSize: 20, marginTop: '30%' }}> Confirmar horário com {nomeProfissional}</Text>
            <Text style={{ fontSize: 20, marginTop: 15, color: '#FA35F1' }}> Item Selecionado: {nomeItem}</Text>
            <Text style={{ fontSize: 20, marginTop: 30 }}> {semana}</Text>
            <Text style={{ fontSize: 16, fontWeight: 'bold', marginTop: 10 }}>Dia {dia} - {mesNome}</Text>
            <Text style={{ padding: 10, fontSize: 18, fontWeight: 'bold' }}> {horas}:{minutos} hrs</Text>
            <Text style={{ padding: 10, color: 'grey', fontWeight: 'bold', fontSize: 17 }}> Valor: R$ {valorItemServ}</Text>

            <TouchableOpacity onPress={() => marcarHorario()} style={{ width: '80%', height: 70, alignItems: 'center', marginTop: 20, justifyContent: 'center', backgroundColor: 'white', borderWidth: 1, borderColor: 'purple' }}>
                <Text style={{ padding: 10, color: 'purple' }}> Realizar Agendamento</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'E0E0E0',
        justifyContent: 'center',
        alignItems: 'center'

    },
    paragraph: {
        margin: 24,
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

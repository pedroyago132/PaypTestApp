import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Image, FlatList, TouchableOpacity } from 'react-native';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import '@react-native-firebase/app';
import { Picker } from '@react-native-picker/picker';
import base64 from 'react-native-base64';

export default function VerificarFuncionarios({ route, navigation }) {

    const dataEstabelecimento = route.params.dataEstabelecimento;
    const semana = route.params.semana;
    const horas = route.params.horas;
    const dia = route.params.dia;
    const mesNome = route.params.mesNome;
    const minutos = route.params.minutos;
    const valorItemServ = route.params.valorItemServ;
    const despesas = route.params.despesas;
    const valorRepassado = route.params.valorRepassado;
    const nomeItem = route.params.nomeItem;
    const [textEmail, setEmail] = useState('Email');
    const [textSenha, setSenha] = useState('Senha');

    const [initializing, setInitializing] = useState(true);
    const [funcionarios, setFuncionarios] = useState();
    const [countValor, setCountValor] = useState();



    useEffect(() => {
        database()
            .ref(`estabelecimento/${base64.encode(dataEstabelecimento.emailEstabelecimento)}/funcionarios`)
            .on('value', snapshot => {
                var li = [];

                snapshot.forEach((child) => {

                    li.push({
                        key: child._snapshot.key,
                        nome: child.val().nome,
                        email: child.val().email,
                        valorDisponivel: child.val().valorDisponivel,
                        quantidadeServiços: child.val().quantidadeServiços,
                        valorMovimentado: child.val().valorMovimentado

                    });
                    setFuncionarios(li)

                })
            })
    }, [])

    function uploadLucroProfissional() {
        database().ref(`estabelecimento/${base64.encode(dataEstabelecimento.emailEstabelecimento)}/funcionarios/${base64.encode(item.email)}`)
            .update({ quantidade: 0 }).then(() => alert('Horario Marcado'))

    }

    /* FILTRAR PROFISSIONAL PELA CAEGORIA DO ITEM , (RECEBER PARAMENTROS "CATEGORIA" EM VERIFICARitens ) */

    function uploadDadosProfissionl({ item, nomeItem }) {
        const somarQuantidade = parseInt(item.quantidadeServiços) + parseInt(1)
        const somarValorMovimentado = parseInt(item.valorMovimentado) + parseInt(valorItemServ)

        database().ref(`estabelecimento/${base64.encode(dataEstabelecimento.emailEstabelecimento)}/horarios/${base64.encode(item.email)}/${semana}${dia}${mes}${horas}${minutos}`)
            .set({ email: item.email, disponivel: false }).then(() => navigation.navigate('MenuTabnavigationUser'))

        database().ref(`estabelecimento/${base64.encode(dataEstabelecimento.emailEstabelecimento)}/funcionarios/${base64.encode(item.email)}`)
            .update({ quantidadeServiços: somarQuantidade, valorMovimentado: somarValorMovimentado }).then(() => alert('Horario Marcado'))


    }

    function marcarHorario({ item }) {
        database().ref(`estabelecimento/${base64.encode(dataEstabelecimento.emailEstabelecimento)}/horarios/${base64.encode(item.email)}/${semana}${dia}${mes}${horas}${minutos}`)
            .once('value')
            .then(snapshot => {
                if (snapshot.val() == null) {
                    return uploadDadosProfissionl({ item, nomeItem })
                } else {
                    return alert('Funcionario não disponível para esse horário')
                }
            });
    }

    const renderItem = ({ item }) => (

        <TouchableOpacity key={item.key} onPress={() => navigation.navigate('ConfirmarHorario', { dataEstabelecimento, semana, dia, mesNome, horas, minutos, valorItemServ, nomeItem, nomeProfissional: item.nome, quantidadeServiços: item.quantidadeServiços, valorMovimentado: item.valorMovimentado, email: item.email, nome: item.nome, despesas, valorRepassado })} style={{ height: 80, width: '100%', backgroundColor: "white", flexDirection: "row", borderWidth: 2, alignItems: "center", marginTop: 10, justifyContent: "center" }} >
            <Text style={{ fontWeight: 'bold', fontSize: 13, padding: 10 }} >
                {item.nome}

            </Text>

            <Text style={{ fontWeight: 'bold', fontSize: 13, padding: 10 }} >
                {item.email}
            </Text>
        </TouchableOpacity>
    )


    if (!funcionarios) return <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Não há funcionarios</Text>
    </View>

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>

            <Text style={{ fontWeight: 'bold', fontSize: 18 }} >Selecione o profissional de preferência:</Text>

            <FlatList
                data={funcionarios}
                renderItem={renderItem}
                keyExtractor={item => item.id}
            />

        </View>

    )


}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'black'
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

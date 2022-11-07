import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Image, FlatList, TouchableOpacity } from 'react-native';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import '@react-native-firebase/app';
import { Picker } from '@react-native-picker/picker';
import base64 from 'react-native-base64';

export default function VerificarItens({ route, navigation }) {

    const dataEstabelecimento = route.params.dataEstabelecimento;
    const semana = route.params.semana;
    const horas = route.params.horas;
    const dia = route.params.dia;
    const mes = route.params.mes;
    const minutos = route.params.minutos;
    const [textEmail, setEmail] = useState('Email');
    const [textSenha, setSenha] = useState('Senha');
    const [mesNome, setMesNome] = useState();

    const [initializing, setInitializing] = useState(true);
    const [listItem, setListItens] = useState();

    function onAuthStateChanged(user) {
        if (user) {
            database()
                .ref(`estabelecimento/${base64.encode(dataEstabelecimento.emailEstabelecimento)}/itemServ`)
                .on('value', snapshot => {
                    var li = [];

                    snapshot.forEach((child) => {

                        li.push({
                            key: child._snapshot.key,
                            nomeItem: child.val().nomeItem,
                            valorItemServ: child.val().valorItemServ,
                            valorRepassado: child.val().valorRepassado,
                            despesas: child.val().despesas

                        });
                        setListItens(li)

                    })
                })
        }
        if (initializing) setInitializing(false);
    }

    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber; // unsubscribe on unmount
    }, [console.log(minutos)]);


    useEffect(() => {
        renderMesNome();
    }, [])


    function renderMesNome() {
        if (mes == '1') {
            setMesNome('Janeiro')
        }
        if (mes == '2') {
            setMesNome('Fevereiro')
        }
        if (mes == '3') {
            setMesNome('Março')
        }
        if (mes == '4') {
            setMesNome('Abril')
        }
        if (mes == '5') {
            setMesNome('Maio')
        }
        if (mes == '6') {
            setMesNome('Junho')
        }
        if (mes == '7') {
            setMesNome('Julho')
        }
        if (mes == '8') {
            setMesNome('Agosto')
        }
        if (mes == '9') {
            setMesNome('Setembro')
        }
        if (mes == '10') {
            setMesNome('Outubro')
        }
        if (mes == '11') {
            setMesNome('Novembro')
        }
        if (mes == '12') {
            setMesNome('Dezembro')
        }
    }

    const renderItem = ({ item }) => (
        <TouchableOpacity onPress={() => navigation.navigate('VerificarFuncionarios', { dataEstabelecimento, semana, dia, mesNome: mesNome, horas, minutos, valorItemServ: item.valorItemServ, nomeItem: item.nomeItem, despesas: item.despesas, valorRepassado: item.valorRepassado })} style={{ height: 80, width: '100%', backgroundColor: "white", flexDirection: "row", borderWidth: 2, alignItems: "center", marginTop: 20, justifyContent: "center" }} >
            <Text style={{ fontWeight: 'bold', fontSize: 17, padding: 10, color: 'black' }} >
                {item.nomeItem}

            </Text>

            <Text style={{ fontWeight: 'bold', fontSize: 17, color: 'green', padding: 10 }} >
                R${item.valorItemServ}
            </Text>
        </TouchableOpacity>
    )

    if (!listItem) return <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Nenhum Serviço/Item adicionado</Text>
    </View>

    return (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>

            <Text style={{ fontSize: 14, fontWeight: 'bold', marginTop: 50 }} >Horário que esta sendo agendado:</Text>
            <Text style={{ padding: 10, fontSize: 17 }} >{semana} {dia} {mesNome} ---- {horas}:{minutos}hrs </Text>

            <FlatList
                data={listItem}
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

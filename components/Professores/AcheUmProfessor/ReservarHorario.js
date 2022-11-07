import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import base64 from 'react-native-base64';
import { Picker } from '@react-native-picker/picker';

export default function ReservarHorario({ route, navigation }) {

    const dataEstabelecimento = route.params.dataEstabelecimento
    const [initializing, setInitializing] = useState(true);
    const [mes, setMes] = useState();
    const [dia, setDia] = useState();
    const [semana, setSemana] = useState();
    const [minutos, setMinutos] = useState();
    const [horas, setHoras] = useState();
    const [listItemServ, setListItemServ] = useState();
    const [funcionarioList, setListFuncionarios] = useState();
    const [funcionario, setFuncionario] = useState(null);
    const [infoUser, setInfoUser] = useState(null);
    const [diaSemana, setDiaSemana] = useState(null);

    let mesParaVerificacao = new Date().getMonth() + 1;

    function onAuthStateChanged(user) {
        setInfoUser(user)
        if (initializing) setInitializing(false);
    }

    function verificarMes() {

    }

    useEffect(() => {
        database()
            .ref(`estabelecimento/${base64.encode(dataEstabelecimento.emailEstabelecimento)}/itemServ`) /* ADICINAR TIPO DE SERVIÇO ANTES */
            .on('value', snapshot => {
                console.log(snapshot.val())
                var li = [];

                snapshot.forEach((child) => {

                    li.push({
                        key: child._snapshot.key,
                        valorItemServ: child.val().valorItemServ,
                        nomeItem: child.val().nomeItem

                    });
                    setListItemServ(li)

                })
            })
    }, [])

    useEffect(() => {
        database()
            .ref(`estabelecimento/${base64.encode(dataEstabelecimento.emailEstabelecimento)}/funcionarios`)
            .on('value', snapshot => {
                console.log(snapshot.val())
                var li = [];

                snapshot.forEach((child) => {

                    li.push({
                        key: child._snapshot.key,
                        nome: child.val().nome,
                        email: child.val().email

                    });
                    setListFuncionarios(li)

                })
            })
    }, [])

    useEffect(() => {
        database()
            .ref(`estabelecimento/${base64.encode(dataEstabelecimento.emailEstabelecimento)}/`)
            .on('value', snapshot => {
                setInfoUser(snapshot.val())
            })
    }, [])


    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber; // unsubscribe on unmount
    }, [console.log(dataEstabelecimento.emailEstabelecimento)]);

    function carregarItens() {
        if (!listItemServ) {
            return <Text>Nenhum item ou serviço adicinado</Text>
        } else {
            return <View style={{ width: '80%' }}>
                {
                    listItemServ.map(item => <TouchableOpacity style={{ alignItems: 'center', justifyContent: 'center', height: 70, width: '100%', backgroundColor: "white", borderWidth: 1, borderColor: 'black', flexDirection: "row" }}>
                        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={{ color: 'black', fontWeight: 'bold' }} >{item.nomeItem}  </Text>
                        </View>

                        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={{ fontWeight: 'bold', color: 'green' }} >-R$ {item.valorItemServ} </Text>
                        </View>

                    </TouchableOpacity>)
                }
            </View>
        }
    }

    function l() {
        if (horas == '0' || minutos == '01' || !mes || !semana || !dia) {
            alert('Preencha todos os campos')
        } else {
            disponibilidadeDia()

        }

    }




    function disponibilidadeDia() {
        database()
            .ref(`estabelecimento/${base64.encode(dataEstabelecimento.emailEstabelecimento)}/diasDisponiveis/${semana}`)
            .on('value', snapshot => {
                if (snapshot.val().horarioDisponivel == 'aberto') {
                    horarioFuncionamento({ dataFuncionamento: snapshot.val() })
                } else {
                    alert(`Estabelecimento fechado na(o) ${semana}`)
                }
            })
    }

    function horarioFuncionamento({ dataFuncionamento }) {

        if (horas >= dataFuncionamento.horasAbertura || horas <= dataFuncionamento.horasFechamento) {
            navigation.navigate('VerificarItens', { dataEstabelecimento, semana, dia, mes, horas, minutos })
        } else {
            alert('Estabelecimento fechado nesse horário')
        }

    }

    return (
        <ScrollView contentContainerStyle={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}  >
            <Text style={{ fontSize: 22, color: "black", fontWeight: 'bold' }} > Marcação de horario</Text>

            <Picker
                selectedValue={semana}
                style={{ height: 50, marginTop: 20, width: '70%', marginTop: 5 }}
                onValueChange={(itemValue, itemIndex) => setSemana(itemValue)}
            >
                <Picker.Item label="Dia da semana" value='0' />
                <Picker.Item label="Domingo" value="Domingo" />
                <Picker.Item label="Segunda" value="Segunda" />
                <Picker.Item label="Terça" value="Terça" />
                <Picker.Item label="Quarta" value="Quarta" />
                <Picker.Item label="Quinta" value="Quinta" />
                <Picker.Item label="Sexta" value="Sexta" />
                <Picker.Item label="Sabado" value="Sabado" />
            </Picker>

            <Picker
                selectedValue={dia}
                style={{ height: 50, marginTop: 10, width: '70%', marginTop: 15 }}
                onValueChange={(itemValue, itemIndex) => setDia(itemValue)}
            >
                <Picker.Item label="Dia do mês" value='0' />
                <Picker.Item label="1" value="1" />
                <Picker.Item label="2" value="2" />
                <Picker.Item label="3" value="3" />
                <Picker.Item label="4" value="4" />
                <Picker.Item label="5" value="5" />
                <Picker.Item label="6" value="6" />
                <Picker.Item label="7" value="7" />
                <Picker.Item label="8" value="8" />
                <Picker.Item label="9" value="9" />
                <Picker.Item label="10" value="10" />
                <Picker.Item label="11" value="11" />
                <Picker.Item label="12" value="12" />
                <Picker.Item label="13" value="13" />
                <Picker.Item label="14" value="14" />
                <Picker.Item label="15" value="15" />
                <Picker.Item label="16" value="16" />
                <Picker.Item label="17" value="17" />
                <Picker.Item label="18" value="18" />
                <Picker.Item label="19" value="19" />
                <Picker.Item label="20" value="20" />
                <Picker.Item label="21" value="21" />
                <Picker.Item label="22" value="22" />
                <Picker.Item label="23" value="23" />
                <Picker.Item label="24" value="24" />
                <Picker.Item label="25" value="25" />
                <Picker.Item label="26" value="26" />
                <Picker.Item label="27" value="27" />
                <Picker.Item label="28" value="28" />
                <Picker.Item label="29" value="29" />
                <Picker.Item label="30" value="30" />
                <Picker.Item label="31" value="31" />
            </Picker>

            <Picker
                selectedValue={mes}
                style={{ height: 50, width: '70%', marginTop: 15 }}
                onValueChange={(itemValue, itemIndex) => setMes(itemValue)}
            >
                <Picker.Item label="Mes" value='0' />
                <Picker.Item label="Janeiro" value="1" />
                <Picker.Item label="Fevereiro" value="2" />
                <Picker.Item label="Março" value="3" />
                <Picker.Item label="Abril" value="4" />
                <Picker.Item label="Maio" value="5" />
                <Picker.Item label="Junho" value="6" />
                <Picker.Item label="Julho" value="7" />
                <Picker.Item label="Agosto" value="8" />
                <Picker.Item label="Setembro" value="9" />
                <Picker.Item label="Outubro" value="10" />
                <Picker.Item label="Novembro" value="11" />
                <Picker.Item label="Dezembro" value="12" />
            </Picker>

            <View style={{ height: 80, width: '45%', flexDirection: 'row', alignItems: 'center', justifyContent: "center" }}>

                <Picker
                    selectedValue={horas}
                    style={{ height: 70, width: '70%', marginTop: 15 }}
                    onValueChange={(itemValue, itemIndex) => setHoras(itemValue)}
                >
                    <Picker.Item label="Horas" value='0' />
                    <Picker.Item label="5" value="5" />
                    <Picker.Item label="6" value="6" />
                    <Picker.Item label="7" value="7" />
                    <Picker.Item label="8" value="8" />
                    <Picker.Item label="9" value="9" />
                    <Picker.Item label="10" value="10" />
                    <Picker.Item label="11" value="11" />
                    <Picker.Item label="12" value="12" />
                    <Picker.Item label="13" value="13" />
                    <Picker.Item label="14" value="14" />
                    <Picker.Item label="15" value="15" />
                    <Picker.Item label="16" value="16" />
                    <Picker.Item label="17" value="17" />
                    <Picker.Item label="18" value="18" />
                    <Picker.Item label="19" value="19" />
                    <Picker.Item label="20" value="20" />
                    <Picker.Item label="21" value="21" />
                    <Picker.Item label="22" value="22" />
                    <Picker.Item label="23" value="23" />
                    <Picker.Item label="00" value="00" />
                </Picker>
                <Text style={{ fontWeight: 'bold', fontSize: 30 }} >:</Text>
                <Picker
                    selectedValue={minutos}
                    style={{ height: 50, width: '70%', marginTop: 5 }}
                    onValueChange={(itemValue, itemIndex) => setMinutos(itemValue)}
                >
                    <Picker.Item label="Minutos" value='01' />
                    <Picker.Item label="00" value="00" />
                    <Picker.Item label="30" value="30" />
                </Picker>


            </View>



            <TouchableOpacity onPress={() => l()} style={{ height: 80, marginTop: 20, borderRadius: 60, width: '60%', alignItems: 'center', justifyContent: 'center', backgroundColor: '#00FF91' }}>
                <Text style={{ color: 'black', fontWeight: 'bold' }} >Selecionar Serviço</Text>
            </TouchableOpacity>

        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ecf0f1',
        padding: 8,
        alignItems: "center",
        justifyContent: 'center'
    },
    paragraph: {
        margin: 24,
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

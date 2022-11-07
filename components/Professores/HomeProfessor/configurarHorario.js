import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, TextInput, ScrollView, FlatList } from 'react-native';
import storage from '@react-native-firebase/storage';
import { launchImageLibrary } from 'react-native-image-picker';
import base64 from 'react-native-base64';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import { Picker } from '@react-native-picker/picker';


export default function ConfigurarHorario({ navigation, route }) {

    const nomeDia = route.params.nomeDia;
    const [user, setUser] = useState(null);
    const [fechado, setFechado] = useState(false);
    const [infoFechado, setInfoFechado] = useState('fechado');
    const [corBotao, setCorBotao] = useState('grey');
    const [horasFechamento, setHorasFechamento] = useState();
    const [horasAbertura, setHorasAbertura] = useState();
    const [infoDia, setInfoDia] = useState();





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




    const estabelecimentoFechado = () => {
        if (corBotao === 'grey') {
            setFechado(true);
            setInfoFechado('aberto');
            setCorBotao('green');
        } if (corBotao === 'green') {
            setFechado(false);
            setCorBotao('grey');
            setInfoFechado('fechado');
        }
    };

    useEffect(() => {
        if (user) {
            database()
                .ref(`estabelecimento/${base64.encode(user.email)}/diasDisponiveis/${nomeDia}`)
                .on('value', snapshot => {
                    setInfoDia(snapshot.val())
                });
        } return null

    }, [])

    function enviarDadosHorario() {
        if (infoFechado == 'fechado' || horasAbertura == '01' || horasFechamento == '01') {
            alert('Estebalecimento Sem horario de abertura ou fechamento nesse dia');
        } else {
            database()
                .ref(`estabelecimento/${base64.encode(user.email)}/diasDisponiveis/${nomeDia}`)
                .update({ horarioDisponivel: infoFechado, horasAbertura, horasFechamento })
        }

    }

    function conditionalText() {
        if (infoFechado == 'fechado') {
            return <View>
                <Text style={{ color: 'white' }} > Estabelecimento Fechado</Text>
                <Text style={{ color: 'white' }}  > Caso ele abra, CLIQUE AQUI</Text>

            </View>
        } else {
            return <View>
                <Text style={{ color: 'white' }} > Estabelecimento Aberto {nomeDia}</Text>
                <Text style={{ color: 'white' }}  > Caso ele Feche, CLIQUE AQUI</Text>

            </View>
        }
    }

    function renderPickerConditionalAbertura() {
        if (infoFechado == 'aberto') {
            return <Picker
                selectedValue={horasAbertura}
                style={{ height: 70, width: '70%', marginTop: 15, borderWidth: 1 }}
                onValueChange={(itemValue, itemIndex) => setHorasAbertura(itemValue)}
            >
                <Picker.Item label="Horário de abertura" value='01' />
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
            </Picker>




        } return null
    }

    function renderPickerConditionalFechado() {
        if (infoFechado == 'aberto') {
            return <Picker
                selectedValue={horasFechamento}
                style={{ height: 70, width: '70%', marginTop: 15, borderWidth: 1 }}
                onValueChange={(itemValue, itemIndex) => setHorasFechamento(itemValue)}
            >
                <Picker.Item label="Horário de abertura" value='01' />
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
            </Picker>




        } return null
    }

    return (


        <View style={{ flex: 1, justifyContent: "center", alignItems: 'center' }} >

            <Text>Determine aqui o horário de funcionamento do dia:</Text>

            <Text style={{ padding: 10, fontSize: 22, fontWeight: 'bold' }} >{nomeDia}</Text>


            {
                renderPickerConditionalAbertura()
            }

            {
                renderPickerConditionalFechado()
            }



            <TouchableOpacity onPress={() => estabelecimentoFechado()} style={{ width: '70%', height: 80, alignItems: 'center', justifyContent: 'center', backgroundColor: corBotao, }}>
                {
                    conditionalText()
                }
            </TouchableOpacity>


            <TouchableOpacity onPress={() => enviarDadosHorario()} style={{ height: 80, marginTop: 20, width: '75%', backgroundColor: "white", alignItems: "center", justifyContent: "center" }}>
                <Text>Adicionar Horário</Text>
            </TouchableOpacity>

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

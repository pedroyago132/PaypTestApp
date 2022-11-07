import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import database from '@react-native-firebase/database';
import base64 from 'react-native-base64';
import auth from '@react-native-firebase/auth';


export default function CriarTurma({ navigation }) {

    const [mes, setMes] = useState(null);
    const [semana, setSemana] = useState();
    const [horas, setHoras] = useState()
    const [minutos, setMinutos] = useState()
    const [dia, setDia] = useState()

    const [initializing, setInitializing] = useState(true);
    const [user, setUser] = useState();
    const [valorACobrar, setValorAcobrar] = useState();

    let diaMensal = new Date().getMonth() + 1;

    function onAuthStateChanged(user) {
        if (user) {
            database().ref(`membros/${base64.encode(user.email)}`)
                .on('value', snapshot => {

                    setUser(snapshot.val());
                    console.log(snapshot.val())
                });
            if (initializing) setInitializing(false);
        } return null

    }


    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber; // unsubscribe on unmount
    }, []);



    const AdicionarHorario = () => {
        if (!horas || !minutos || dia == '0' || !valorACobrar || mes == '0' || semana == '0') {
            alert('Preencha todos os campos')
        } else {
            console.log(user.email)
            database().ref(`membros/${base64.encode(user.email)}/horarios`)
                .push({
                    minutos, email: user.email, diaMensal: `Dia ${diaMensal}`, semana,
                    horas, nome: user.nome, disponivel: 'disponivel', valorACobrar
                })

            alert('Horário adicionado, aguardando pagamento.')
        }

    }

    if (!user) return null


    return (
        <ScrollView contentContainerStyle={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}  >
            <Text style={{ fontSize: 22, color: "black", fontWeight: 'bold' }} > DEFINIR HORÁRIO</Text>

            <Text style={{ fontSize: 17, color: "black", fontWeight: 'bold' }} > Informe a data:</Text>
            <Picker
                selectedValue={semana}
                style={{ height: 70, width: '70%', marginTop: 5 }}
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
                style={{ height: 70, width: '70%', marginTop: 15 }}
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
                style={{ height: 70, width: '70%', marginTop: 15 }}
                onValueChange={(itemValue, itemIndex) => setMes(itemValue)}
            >
                <Picker.Item label="Mes" value='0' />
                <Picker.Item label="Janeiro" value="Janeiro" />
                <Picker.Item label="Fevereiro" value="Fevereiro" />
                <Picker.Item label="Março" value="Março" />
                <Picker.Item label="Abril" value="Abril" />
                <Picker.Item label="Maio" value="Maio" />
                <Picker.Item label="Junho" value="Junho" />
                <Picker.Item label="Julho" value="Julho" />
                <Picker.Item label="Agosto" value="Agosto" />
                <Picker.Item label="Setembro" value="Setembro" />
                <Picker.Item label="Outubro" value="Outubro" />
                <Picker.Item label="Novembro" value="Novembro" />
                <Picker.Item label="Dezembro" value="Dezembro" />
            </Picker>

            <View style={{ height: 80, width: '45%', flexDirection: 'row', alignItems: 'center', justifyContent: "center" }}>

                <TextInput keyboardType='numeric' maxLength={4} value={horas} onChangeText={setHoras} style={{ height: 80, marginRight: 20, width: '60%', borderBottomWidth: 2, borderColor: 'black' }} placeholder='HORAS' />

                <Text style={{ fontWeight: 'bold', fontSize: 30 }} >:</Text>
                <TextInput keyboardType='numeric' maxLength={4} value={minutos} onChangeText={setMinutos} style={{ height: 80, marginLeft: 20, width: '60%', borderBottomWidth: 2, borderColor: 'black' }} placeholder='MINUTOS' />

            </View>


            <TextInput keyboardType='numeric' maxLength={4} value={valorACobrar} onChangeText={setValorAcobrar} style={{ height: 80, width: '60%', borderBottomWidth: 2, borderColor: 'black' }} placeholder='Valor a cobrar R$' />

            <TouchableOpacity onPress={() => AdicionarHorario()} style={{ height: 80, marginTop: 20, borderRadius: 60, width: '60%', alignItems: 'center', justifyContent: 'center', backgroundColor: '#00FF91' }}>
                <Text style={{ color: 'black', fontWeight: 'bold' }} >Gerar Horário</Text>
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

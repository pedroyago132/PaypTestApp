import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Image, ImageBackground, FlatList } from 'react-native';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import base64 from 'react-native-base64';



export default function TurmaDoDia({ navigation }) {
    const [agendamentos, setAgendamentos] = useState();
    const [initializing, setInitializing] = useState(true);
    const [agendamentosEcarregamentos, setListaAgendamentoCarregar] = useState(true);
    const [infoEstabelecimento, setInfoEstabelecimento] = useState();

    const d = new Date();
    const today = d.getDate();
    const month = d.getMonth() + 1;

    function onAuthStateChanged(user) {
        if (user) {
            database().ref(`estabelecimento/${base64.encode(user.email)}/agendamentos`)
                .on('value', (snapshot) => {
                    var li = [];
                    snapshot.forEach((child) => {

                        li.push({

                            key: child._snapshot.key,
                            minutos: child.val().minutos,
                            dia: child.val().dia,
                            horas: child.val().horas,
                            valorItemServ: child.val().valorItemServ,
                            semana: child.val().semana,
                            mes: child.val().mes,
                            disponivel: child.val().disponivel,
                            nomeProfissional: child.val().nomeProfissional,
                            nomePagador: child.val().nomePagador,
                            emailFuncionario: child.val().emailFuncionario,
                            emailCliente: child.val().emailCliente,
                            nomeItem: child.val().nomeItem,
                            valorRepassado: child.val().valorRepassado,
                            despesas: child.val().despesas,
                            pagamentoConfirmado: child.val().pagamentoConfirmado,
                            mesNumero: child.val().mesNumero,
                            emailEstabelecimento: child.val().emailEstabelecimento,
                            mesNome: child.val().mesNome


                        });
                        setAgendamentos(li)
                    })

                });

            database().ref(`estabelecimento/${base64.encode(user.email)}`)
                .on('value', (snapshot) => {
                    var li = [];
                    setInfoEstabelecimento(snapshot.val())
                });
        }
    }


    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber; // unsubscribe on unmount
    }, [console.log(agendamentos)]);

    function ordenar() {
        const c = agendamentos.sort((a, b) => a.horas - b.horas)

        setListaAgendamentoCarregar(c)

    }



    function renderItem({ item }) {
        if (item.dia == today && item.mesNumero == month) {
            return <TouchableOpacity onPress={() => navigation.navigate('Comprovantes', { infoComprovante: item, tipoUsuario: 'estabelecimentoHorario' })} style={{ marginTop: 7, borderTopWidth: 2, borderColor: 'white', backgroundColor: 'center' }}>
                <ImageBackground source={require('../../../assets/payment.png')} style={{ width: 350, height: 200, flexDirection: 'row' }}>
                    <View style={{ flex: 1, backgroundColor: 'black', flexDirection: 'row', opacity: 0.8 }}>


                        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                            <Text style={{ padding: 2, fontSize: 12, color: 'white', fontWeight: 'bold' }} > <Text>Cliente:</Text>  {item.nomePagador}</Text>
                            <Text style={{ padding: 2, fontSize: 12, color: "white", fontWeight: 'bold' }} >{item.nomeItem}</Text>
                            <Text style={{ padding: 2, fontSize: 12, color: "green", fontWeight: 'bold' }} >R$ {item.valorItemServ}</Text>
                             <Text style={{ padding: 2, fontSize: 12, color: "white", fontWeight: 'bold' }} >Horario: {item.horas} : {item.minutos}</Text>
                 
                        </View>

                        <View style={{ flex: 1, borderColor: 'white', alignItems: "center", justifyContent: "center" }}>
                            <Text style={{ color: 'white', fontSize: 13 }} >Data do </Text>
                            <Text style={{ color: 'white', fontSize: 13 }} >agendamento:</Text>
                            <Text style={{ color: 'white', fontSize: 14, marginTop: 6, fontWeight: 'bold' }} >{item.dia} de {item.mesNome}</Text>
                            <Text style={{ color: 'white', fontSize: 14, marginTop: 7 }} >Profissional: <Text style={{ fontWeight: 'bold', color: "#FA35F1" }} >{item.nomeProfissional}</Text></Text>


                        </View>
                    </View>

                </ImageBackground>

            </TouchableOpacity>
        }
    }



    if (!agendamentos) return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>

            <Text>Nenhum agendamento marcado para hoje ainda.</Text>
        </View>
    )

    return (

        <View style={styles.container}>

            <Text style={{ color: 'black', fontSize: 14, marginTop: 15 }} > Horários agendados para hoje </Text>

            <FlatList
                data={agendamentos}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}

            />

        </View >

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',

    },
    paragraph: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

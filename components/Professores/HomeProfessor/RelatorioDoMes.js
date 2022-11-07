import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import base64 from 'react-native-base64';

export default function RelatorioDoMes({ route, navigation }) {

    const nomeMes = route.params.nomeMes;
    const dataRelatorio = route.params.dataRelatorio;

    const [initializing, setInitializing] = useState(true);
    const [dias, setDias] = useState();
    const [pagamentoConfirmadoBorda, setPagamentoConfirmadoBorda] = useState();

    function onAuthStateChanged(user) {
if(user){
    database()
    .ref(`estabelecimento/${base64.encode(user.email)}/horariosMarcados/${nomeMes}/horarios`)
    .on('value', snapshot => {

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
            setDias(li)

        })
    })

}
       

        if (initializing) setInitializing(false);
    }

    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber; // unsubscribe on unmount
    }, [console.log(nomeMes)]);



    function renderItem({ item }) {
        if (!item.pagamentoConfirmado) {
            return <TouchableOpacity onPress={() => navigation.navigate('Comprovantes', { infoComprovante: item, tipoUsuario: 'estabelecimento' })} style={{ height: 100, width: 300, borderWidth: 2, borderColor: 'grey', flexDirection: 'row', alignItems: 'center', marginTop: 10, borderRadius: 40, justifyContent: 'center', backgroundColor: 'white' }}>

                <View style={{ flex: 2, alignItems: 'center', justifyContent: 'center', }}>
                    <Text style={{ padding: 5 }} >Dia {item.dia} de {item.mesNome} - {item.horas}:{item.minutos} </Text>
                    <Text>{item.nomePagador}</Text>
                </View>

                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ color: 'green', fontWeight: "bold", fontSize: 16 }} > R$ {item.valorItemServ} </Text>
                </View>

            </TouchableOpacity>
        } if (item.pagamentoConfirmado) {
            return <TouchableOpacity onPress={() => navigation.navigate('Comprovantes', { infoComprovante: item, tipoUsuario: 'estabelecimento' })} style={{ height: 100, width: 300, borderWidth: 2, borderColor: 'green', flexDirection: 'row', alignItems: 'center', marginTop: 10, borderRadius: 40, justifyContent: 'center', backgroundColor: 'white' }}>

                <View style={{ flex: 2, alignItems: 'center', justifyContent: 'center', }}>
                    <Text style={{ padding: 5 }} >Dia {item.dia} de {item.mesNome} - {item.horas}:{item.minutos} </Text>
                    <Text>{item.nomePagador}</Text>
                    <Text style={{ color: 'green', fontWeight: 'bold' }} >Pagamento Confirmado</Text>
                </View>

                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ color: 'green', fontWeight: "bold", fontSize: 16 }} > R$ {item.valorItemServ} </Text>
                </View>

            </TouchableOpacity>
        } return null;


    };

    return (
        <View style={styles.container}>

            <Text style={{ fontSize: 13, fontWeight: 'bold' }} >Todos os dias do mês {nomeMes}</Text>

            <Text> Total em agendamentos </Text>

            <Text> Relatórios dos dias --  </Text>
            <Text> Resultado Mês: - <Text style={{color:'green',fontWeight:'bold'}} > R$ {dataRelatorio.valorMovimentadoMes} </Text>  </Text>
            <Text> Despesas: <Text style={{ color: 'red', fontWeight: 'bold' }} >R$ {dataRelatorio.despesas}</Text>  </Text>

            <FlatList
                data={dias}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
            />


            <Text>  </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ecf0f1',
        padding: 8,
        alignItems: "center",

    },
    paragraph: {
        margin: 24,
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

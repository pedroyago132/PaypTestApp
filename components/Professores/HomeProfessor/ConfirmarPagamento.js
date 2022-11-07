import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import base64 from 'react-native-base64';





export default function ConfirmarPagamento({ route, navigation }) {


    const infoComprovante = route.params.infoComprovante;
    const [infoFuncionario, setInfoFuncionario] = useState();
    const [infoMes, setInfoMes] = useState();

    useEffect(() => {
        database()
            .ref(`estabelecimento/${base64.encode(infoComprovante.emailEstabelecimento)}/funcionarios/${base64.encode(infoComprovante.emailFuncionario)}/${infoComprovante.mesNome}`)
            .on('value', snapshot => {

                setInfoFuncionario(snapshot.val())
            })
    }, [console.log(infoComprovante.emailFuncionario)])

    useEffect(() => {
        database()
            .ref(`estabelecimento/${base64.encode(infoComprovante.emailEstabelecimento)}/horariosMarcados/${infoComprovante.mesNome}`)
            .on('value', snapshot => {

                setInfoMes(snapshot.val())
            })
    }, [])

    function l() {
        alert('Pagamento Confirmado')
        navigation.navigate('Turmas')
    }

    const uploadDadosProfissional = () => {

        const valorRepassadoValorDespesas = parseInt(infoComprovante.valorRepassado) + parseInt(infoComprovante.despesas);
        const valorServicoMenosDespesas = parseInt(infoComprovante.valorItemServ) - parseInt(valorRepassadoValorDespesas)
        const somaValorMes = parseInt(infoMes.valorMovimentadoMes) + parseInt(valorServicoMenosDespesas);
        const somarDespesas = parseInt(infoMes.despesas) + parseInt(infoComprovante.despesas);
        const somaValorRepassado = parseInt(infoFuncionario.valorMovimentado) + parseInt(infoComprovante.valorRepassado);
        const somaValorRepassadoMes = parseInt(infoMes.valorRepassadoMes) + parseInt(infoComprovante.valorRepassado);


        database().ref(`estabelecimento/${base64.encode(infoComprovante.emailEstabelecimento)}/horariosMarcados/${infoComprovante.mesNome}/horarios/${infoComprovante.key}`)
            .update({ pagamentoConfirmado: true })

        database().ref(`estabelecimento/${base64.encode(infoComprovante.emailEstabelecimento)}/horariosMarcados/${infoComprovante.mesNome}`)
            .update({ valorMovimentadoMes: somaValorMes, despesas: somarDespesas, valorRepassadoMes: somaValorRepassadoMes })

        database().ref(`estabelecimento/${base64.encode(infoComprovante.emailEstabelecimento)}/horariosMarcados/${infoComprovante.mesNome}/${infoComprovante.key}`)
            .update({ pagamentoConfirmado: true })

        database().ref(`estabelecimento/${base64.encode(infoComprovante.emailEstabelecimento)}/funcionarios/${base64.encode(infoComprovante.emailFuncionario)}/${infoComprovante.mesNome}`)
            .update({ valorMovimentado: somaValorRepassado }).then(() => l())

    }


    return (
        <View style={styles.container}>


            <Text>Confirmar Pagamento</Text>

            <TouchableOpacity onPress={() => uploadDadosProfissional()} style={{ height: 60, width: "80%", marginTop: 15, borderRadius: 50, alignItems: 'center', padding: 15, backgroundColor: '#00FF91', justifyContent: 'center', borderWidth: 2, borderColor: 'white' }}>
                <Text style={{ color: "white", fontWeight: 'bold' }}> Confirmar</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.goBack()} style={{ height: 60, width: "80%", marginTop: 15, borderRadius: 50, alignItems: 'center', padding: 15, backgroundColor: 'white', justifyContent: 'center', borderWidth: 2, borderColor: 'white' }}>
                <Text style={{ color: "black", fontWeight: 'bold' }}> Não confirmar</Text>
            </TouchableOpacity>
        </View >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    paragraph: {
        margin: 24,
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

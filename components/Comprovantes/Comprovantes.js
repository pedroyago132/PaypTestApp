import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import base64 from 'react-native-base64';


export default function Comprovantes({ route, navigation }) {


    const infoComprovante = route.params.infoComprovante;
    const tipoUsuario = route.params.tipoUsuario;
    const infoEstabelecimento = route.params.infoEstabelecimento;
    const [listaAlunos, setListaAlunos] = useState();

    const [user, setUser] = useState();
    const [initializing, setInitializing] = useState(true);
    const [infoFuncionario, setInfoFuncionario] = useState(true);
    const [infoMes, setInfoMes] = useState(true);

    let date = new Date();


    useEffect(() => {
        database()
            .ref(`estabelecimento/${base64.encode(infoComprovante.emailEstabelecimento)}/funcionarios/${base64.encode(infoComprovante.emailFuncionario)}`)
            .on('value', snapshot => {

                setInfoFuncionario(snapshot.val())
            })
    }, [console.log(infoComprovante.emailEstabelecimento)])

    useEffect(() => {
        database()
            .ref(`estabelecimento/${base64.encode(infoComprovante.emailEstabelecimento)}/horariosMarcados/${infoComprovante.mesNome}`)
            .on('value', snapshot => {

                setInfoMes(snapshot.val())
            })
    }, [console.log(infoComprovante.mesNome)])



    const botaoConfirmar = () => {
        if (tipoUsuario == 'estabelecimento') {
            return <Text>Lembre-se sempre de confirmar o pagamento no dia do agendamento</Text>
        } if (tipoUsuario == 'estabelecimentoHorario') {
            if (infoComprovante.pagamentoConfirmado) {
                return <Text style={{ color: 'green', fontWeight: 'bold', marginTop: 15 }} >Pagamento Confirmado</Text>
            } return <TouchableOpacity onPress={() => navigation.navigate('ConfirmarPagamento', { infoComprovante, infoMes, infoFuncionario })} style={{ height: 60, width: "80%", marginTop: 15, borderRadius: 50, alignItems: 'center', padding: 15, backgroundColor: '#00FF91', justifyContent: 'center', borderWidth: 2, borderColor: 'white' }}>
            <Text style={{ color: "white", fontWeight: 'bold' }}> Confirmar Pagamento</Text>
        </TouchableOpacity>
        }
    }

    if (!infoComprovante) return null


    return (
        <View style={styles.container}>
            <Text style={{ marginTop: 15, fontSize: 21, fontWeight: 'bold' }} >
                RELATÓRIO DE AGENDAMENTO
            </Text>

            <Text style={{ fontWeight: "bold" }} >------------------------------------</Text>

            <Text style={{ marginTop: 15 }} >
                Agendamento referente a:
            </Text>

            <Text style={{ marginTop: 15 }} >
                Nome profissional: <Text style={{ fontWeight: 'bold', fontSize: 17 }} >{infoComprovante.nomeProfissional}</Text>
            </Text>

            <Text style={{ marginTop: 15 }} >
                Serviço: <Text style={{ fontWeight: 'bold', fontSize: 17 }} >{infoComprovante.nomeItem}</Text>
            </Text>
            <Text style={{ marginTop: 15 }} >
                Pagador: <Text style={{ fontWeight: 'bold', fontSize: 17 }} >{infoComprovante.nomePagador}</Text>
            </Text>

            <Text style={{ marginTop: 15 }} >
                Valor ---------------- <Text style={{ fontWeight: 'bold', fontSize: 17 }} >R$ {infoComprovante.valorItemServ}</Text>
            </Text>


            {
                botaoConfirmar()
            }
            <Text style={{ marginTop: 15, fontWeight: "bold", color: 'purple', fontSize: 20 }} >
                PyBeeT
            </Text>
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

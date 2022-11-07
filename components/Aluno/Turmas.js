import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import base64 from 'react-native-base64';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';

// You can import from local files

// or any pure javascript modules available in npm


export default function TurmasAluno({ navigation }) {

    const [initializing, setInitializing] = useState(true);
    const [horarios, setHorarios] = useState();

    function onAuthStateChanged(user) {

        if (user) {
            database()
                .ref(`membros/${base64.encode(user.email)}/horarios`)
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
                            nomeItem: child.val().nomeItem,
                            valorRepassado: child.val().valorRepassado,
                            despesas: child.val().despesas,
                            pagamentoConfirmado: child.val().pagamentoConfirmado,
                            emailEstabelecimento: child.val().emailEstabelecimento,
                            mesNome: child.val().mesNome,
                            emailFuncionario: child.val().emailFuncionario

                        });
                        setHorarios(li);
                    })
                })
        }

        if (initializing) setInitializing(false);

    }


    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber;
    }, [console.log(horarios)]);

    const renderItem = ({ item }) => (

        <TouchableOpacity key={item.key} onPress={() => navigation.navigate('Comprovantes', { infoComprovante: item, tipoUsuario: 'membro' })} style={{ height: 90, width: '100%', borderTopWidth: 2, borderBottomWidth: 2, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }} >
            <Text>  {item.horas}:{item.minutos} --</Text>
            <Text> Dia {item.dia} / {item.semana} </Text>
            <Text>  {item.mesNome} </Text>
            <Text style={{ fontWeight: 'bold' }} >  {item.nomeItem} R$ {item.valorItemServ} </Text>

        </TouchableOpacity>
    )

    const CarregarTurmas = () => {
        if (!horarios) {
            return <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>Você ainda não tem nenhum horário pago.</Text>
            </View>


        }


        return <FlatList
            data={horarios}
            renderItem={renderItem}
            keyExtractor={item => item.id}

        />

    }

    return (
        <View style={styles.container}>
            <CarregarTurmas />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#ecf0f1'
    },
    paragraph: {
        margin: 24,
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

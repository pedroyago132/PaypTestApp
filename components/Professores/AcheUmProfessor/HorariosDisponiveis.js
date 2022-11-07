import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, FlatList, ImageBackground, ActivityIndicator } from 'react-native';
import database from '@react-native-firebase/database';
import base64 from 'react-native-base64';


export default function HorariosDiponiveis({ route, navigation }) {
    const [listaTurmas, setListTurmas] = useState();

    const dataProfessor = route.params.dataProfessor;

    useEffect(() => {
        database().ref(`membros/${base64.encode(dataProfessor.emailProfessor)}/horarios`)
            .on('value', snapshot => {

                var li = [];

                snapshot.forEach((child) => {

                    li.push({
                        key: child._snapshot.key,
                        minutos: child.val().minutos,
                        horas: child.val().horas,
                        nome: child.val().nome,
                        email: child.val().email,
                        valorACobrar: child.val().valorACobrar,
                        semana: child.val().semana,
                        mes: child.val().mes,
                        disponivel: child.val().disponivel,
                        dia: child.val().dia
                    });
                    setListTurmas(li)

                })
            })
    }, [console.log(listaTurmas)])

    function renderItem({ item }) {
        if (item.disponivel === 'disponivel') {
            return <TouchableOpacity onPress={() => navigation.navigate('EntrarTurma', { dataTurma: item, dataProfessor: dataProfessor })}
                key={item.key} style={{
                    marginTop: 10, width: '100%', flexDirection: 'row', height: 100, padding: 15,
                    borderTopWidth: 1, borderBottomWidth: 1, borderColor: 'black'
                }}>

                <View style={{ flex: 1, alignItems: "center", justifyContent: "center", flexDirection: 'row' }}>
                    <Text style={{ fontWeight: "bold", fontSize: 15 }}>{item.horas}:{item.minutos}</Text>
                </View>

                <View style={{ flex: 1, alignItems: "center", justifyContent: 'center' }}>
                    <Text style={{ fontWeight: "bold", fontSize: 17 }} >{item.mes}</Text>
                    <Text style={{ fontWeight: "bold", fontSize: 17 }} >{item.semana}</Text>
                    <Text style={{ fontWeight: "bold", fontSize: 17 }} >{item.dia}</Text>
                </View>

                <View style={{ flex: 1, alignItems: "center", justifyContent: 'center' }}>
                    <Text > Valor: </Text>
                    <Text style={{ fontWeight: 'bold', fontSize: 15 }} >{item.valorACobrar}</Text>
                </View>
            </TouchableOpacity>


        } return <Text>Horario não disponicel</Text>
    }


    const CarregarHorarios = () => {
        if (!listaTurmas) {
            return <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                <ActivityIndicator />
            </View>
        }
        return <View style={{ flex: 1 }}>

            <FlatList
                data={listaTurmas}
                renderItem={renderItem}
                keyExtractor={item => item.id}
            />

        </View >
    }

    if (!listaTurmas) return null;


    return (<View style={{ flex: 1 }}>

        <FlatList
            data={listaTurmas}
            renderItem={renderItem}
            keyExtractor={item => item.id}
        />

    </View >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: "center",

        backgroundColor: '#E4ECEB',
        padding: 8,

    },
    paragraph: {
        margin: 24,
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

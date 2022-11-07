import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, TextInput, ScrollView, FlatList } from 'react-native';
import storage from '@react-native-firebase/storage';
import { launchImageLibrary } from 'react-native-image-picker';
import base64 from 'react-native-base64';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import { Picker } from '@react-native-picker/picker';


export default function AdicionarHorario({ navigation }) {
    const [list, setListDias] = useState();

    const [user, setUser] = useState(null);

    function onAuthStateChanged(user) {
        if (user) {
            database()
                .ref(`estabelecimento/${base64.encode(user.email)}`)
                .on('value', snapshot => {
                    setUser(snapshot.val())
                });

            database()
                .ref(`estabelecimento/${base64.encode(user.email)}/diasDisponiveis`)
                .on('value', snapshot => {

                    var li = [];

                    snapshot.forEach((child) => {

                        li.push({
                            key: child._snapshot.key,
                            horarioDisponivel: child.val().horarioDisponivel,
                            horarioAbertura: child.val().horarioAbertura,
                            horarioFechamento: child.val().horarioFechamento

                        });
                        setListDias(li)

                    })
                })
        }
    }

    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber; // unsubscribe on unmount
    }, []);




    const renderItem = ({ item }) => (
        <TouchableOpacity onPress={() => navigation.navigate('ConfigurarHorario', { nomeDia: item.key })} style={{
            height: 80, borderRadius: 70, marginTop: 20,
            width: '100%', backgroundColor: 'white', alignItems: 'center', justifyContent: "center", borderWidth: 1
        }}>
            <Text  > {item.key} {item.horarioDisponivel}</Text>
        </TouchableOpacity>
    );

    return (


        <View style={{}} >

            <ScrollView contentContainerStyle={{ justifyContent: "center" }}>

                <Text style={{ marginTop: 20, fontSize: 16, fontWeight: 'bold' }} >Configure os dias de</Text>
                <Text style={{ marginTop: 10, fontSize: 16, fontWeight: 'bold' }} >abertura e fechamento do estabelecimento</Text>


                <TouchableOpacity onPress={() => navigation.navigate('ConfigurarHorario', { nomeDia: 'Segunda' })} style={{
                    height: 80, borderRadius: 70, marginTop: 20,
                    width: '100%', backgroundColor: 'white', alignItems: 'center', justifyContent: "center", borderWidth: 1
                }}>
                    <Text  > Segunda</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate('ConfigurarHorario', { nomeDia: 'Terça' })} style={{
                    height: 80, borderRadius: 70, marginTop: 20,
                    width: '100%', backgroundColor: 'white', alignItems: 'center', justifyContent: "center", borderWidth: 1
                }}>
                    <Text  > Terça</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate('ConfigurarHorario', { nomeDia: 'Quarta' })} style={{
                    height: 80, borderRadius: 70, marginTop: 20,
                    width: '100%', backgroundColor: 'white', alignItems: 'center', justifyContent: "center", borderWidth: 1
                }}>
                    <Text  > Quarta</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate('ConfigurarHorario', { nomeDia: 'Quinta' })} style={{
                    height: 80, borderRadius: 70, marginTop: 20,
                    width: '100%', backgroundColor: 'white', alignItems: 'center', justifyContent: "center", borderWidth: 1
                }}>
                    <Text  > Quinta</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate('ConfigurarHorario', { nomeDia: 'Sexta' })} style={{
                    height: 80, borderRadius: 70, marginTop: 20,
                    width: '100%', backgroundColor: 'white', alignItems: 'center', justifyContent: "center", borderWidth: 1
                }}>
                    <Text  > Sexta</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate('ConfigurarHorario', { nomeDia: 'Sabado' })} style={{
                    height: 80, borderRadius: 70, marginTop: 20,
                    width: '100%', backgroundColor: 'white', alignItems: 'center', justifyContent: "center", borderWidth: 1
                }}>
                    <Text  > Sabado</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate('ConfigurarHorario', { nomeDia: 'Domingo' })} style={{
                    height: 80, borderRadius: 70, marginTop: 20,
                    width: '100%', backgroundColor: 'white', alignItems: 'center', marginBottom: 10, justifyContent: "center", borderWidth: 1
                }}>
                    <Text  > Domingo</Text>
                </TouchableOpacity>

            </ScrollView >

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

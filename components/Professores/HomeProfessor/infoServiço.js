import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, TextInput, ScrollView, FlatList } from 'react-native';
import storage from '@react-native-firebase/storage';
import { launchImageLibrary } from 'react-native-image-picker';
import base64 from 'react-native-base64';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import { Picker } from '@react-native-picker/picker';


export default function infoServiço({ navigation, route }) {
    const infoServiço = route.params.infoServiço;
    const [valorItemServ, setValorItemServ] = useState();
    const [user, setUser] = useState();


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



    return (

        <View style={{ flex: 1, justifyContent: "center", alignItems: 'center' }} >
            <Text> Nome do serviço/item -- <Text style={{ fontWeight: 'bold', fontSize: 16 }} >{infoServiço.nomeItem}</Text> </Text>
            <Text> Valor - <Text style={{ fontWeight: 'bold', fontSize: 16 }} >{infoServiço.valorItemServ}</Text></Text>
            <Text> Despesas do serviço -  <Text style={{ fontWeight: 'bold', fontSize: 16 }} >R${infoServiço.despesas}</Text> </Text>
            <Text> Valor Repassado - <Text style={{ fontWeight: 'bold', fontSize: 16 }} >R${infoServiço.valorRepassado}</Text> </Text>
            <TouchableOpacity onPress={() => navigation.navigate('ExcluirServiço', { infoServiço })} style={{
                height: 80, borderRadius: 60, marginTop: 20,
                width: '80%', backgroundColor: 'white', alignItems: 'center', justifyContent: "center", borderWidth: 1
            }} >
                <Text>Excluir Serviço</Text>
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

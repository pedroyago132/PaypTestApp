import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, TextInput, ScrollView, FlatList } from 'react-native';
import storage from '@react-native-firebase/storage';
import { launchImageLibrary } from 'react-native-image-picker';
import base64 from 'react-native-base64';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import { Picker } from '@react-native-picker/picker';


export default function ExcluirFuncionario({ navigation, route }) {
    const infoServiço = route.params.infoServiço;
    const [valorItemServ, setValorItemServ] = useState();
    const [user, setUser] = useState();


    function onAuthStateChanged(user) {
        if (user) {
            database()
                .ref(`estabelecimento/${base64.encode(user.email)}/`)
                .on('value', snapshot => {
                    setUser(snapshot.val())
                });
        }
    }

    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber; // unsubscribe on unmount
    }, []);

    function l() {
        alert('Funcionário excluido')
        navigation.navigate('Funcionario')
    }

    function excluirServiço() {
        database().ref(`estabelecimento/${base64.encode(user.email)}/funcionarios/${base64.encode(user.email)}`)
            .remove()
            .then(() => l())
            .catch(erro => alert(erro))

    }



    return (

        <View style={{ flex: 1, justifyContent: "center", alignItems: 'center' }} >
            <Text>Deseja Excluir esse Funcionário?</Text>
            <TouchableOpacity onPress={() => excluirServiço()} style={{ width: '70%', height: 70, alignItems: "center", justifyContent: "center", borderWidth: 2, marginTop: 20, borderColor: 'black' }}>
                <Text>Sim</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('AdicionarItemServ')} style={{ width: '70%', height: 70, alignItems: "center", justifyContent: "center", borderWidth: 2, marginTop: 20, borderColor: 'black' }}>
                <Text>Não</Text>
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

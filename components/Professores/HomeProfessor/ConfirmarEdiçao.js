import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import base64 from 'react-native-base64';

export default function ConfirmarEdiçao({ route, navigation }) {
    const historia = route.params.historia;
    const nomeEstabelecimento = route.params.nomeEstabelecimento;
    const periodo = route.params.periodo;
    const maxPessoas = route.params.maxPessoas;

    const [initializing, setInitializing] = useState(true);
    const [infoEstabelecimento, setInfoEstabelecimento] = useState();

    function onAuthStateChanged(user) {

        database()
            .ref(`membros/${base64.encode(user.email)}`)
            .once('value')
            .then(snapshot => {
                setInfoEstabelecimento(snapshot.val())
            })

        if (initializing) setInitializing(false);
    }

    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber; // unsubscribe on unmount
    }, [console.log(categoria)]);



    return (
        <View style={styles.container}>

            <Text style={{ fontSize: 18, fontWeight: 'bold' }} >Salvar ou editar informações</Text>
            <Text style={{ fontSize: 18, fontWeight: 'bold' }}  >Confirmar?</Text>

            <TouchableOpacity onPress={() => salvar()} style={{ height: 60, width: '80%', borderRadius: 60, marginTop: 35, backgroundColor: "white", borderWidth: 1, borderColor: 'black', alignItems: 'center', justifyContent: 'center' }}>
                <Text>Sim</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.goBack()} style={{ height: 60, width: '80%', borderRadius: 60, backgroundColor: "white", borderWidth: 1, borderColor: 'black', alignItems: 'center', justifyContent: 'center', marginTop: 20 }}>
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

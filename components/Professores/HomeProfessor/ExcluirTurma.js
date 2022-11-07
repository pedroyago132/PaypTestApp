import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import base64 from 'react-native-base64';





export default function ExcluirTurma({ route, navigation }) {

    const dataTurmas = route.params.dataTurmas;
    const [listaAlunos, setListaAlunos] = useState();
    const [initializing, setInitializing] = useState(true);
    const [user, setUser] = useState();

    function onAuthStateChanged(user) {
        if (user) {
            database().ref(`membros/${base64.encode(user.email)}`)
                .on('value', (snapshot) => {
                    setUser(snapshot.val())
                });
            if (initializing) setInitializing(false);
        }

    }


    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber; // unsubscribe on unmount
    }, [console.log(dataTurmas)]);

    function ExcluirTurma() {
        database()
            .ref(`membros/${base64.encode(user.email)}/horarios/${dataTurmas.key}`)
            .remove()
            .then(() => navigation.navigate('Turmas'))
    }



    return (
        <View style={styles.container}>
            <Text>Confirmar exclusão da turma ?</Text>
            <TouchableOpacity onPress={() => ExcluirTurma()} style={{ height: 60, width: '80%', borderRadius: 60, marginTop: 35, backgroundColor: "white", borderWidth: 1, borderColor: 'black', alignItems: 'center', justifyContent: 'center' }}>
                <Text>Sim</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.goBack()} style={{ height: 60, width: '80%', borderRadius: 60, backgroundColor: "white", borderWidth: 1, borderColor: 'black', alignItems: 'center', justifyContent: 'center', marginTop: 20 }}>
                <Text>Não</Text>
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

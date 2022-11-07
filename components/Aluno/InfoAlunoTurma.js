import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import base64 from 'react-native-base64';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';


export default function InfoAlunoTurma({ route, navigation }) {
    const alunoDataTurma = route.params.dataTurma
    const [initializing, setInitializing] = useState(true);
    const [turmasInfo, setTurmasInfo] = useState();

    function onAuthStateChanged(user) {
        database().ref(`membros/${base64.encode(alunoDataTurma.emailProfessor)}/horarios/${alunoDataTurma.turmaID}/`)
            .on('value', snapshot => {
                setTurmasInfo(snapshot.val());
            });
        if (initializing) setInitializing(false);
    }

    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber; // unsubscribe on unmount
    }, []);

    function pagamento() {
        retu
    }



    return (
        <View style={styles.container}>
            <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 17 }} > Status do pagamento: </Text>
            <Text style={{ color: 'green', fontWeight: 'bold', fontSize: 17 }} > Em Dia </Text>
            <TouchableOpacity style={{ height: 80, width: '90%', borderWidth: 2, marginTop: 20, backgroundColor: 'white', alignItems: 'center', borderRadius: 60, justifyContent: 'center' }}>
                <Text> Anotações para você</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => mavigation.navigate('Comprovantes', { turmasInfo })} style={{ height: 80, borderWidth: 2, width: '90%', marginTop: 20, backgroundColor: 'white', alignItems: 'center', flexDirection: "row", borderRadius: 60, justifyContent: 'center' }}>
                <Text> Comprovantes de pagamentos: </Text>

            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('MinhaTurma', { dataTurma: turmasInfo, alunoDataTurma: alunoDataTurma })} style={{ height: 80, borderWidth: 2, marginTop: 20, width: '90%', backgroundColor: 'white', alignItems: 'center', flexDirection: "row", borderRadius: 60, justifyContent: 'center' }}>
                <Text> Cancelar cobrança </Text>
            </TouchableOpacity>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#ecf0f1',
        alignItems: 'center'
    },
    paragraph: {
        margin: 24,
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

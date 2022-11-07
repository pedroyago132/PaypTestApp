import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import base64 from 'react-native-base64';





export default function DadosDoHorario({ route, navigation }) {


    const infoComprovante = route.params.infoComprovante;
    const [listaAlunos, setListaAlunos] = useState();
    const [initializing, setInitializing] = useState(true);

    let date = new Date();


    useEffect(() => {

    }, [console.log(listaAlunos)])


    return (
        <View style={styles.container}>
            <Text>Dados do horario marcado</Text>
            <Text>Pagamento aprovado</Text>
            <Text>Dados do horario marcado</Text>
            <Text>Dados do horario marcado</Text>
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

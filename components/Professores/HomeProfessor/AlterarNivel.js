import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Image, TextInput, TouchableOpacity } from 'react-native';
import database from '@react-native-firebase/database';

export default function AlterarNivel({ route, navigation }) {
    const [nivel, setNivel] = useState();
    const [listaalunos, setListaAlunos] = useState();

    const dataAluno = route.params.itemAluno

    const trocarNivel = ({ valorNivel }) => {
        database().ref(`professores/turmas/alunos/${dataAluno.key}`)
            .update({ nivel: valorNivel });
        alert('Nivel Alterado');
    }
    return (
        <View style={styles.container}>
            <Text style={{ fontSize: 16, color: 'grey', }} > Altere o nível do aluno a qualquer momento. </Text>

            <Text style={{ fontSize: 22, color: 'black', }} > NÍVEL ATUAL: {dataAluno.nivel} </Text>

            <TouchableOpacity onPress={() => trocarNivel({ valorNivel: 'kids' })} style={{ height: 100, width: '90%', borderWidth: 2, marginTop: 60, borderColor: 'black', backgroundColor: 'white', alignItems: 'center', justifyContent: 'center' }}>
                <Text>Kids</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => trocarNivel({ valorNivel: 'Iniciante' })} style={{ height: 100, width: '90%', borderWidth: 2, marginTop: 60, borderColor: 'black', backgroundColor: 'white', alignItems: 'center', justifyContent: 'center' }}>
                <Text>Iniciante</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => trocarNivel({ valorNivel: 'Intermediario' })} style={{ height: 100, width: '90%', borderWidth: 2, marginTop: 60, borderColor: 'black', backgroundColor: 'white', alignItems: 'center', justifyContent: 'center' }}>
                <Text>Intermediario</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => trocarNivel({ valorNivel: 'Avançado' })} style={{ height: 100, width: '90%', borderWidth: 2, marginTop: 60, borderColor: 'black', backgroundColor: 'white', alignItems: 'center', justifyContent: 'center' }}>
                <Text>Avançado</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    paragraph: {
        margin: 24,
        marginTop: 0,
        fontSize: 14,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    logo: {
        height: 128,
        width: 128,
        padding: 20
    }
});

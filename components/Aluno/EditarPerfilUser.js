import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import auth from '@react-native-firebase/auth';


export default function ConfigurarAluno({ navigation }) {
    const [editarNome, setEditarNome] = useState();
    return (
        <View style={styles.container}>

            <TextInput style={{ height: 50, width: '80%', borderBottomWidth: 1, borderColor: 'black' }} placeholder='Digite o novo nome...' onChangeText={text => setEditarNome(text)} />

            <TouchableOpacity style={{ height: 50, marginTop: 25, width: '70%', backgroundColor: 'white', alignItems: 'center', justifyContent: 'center' }}>
                <Text> Salvar</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ecf0f1',
        padding: 8,
        alignItems: 'center',
        justifyContent: 'center'
    },
    paragraph: {
        margin: 24,
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

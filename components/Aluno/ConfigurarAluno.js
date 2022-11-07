import * as React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import auth from '@react-native-firebase/auth';


export default function ConfigurarAluno({ navigation }) {
    function deslogar() {

        setTimeout(() => {
            navigation.navigate('Login');
            alert('Deslogado');
        }, 750);

    }
    function sair() {
        auth()
            .signOut()
            .then(() => deslogar());
    }
    return (
        <View style={styles.container}>
            <TouchableOpacity style={{ height: 50, borderRadius: 60, width: '70%', marginTop: 30, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center' }}>
                <Text> Editar Perfil</Text>
            </TouchableOpacity>

            <TouchableOpacity style={{ height: 50, borderRadius: 60, marginTop: 30, width: '70%', backgroundColor: 'white', alignItems: 'center', justifyContent: 'center' }}>
                <Text> Ajuda</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => sair()}>
                <Text style={{ padding: 20, marginTop: 30, backgroundColor: 'white', borderRadius: 60 }} > Sair </Text>
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

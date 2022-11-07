
import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, ImageBackground, Image, ScrollView } from 'react-native';
import database from '@react-native-firebase/database';
import base64 from 'react-native-base64';
import auth from '@react-native-firebase/auth';
import { useOpenPix } from '@openpix/react';
import { ThemeProvider } from 'styled-components';
import { ToastProvider } from 'react-native-styled-toast';
import { Provider as PaperProvider } from 'react-native-paper';



export default function Boleto({ route, navigation }) {

    useEffect(() => {

    }, [])


    return (
        <View style={styles.container}>
            <Text style={{ marginTop: '30%', fontSize: 20, fontWeight: 'bold' }}> Pronto para entrar pra turma jogador?</Text>
            <Text style={{ padding: 10 }}> Aqui você vai poder assinar seu pacote de aulas.</Text>
            <Text style={{ padding: 10, color: 'orange', fontWeight: 'bold' }}> Agora você pode pagar suas mensalidades de forma 100%
                automatica pelo cartão, sem se preucupar mais!</Text>

            <Text style={{ padding: 10 }}> Você pode cancelar a assinatura a hora que quiser.</Text>


            <TouchableOpacity onPress={() => newCharge()} style={{ marginTop: 50, width: '80%', borderWidth: 2, borderColor: 'green', height: 60, alignItems: 'center', justifyContent: 'center' }} >
                <Text style={{ color: 'green', fontWeight: 'bold' }} >Assinar Mensalidade</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'E0E0E0',
        justifyContent: 'center',
        alignItems: 'center'

    },
    paragraph: {
        margin: 24,
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

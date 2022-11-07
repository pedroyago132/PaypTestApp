import React, { useState } from 'react';
import { Text, View, StyleSheet, Image, TextInput, TouchableOpacity } from 'react-native';

export default function AdicionarComentario({ route, navigation }) {
    const [comentario, setComentario] = useState();
    return (
        <View style={styles.container}>
            <Text style={{ fontSize: 16, color: 'black' }} > Aqui você deixa sua avaliação geral do aluno. </Text>
            <Text style={{ fontSize: 14, color: 'black', marginBottom: 70 }} > Aproveite para falar dos treinos, rotina, deficits e acertos. </Text>

            <TextInput value={comentario} style={{ height: 70, width: '90%', backgroundColor: 'white' }} onChangeText={text => setComentario(text)} placeholder='O aluno evoluiu ou decaiu em algo ?' />
            <TouchableOpacity style={{ height: 100, width: '90%', borderWidth: 2, marginTop: 60, borderColor: 'black', backgroundColor: 'white', alignItems: 'center', justifyContent: 'center' }}>
                <Text>Enviar Comentário</Text>
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

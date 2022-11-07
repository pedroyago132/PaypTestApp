import * as React from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native';

export default function PaginaAluno({ route, navigation }) {
    const dataAluno = route.params.itemAluno
    return (
        <View style={styles.container}>
            <Image style={styles.logo} source={require('../assets/snack-icon.png')} />
            <Text style={{ padding: 10 }}>Aluno desde: 02/10/2022</Text>
            <Text style={{ padding: 10, color: "green", fontWeight: 'bold' }} >Mensalidade em dia</Text>
            <Text style={{ padding: 5, color: "black", fontWeight: 'bold' }} >{dataAluno.nome}</Text>
            <Text style={{ padding: 5, color: "grey", fontWeight: 'bold' }} >{dataAluno.idade}</Text>
            <Text style={{ padding: 5, color: "blue", fontWeight: 'bold' }} >{dataAluno.nivel}</Text>

            <TouchableOpacity style={{ height: 100, width: '90%', borderWidth: 2, marginTop: 15, borderColor: 'black', backgroundColor: 'white', alignItems: 'center', justifyContent: 'center' }}>
                <Text>Remanejar aluno de turma</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('Comentario')} style={{ height: 100, width: '90%', borderWidth: 2, marginTop: 15, borderColor: 'black', backgroundColor: 'white', alignItems: 'center', justifyContent: 'center' }}>
                <Text>Adicionar comentario e avaliações ao aluno</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate("AlterarNivel", { itemAluno: dataAluno })} style={{ height: 100, width: '90%', borderWidth: 2, marginTop: 15, borderColor: 'black', backgroundColor: 'white', alignItems: 'center', justifyContent: 'center' }}>
                <Text>Alterar nível do Aluno</Text>
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

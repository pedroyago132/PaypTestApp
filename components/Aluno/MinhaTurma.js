import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import base64 from 'react-native-base64';





export default function MinhaTurma({ route, navigation }) {

    const dataTurma = route.params.dataTurma;
    const alunoDataTurma = route.params.alunoDataTurma;
    const [listaAlunos, setListaAlunos] = useState();
    const [initializing, setInitializing] = useState(true);

    function onAuthStateChanged(user) {


        if (initializing) setInitializing(false);
    }

    useEffect(() => {

        database()
            .ref(`membros/${base64.encode(alunoDataTurma.emailProfessor)}/horarios/${alunoDataTurma.turmaID}/alunos`)
            .on('value', snapshot => {

                var li = [];

                snapshot.forEach((child) => {

                    li.push({
                        key: child._snapshot.key,
                        nome: child.val().nome,
                        nivel: child.val().nivel,
                        idade: child.val().idade

                    });
                    setListaAlunos(li)

                })
            })
    }, [])

    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber; // unsubscribe on unmount
    }, [console.log(dataTurma)]);


    const CarregarAlunos = () => {
        if (!listaAlunos) {
            return <Text  >Não há alunos nessa turma.</Text>
        }
        return listaAlunos.map(item =>

            <TouchableOpacity key={item.key} style={{ width: '100%', flexDirection: 'row', marginTop: 15, height: 70, borderBottomWidth: 1, borderTopWidth: 1, borderColor: 'black', alignItems: "center", justifyContent: 'center' }}>

                <Text style={{ fontSize: 20, fontWeight: 'bold', }} >{item.nome}</Text>

            </TouchableOpacity>


        )

    }

    if (!listaAlunos) return null

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={{ flex: 1 }} >
                <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                    <Text style={{ fontSize: 20, fontWeight: 'bold' }} > Tutor da turma: {alunoDataTurma.nomeProfessor}</Text>
                    <Text style={{ marginTop: 25, fontSize: 20 }} > {alunoDataTurma.esporte} </Text>
                    <Text style={{ marginTop: 20, fontWeight: 'bold', fontSize: 20 }} > {dataTurma.dia} - {dataTurma.horas}:{dataTurma.minutos} </Text>

                </View>

                <View style={{
                    flex: 3
                    , alignItems: "center",
                }}>
                    <Text style={{ marginTop: 50, fontSize: 25, fontWeight: 'bold' }} >Alunos na turma:</Text>

                    <CarregarAlunos />

                </View>


            </ScrollView>
        </View >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    paragraph: {
        margin: 24,
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

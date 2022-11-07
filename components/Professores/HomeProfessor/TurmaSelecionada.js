import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import base64 from 'react-native-base64';





export default function TurmaSelecionada({ route, navigation }) {


    const dataTurmas = route.params.dataTurmas;
    const [listaAlunos, setListaAlunos] = useState();
    const [initializing, setInitializing] = useState(true);


    function onAuthStateChanged(user) {
        if (user) {
            database().ref(`membros/${base64.encode(user.email)}/horarios/${dataTurmas.key}/alunos`)
                .on('value', (snapshot) => {
                    var li = []
                    console.log(user)
                    snapshot.forEach((child) => {
                        li.push({
                            key: child._snapshot.key,
                            nome: child.val().nome,
                            nivel: child.val().nivel,
                            idade: child.val().idade
                        });
                        setListaAlunos(li)
                    })
                });
        }

        if (initializing) setInitializing(false);
    }


    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber; // unsubscribe on unmount
    }, []);



    useEffect(() => {

    }, [console.log(listaAlunos)])


    const CarregarAlunos = () => {
        if (!listaAlunos) {
            return <Text  >.</Text>
        }
        return listaAlunos.map(item =>

            <TouchableOpacity key={item.key} onPress={() => navigation.navigate('PaginaAluno', { itemAluno: item })} style={{
                width: '100%', flexDirection: 'row', marginTop: 10, height: 70,
                borderBottomWidth: 1, borderTopWidth: 1, borderColor: 'black', alignItems: "center", justifyContent: 'center'
            }}>

                <Text style={{ fontSize: 20, fontWeight: 'bold', }} >{item.nome}</Text>

            </TouchableOpacity>


        )

    }


    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={{ alignItems: 'center', justifyContent: "center" }} >

                <Text onPress={() => navigation.navigate('ExcluirTurma', { dataTurmas: dataTurmas })} style={{
                    padding: 15,
                    borderWidth: 1, marginTop: 50, borderRadius: 35, color: 'white', fontWeight: 'bold',
                    borderColor: 'white', backgroundColor: 'red'
                }}>Excluir Horário</Text>

                <Text style={{ marginTop: 10, fontSize: 17, fontWeight: 'bold', }} >{dataTurmas.categoria}</Text>

                <Text style={{ marginTop: 10, fontSize: 17, fontWeight: 'bold', padding: 7 }} >Aguardando pagamento</Text>

                <Text style={{ marginTop: 3, fontSize: 17, fontWeight: 'bold', padding: 7 }} >e preenchimento da vaga:</Text>

                <Text style={{ marginTop: 10, fontSize: 17, fontWeight: 'bold', padding: 7, color: 'black' }} > Horário : {dataTurmas.horas} : {dataTurmas.minutos}</Text>

                <Text style={{ marginTop: 10, fontSize: 17, fontWeight: 'bold', padding: 7, color: 'green' }} > Valor a cobrar R${dataTurmas.valorACobrar}</Text>

                <Text style={{ marginTop: 3, fontSize: 17, fontWeight: 'bold', padding: 7, color: 'green' }} >{dataTurmas.diaMensal}</Text>

                <Text style={{ marginTop: 3, fontSize: 17, fontWeight: 'bold', padding: 7, color: 'green' }} >{dataTurmas.diaSemana}</Text>

                <Text>A vaga só será preenchida</Text>
                <Text>após a confirmação do pagamento.</Text>

            </ScrollView>
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

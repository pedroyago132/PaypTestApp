import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, TextInput, ScrollView, FlatList } from 'react-native';
import storage from '@react-native-firebase/storage';
import { launchImageLibrary } from 'react-native-image-picker';
import base64 from 'react-native-base64';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import { Picker } from '@react-native-picker/picker';


export default function Funcionario({ navigation }) {
    const [funcionarioList, setListFuncionarios] = useState();
    const [email, setEmail] = useState();

    const [nome, setNome] = useState(null);
    const [categoria, setCategoria] = useState('0');
    const [user, setUser] = useState(null);

    function onAuthStateChanged(user) {
        if (user) {
            database()
                .ref(`estabelecimento/${base64.encode(user.email)}`)
                .on('value', snapshot => {
                    setUser(snapshot.val())
                });

            database()
                .ref(`estabelecimento/${base64.encode(user.email)}/funcionarios`)
                .on('value', snapshot => {

                    var li = [];

                    snapshot.forEach((child) => {

                        li.push({
                            key: child._snapshot.key,
                            nome: child.val().nome,
                            email: child.val().email,
                            quantidadeServiços: child.val().quantidadeServiços,
                            valorMovimentado: child.val().valorMovimentado

                        });
                        setListFuncionarios(li)

                    })
                })
        }
    }

    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber; // unsubscribe on unmount
    }, []);




    const renderItem = ({ item }) => (
        <TouchableOpacity onPress={() => navigation.navigate('InformacaoFuncionario', { email: item.email })} style={{ height: 100, marginTop: 18, width: '100%', borderTopWidth: 1, borderBottomWidth: 1, backgroundColor: "white", alignItems: "center", justifyContent: "center" }}>
            <Text style={{ fontWeight: "bold", fontSize: 15 }} > {item.nome}   ---   {item.email}</Text>
        </TouchableOpacity>
    );

    return (


        <View style={{ flex: 1, justifyContent: "center" }} >

            <View style={{ width: '100%', alignItems: "center", justifyContent: "center" }}>
                <TouchableOpacity onPress={() => navigation.navigate('AdicionarFuncionario', { emailEstabelecimento: user.email })} style={{
                    height: 80, borderRadius: 60, marginTop: 20,
                    width: '80%', backgroundColor: 'white', alignItems: 'center', justifyContent: "center", borderWidth: 1
                }}>
                    <Text  > Adicionar </Text>
                    <Text  > Funcionario/Profissional </Text>
                </TouchableOpacity>
            </View>


            <Text style={{ marginTop: 30, marginLeft: 20, fontWeight: 'bold' }} >Todos os funcionarios/profissionais:</Text>

            <FlatList
                data={funcionarioList}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}

            />

        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,

        backgroundColor: '#ecf0f1',
        padding: 8,


    },
    paragraph: {
        margin: 24,
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

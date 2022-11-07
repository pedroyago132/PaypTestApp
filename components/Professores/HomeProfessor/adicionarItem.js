import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, TextInput, ScrollView, FlatList } from 'react-native';
import storage from '@react-native-firebase/storage';
import { launchImageLibrary } from 'react-native-image-picker';
import base64 from 'react-native-base64';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import { Picker } from '@react-native-picker/picker';


export default function AdicionarItem({ navigation }) {
    const [valorItemServ, setValorItemServ] = useState();
    const [nomeItem, setNomeItem] = useState();

    const [listItemServ, setListItemServ] = useState(null);
    const [user, setUser] = useState();
    const [categoria, setCategoria] = useState('0');
    const [valorRepassado, setValorRepassado] = useState();
    const [despesas, setDespesas] = useState();


    function onAuthStateChanged(user) {
        if (user) {
            database()
                .ref(`estabelecimento/${base64.encode(user.email)}/`)
                .on('value', snapshot => {
                    setUser(snapshot.val())
                });

            database()
                .ref(`estabelecimento/${base64.encode(user.email)}/itemServ`)
                .on('value', snapshot => {

                    var li = [];

                    snapshot.forEach((child) => {

                        li.push({
                            key: child._snapshot.key,
                            valorItemServ: child.val().valorItemServ,
                            nomeItem: child.val().nomeItem,
                            categoria: child.val().categoria
                        });
                        setListItemServ(li)

                    })
                })
        }
    }

    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber; // unsubscribe on unmount
    }, []);

    function h() {
        database().ref(`estabelecimento/${base64.encode(user.email)}/itemServ`)
            .push({
                valorItemServ, nomeItem, valorRepassado, despesas
            })

        navigation.goBack()
    }

    function adicionar() {
        if (!valorItemServ || !nomeItem || !valorRepassado || !despesas) {
            return alert('Preencha todos os campos')
        } return h()
    }

    return (

        <View style={{ flex: 1, }} >
            <ScrollView contentContainerStyle={{ justifyContent: 'center', alignItems: 'center' }} showsHorizontalScrollIndicator={false} >
                <Text style={{ marginTop: 30, fontWeight: 'bold' }} >Nome do serviço - "...Ex: Corte de cabelo"</Text>

                <TextInput style={{ width: '90%', height: 80, color: "black", borderBottomWidth: 1, borderColor: 'black' }} value={nomeItem} onChangeText={text => setNomeItem(text)} placeholder='Nome do item...' />

                <Text style={{ fontWeight: 'bold', marginTop: 30 }}>Informe o valor do serviço- "..Ex: 40"</Text>
                <Text> = </Text>
                <Text> R$140 </Text>
                <TextInput style={{ width: '90%', height: 80, color: "black", borderBottomWidth: 1, borderColor: 'black' }} keyboardType='numeric' maxLength={3} value={valorItemServ} onChangeText={text => setValorItemServ(text)} placeholder='Valor do Serviço: R$...' />

                <Text style={{ marginTop: 30, fontWeight: 'bold' }} >Valor a ser passado ao funcionário "..Ex: 20"</Text>

                <TextInput style={{ width: '90%', height: 80, color: "black", borderBottomWidth: 1, borderColor: 'black' }} keyboardType='numeric' maxLength={3} value={valorRepassado} onChangeText={text => setValorRepassado(text)} placeholder='Valor a ser repassado: R$...' />

                <Text style={{ marginTop: 30, fontWeight: 'bold' }} >Informe as despesas do serviço </Text>

                <TextInput style={{ width: '90%', height: 80, color: "black", borderBottomWidth: 1, borderColor: 'black' }} keyboardType='numeric' value={despesas} maxLength={3} onChangeText={text => setDespesas(text)} placeholder='Despesas: R$...' />


                <TouchableOpacity onPress={() => adicionar()} style={{
                    height: 80, borderRadius: 60, marginTop: 20, marginBottom: 25,
                    width: '80%', backgroundColor: 'white', alignItems: 'center', justifyContent: "center", borderWidth: 1
                }}>
                    <Text  > Adicionar </Text>
                    <Text  > Item/Serviço </Text>
                </TouchableOpacity>
            </ScrollView>


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

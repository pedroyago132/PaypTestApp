import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, TextInput, ScrollView, FlatList } from 'react-native';
import storage from '@react-native-firebase/storage';
import { launchImageLibrary } from 'react-native-image-picker';
import base64 from 'react-native-base64';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import { Picker } from '@react-native-picker/picker';


export default function AdicionarItemServ({ navigation }) {
    const [valorItemServ, setValorItemServ] = useState();
    const [nomeItem, setNomeItem] = useState();

    const [listItemServ, setListItemServ] = useState(null);
    const [user, setUser] = useState();
    const [categoria, setCategoria] = useState('0');
    const [cadastrar, setCadastrar] = useState();

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
                            despesas: child.val().despesas,
                            valorRepassado: child.val().valorRepassado
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
                valorItemServ, nomeItem, categoria
            })

        navigation.goBack()
    }

    function adicionar() {
        if (!valorItemServ || !nomeItem) {
            return alert('Preencha todos os campos')
        } return h()
    }

    const renderItem = ({ item }) => (
        <TouchableOpacity onPress={() => navigation.navigate('InfoServiço', { infoServiço: item })} style={{ height: 100, marginTop: 18, width: '100%', borderTopWidth: 1, borderBottomWidth: 1, backgroundColor: "white", alignItems: "center", justifyContent: "center" }}>
            <Text style={{ fontWeight: "bold", fontSize: 15 }} > {item.nomeItem} ---  R$ {item.valorItemServ}</Text>
        </TouchableOpacity>

    );

    return (

        <View style={{ flex: 1, justifyContent: "center" }} >

            <TouchableOpacity onPress={() => navigation.navigate('AdicionarItem')} style={{
                height: 80, borderRadius: 60, marginTop: 20, marginLeft: '12%',
                width: '80%', backgroundColor: 'white', alignItems: 'center', justifyContent: "center", borderWidth: 1
            }} >
                <Text>Adicionar Item/Serviço</Text>
            </TouchableOpacity>

            <FlatList
                data={listItemServ}
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

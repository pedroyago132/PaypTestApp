import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, TextInput, ScrollView, Image } from 'react-native';
import base64 from 'react-native-base64';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import { Picker } from '@react-native-picker/picker';


export default function Saque({ navigation }) {
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
                            categoria: child.val().categoria
                        });
                        setListItemServ(li)

                    })
                })
        }
        if (initializing) setInitializing(false);
    }

    useEffect(() => {
        if (user) {
            database()
                .ref(`estabelecimento/${base64.encode(user.email)}/funcionarios`)
                .on('value', snapshot => {

                    var li = [];

                    snapshot.forEach((child) => {

                        li.push({
                            key: child._snapshot.key,
                            nome: child.val().nome,
                            email: child.val().emmail,
                            categoria: child.val().categoria
                        });
                        setListItemServ(li)

                    })
                })
        }


    }, [])

    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber; // unsubscribe on unmount
    }, []);

    function adicionar() {
        if (!valorItemServ || !nomeItem) {
            return alert('Preencha todos os campos')
        } return database().ref(`estabelecimento/${base64.encode(user.email)}/${categoria}/itemServ`)
            .push({
                valorItemServ, nomeItem, categoria
            })
    }

    function carregarListaItemServ() {
        if (!listItemServ) {
            return <Text>Ainda sem Itens ou Serviços adicionados</Text>
        } else {
            return <View style={{ width: '100%' }}>
                {
                    listItemServ.map(item => <TouchableOpacity style={{ height: 100, marginTop: 10, width: '100%', borderTopWidth: 1, borderBottomWidth: 1, backgroundColor: "white", alignItems: "center", justifyContent: "center" }}>
                        <Text style={{ fontWeight: "bold", fontSize: 17 }} > {item.nomeItem}  ----  R$ {item.valorItemServ}</Text>
                    </TouchableOpacity>

                    )
                }
            </View>
        }
    }

    const AdicionarBotao = () => {
        if (categoria !== '0') {
            setCadastrar(true)
        } return null
    }

    const AdicionarItem = () => {
        if (cadastrar) {
            return <TouchableOpacity onPress={() => adicionar()} style={{ height: 80, borderRadius: 60, marginTop: 20, width: '80%', backgroundColor: 'white', alignItems: 'center', justifyContent: "center", borderWidth: 1 }}>
                <Text  > Adicionar </Text>
                <Text  > Item/Serviço </Text>
            </TouchableOpacity>
        } return null
    }

    /* HORARIO DE FUNCIOAMENTO DO ESTABELECIMENTO */

    return (

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flex: 1, alignItems: "center", justifyContent: "center" }} >

            <Text style={{ marginTop: 30, fontWeight: 'bold' }} >Nome do item/serviço - "...Ex: Corte de cabelo"</Text>

            <TextInput style={{ width: '90%', height: 80, color: "black", borderBottomWidth: 1, borderColor: 'black' }} value={nomeItem} onChangeText={text => setNomeItem(text)} placeholder='Nome do item...' />

            <Text style={{ fontWeight: 'bold', marginTop: 20 }}>Informe o valor SEM informar os centavos - "..Ex: 140"</Text>
            <Text> = </Text>
            <Text> R$140 </Text>
            <TextInput style={{ width: '90%', height: 80, color: "black", borderBottomWidth: 1, borderColor: 'black' }} value={valorItemServ} onChangeText={text => setValorItemServ(text)} placeholder='Valor do Item/Serviço...' />

            <Picker
                selectedValue={categoria}
                style={{ height: 50, width: '70%', marginTop: 15 }}
                onValueChange={(itemValue, itemIndex) => setCategoria(itemValue)}
            >
                <Picker.Item label="Tipo de serviço" value='0' />
                <Picker.Item label="Cabelo" value="cabelo" />
                <Picker.Item label="Maquiagem/Estetica" value="maquiagemEestetica" />
                <Picker.Item label="Cuidados com os pes" value="pes" />
                <Picker.Item label="Cuidados com a pele" value="pele" />
            </Picker>

            <AdicionarBotao />

            <AdicionarItem />

            <Text style={{ fontSize: 15, fontWeight: 'bold', marginTop: 20 }} > ------------------------------- </Text>

            <Text style={{ fontSize: 15, fontWeight: 'bold', marginTop: 20 }} > Todos os seus Itens/Serviços: </Text>

            {
                carregarListaItemServ()
            }

        </ScrollView>

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

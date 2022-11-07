import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, FlatList, ActivityIndicator, ScrollView } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import database from '@react-native-firebase/database';
import { transformSync } from '@babel/core';

// You can import from local files

// or any pure javascript modules available in npm

export default function JogosLista({ navigation }) {
    const [jogos, setJogos] = useState();

    useEffect(() => {
        database().ref('/jogos/postados').on('value', (snapshot) => {
            var li = []
            snapshot.forEach((child) => {

                li.push({
                    key: child._snapshot.key,
                    minutos: child.val().minutos,
                    dia: child.val().dia,
                    categoria: child.val().categoria,
                    local: child.val().horas,
                    quantidade: child.val().horas
                });
                setJogos([li])
            })

        });

    }, []);

    const ItemDia = ({ dia }) => {

    }

    const Jogos = ({ dia }) => {
        if (!jogos) {
            return <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <ActivityIndicator color={'black'} />
            </View>
        }
        return <View style={{ flex: 1 }}>
            <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 22 }} >{dia}</Text>

            {
                jogos[0].map(item => {
                    if (item.dia == dia) {
                        return <View style={{ height: 200, width: '80%', borderRadius: 30, padding: 15 }}>

                            <TouchableOpacity onPress={() => navigation.navigate('TurmaSelecionada', { dataTurmas: item })} style={{ height: 60, width: 300, borderWidth: 2, backgroundColor: 'white', alignItems: 'center', justifyContent: "center", borderRadius: 30 }}>
                                <Text style={{ fontWeight: 'bold', color: 'black' }}>{item.horas}:{item.minutos}</Text>
                                <Text style={{ marginLeft: 25 }}>Categoria: {item.categoria}</Text>
                                <Text style={{ marginLeft: 25 }}>Local: {item.local}</Text>
                                <Text style={{ marginLeft: 25 }}>Quantidade: {item.quantidade}</Text>
                            </TouchableOpacity>


                        </View>

                    } return null

                })
            }

            <View style={{ height: 75, width: '100%' }} />
        </View>

    }


    return (

        <View style={styles.container}>


            <TouchableOpacity onPress={() => navigation.navigate('CriarTurma')} style={{ height: 60, width: '100%', borderBottomWidth: 2, borderTopWidth: 2, flexDirection: 'row', borderColor: 'black', alignItems: "center", justifyContent: 'center' }}>
                <Text style={{ fontWeight: 'bold', color: 'black', fontSize: 17 }} >Postar Jogo </Text>
                <Text style={{ fontWeight: '400', color: 'black', fontSize: 8 }} >( chame pessoas para jogar com você )</Text>
            </TouchableOpacity>


            <ScrollView showsVerticalScrollIndicator={false}>

                <Jogos dia={'Jogos'} />

            </ScrollView>
        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',




    },
    paragraph: {
        margin: 24,
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

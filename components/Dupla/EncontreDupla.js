import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, FlatList, ActivityIndicator, ScrollView } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import database from '@react-native-firebase/database';
import { transformSync } from '@babel/core';

// You can import from local files

// or any pure javascript modules available in npm

export default function EncontreDupla({ navigation }) {
    const [duplas, setDuplas] = useState();

    useEffect(() => {
        database().ref('/duplas').on('value', (snapshot) => {
            var li = []
            snapshot.forEach((child) => {

                li.push({
                    key: child._snapshot.key,
                    nome: child.val().nome,
                    esporte: child.val().esporte,
                    categoria: child.val().categoria,
                    contato: child.val.contato
                });
                setDuplas([li])
            })

        });

    }, []);

    const ItemDia = ({ dia }) => {

    }

    const Duplas = () => {
        if (!duplas) {
            return <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <ActivityIndicator style={{ marginTop: 100 }} color={'black'} />
            </View>
        }
        return <View style={{ flex: 1 }}>

            {
                duplas[0].map(item => {

                    return <View style={{ height: 200, width: '80%', borderRadius: 30, padding: 15 }}>

                        <TouchableOpacity onPress={() => navigation.navigate('TurmaSelecionada', { dataTurmas: item })} style={{ height: 60, width: 300, borderWidth: 2, backgroundColor: 'white', alignItems: 'center', justifyContent: "center", borderRadius: 30 }}>

                            <Text style={{ marginLeft: 25 }}>Nome: {item.nome}</Text>
                            <Text style={{ marginLeft: 25 }}>Categoria: {item.categoria}</Text>
                            <Text style={{ marginLeft: 25 }}>Esporte: {item.esporte}</Text>
                        </TouchableOpacity>


                    </View>


                })
            }

            <View style={{ height: 75, width: '100%' }} />
        </View>

    }


    return (

        <View style={styles.container}>


            <TouchableOpacity onPress={() => navigation.navigate('CriarTurma')} style={{ height: 80, width: 330, marginTop: 40, borderWidth: 2, borderRadius: 50, borderColor: 'black', alignItems: "center", justifyContent: 'center' }}>
                <Text style={{ fontWeight: 'bold', color: 'black', fontSize: 17 }} >Estou atrás de uma dupla. </Text>
                <Text style={{ fontWeight: '400', color: 'black', fontSize: 11 }} >( clique aqui para postar sua categoria, perfil e</Text>
                <Text style={{ fontWeight: '400', color: 'black', fontSize: 11 }} > aguarde seu parceiro entrar em contato com você. )</Text>

            </TouchableOpacity>


            <ScrollView showsVerticalScrollIndicator={false}>

                <Duplas />

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

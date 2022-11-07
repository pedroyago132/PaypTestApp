import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import base64 from 'react-native-base64';

export default function Relatorios({ route, navigation }) {

    const [initializing, setInitializing] = useState(true);
    const [horarios, setHorarios] = useState();

    function onAuthStateChanged(user) {

        database()
            .ref(`estabelecimento/${base64.encode(user.email)}/horariosMarcados`)
            .on('value', snapshot => {

                var li = [];

                snapshot.forEach((child) => {

                    li.push({
                        key: child._snapshot.key,
                        valorMovimentadoMes: child.val().valorMovimentadoMes,
                        despesas:child.val().despesas
                    });
                    setHorarios(li)

                })
            })

        if (initializing) setInitializing(false);
    }

    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber; // unsubscribe on unmount
    }, [console.log(horarios)]);

    const renderItem = ({ item }) => (
        <TouchableOpacity onPress={() => navigation.navigate('RelatorioDoMes', { nomeMes: item.key, dataRelatorio:item })} style={{ height: 100, marginTop: 18, width: 220, borderWidth: 1, borderColor: 'black', backgroundColor: "white", alignItems: "center", justifyContent: "center" }}>
            <Text style={{ fontWeight: "bold", fontSize: 15 }} >{item.key}  --  R${item.valorMovimentadoMes}</Text>
        </TouchableOpacity>

    );

    return (
        <View style={styles.container}>

            <Text style={{ fontSize: 18, fontWeight: 'bold', marginTop: 20 }} >Todos os mêses</Text>


            <FlatList
                data={horarios}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
            />


        </View>
    );
}

const styles = StyleSheet.create({
    container: {

        backgroundColor: '#ecf0f1',
        alignItems: "center",

    },
    paragraph: {
        margin: 24,
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

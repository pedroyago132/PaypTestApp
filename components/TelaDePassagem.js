import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Image, TextInput, TouchableOpacity } from 'react-native';
import database from '@react-native-firebase/database';
import HomeProfessor from './Professores/HomeProfessor/HomeProfessor';
import { MyDrawer } from '../App';
import auth from '@react-native-firebase/auth';
import base64 from 'react-native-base64';
import Menutabnaviation from './TabNavigation';
import TabNavigationuser from './TabNavigationUser';

export default function TelaDePassagem({ route, navigation }) {

    const [initializing, setInitializing] = useState(true);
    const [userR, setUser] = useState();
    const [estabelecimento, setEstabelecimento] = useState();

    function onAuthStateChanged(user) {
        if (user) {
            database().ref(`membros/${base64.encode(user.email)}`)
                .on('value', snapshot => {
                    setUser(snapshot.val());
                });

            database().ref(`estabelecimento/${base64.encode(user.email)}`)
                .on('value', snapshot => {
                    setEstabelecimento(snapshot.val());
                });
        }
        if (initializing) setInitializing(false);
    }


    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber; // unsubscribe on unmount
    }, [console.log(userR)]);

    function detectarMembro() {
        if (userR) {
            return navigation.navigate('MenuTabnavigationUser')
        }

        if (estabelecimento) {
            return navigation.navigate('MenuTabnavigation')
        }

    }

    if (userR || estabelecimento) {
        return detectarMembro()
    }


}



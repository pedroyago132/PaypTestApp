import React, { useState } from 'react';
import { Text, View, StyleSheet, TextInput, TouchableOpacity, ImageBackground } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Menu from './Menu';
import JogosLista from './EcontreJogos/JogosLista';
import ProfessoresList from './Professores/AcheUmProfessor/ProfessoresList';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import TurmasAluno from './Aluno/Turmas';
import ConfigurarAluno from './Aluno/ConfigurarAluno';

const Tab = createMaterialBottomTabNavigator();

export default function TabNavigationuser() {
    return (
        <Tab.Navigator
            screenOptions={{ gestureEnabled: false }}
            initialRouteName="Encontre"
            barStyle={{ backgroundColor: 'white' }}
            shifting={false}
            tabBarOptions={{
                activeTintColor: '#e91e63',
            }}
        >
            <Tab.Screen
                name="Rede"
                component={ProfessoresList}
                options={{
                    tabBarLabel: 'Rede',
                    tabBarStyle: { display: "none" }

                }}
            />

            <Tab.Screen
                name="Horarios"
                component={TurmasAluno}
                options={{
                    tabBarLabel: 'Horários',
                    tabBarStyle: { display: "none" }

                }}
            />

            <Tab.Screen
                name="ConfigurarAluno"
                component={ConfigurarAluno}
                options={{
                    tabBarLabel: 'Perfil',
                    tabBarStyle: { display: "none" }

                }}
            />

        </Tab.Navigator>
    );
}
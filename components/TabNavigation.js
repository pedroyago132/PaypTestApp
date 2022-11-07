import React, { useState } from 'react';
import { Text, View, StyleSheet, TextInput, TouchableOpacity, ImageBackground } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import HomeProfessor from './Professores/HomeProfessor/HomeProfessor';
import TurmaDoDia from './Professores/HomeProfessor/TurmaDoDia';
import FinanceiroProfessor from './Professores/HomeProfessor/FinanceiroProfessor';
import Configurar from './Professores/HomeProfessor/Configurar';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Tab = createMaterialBottomTabNavigator();

export default function Menutabnaviation() {
    return (
        <Tab.Navigator
            screenOptions={{ gestureEnabled: false }}
            initialRouteName="HomeDoProfessor"
            barStyle={{ backgroundColor: 'black' }}
            shifting={false}
            tabBarOptions={{
                activeTintColor: '#e91e63',
            }}
        >
            <Tab.Screen name="HomeDoProfessor" 
            options={{
                gestureEnable: false,
                tabBarLabel: 'Home',
                tabBarStyle: { display: "none" }
            }} 
            component={HomeProfessor} />
            <Tab.Screen
                name="Turmas"
                component={TurmaDoDia}
                options={{
                    tabBarLabel: 'Horários',
                    tabBarStyle: { display: "none" },
                }}
            />
        </Tab.Navigator>
    );
}
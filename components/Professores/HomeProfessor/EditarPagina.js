import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, TextInput, ScrollView, Image } from 'react-native';
import storage from '@react-native-firebase/storage';
import { launchImageLibrary } from 'react-native-image-picker';
import base64 from 'react-native-base64';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import { Picker } from '@react-native-picker/picker';


export default function EditarPagina({ navigation }) {

    const [cidade, setCidade] = useState();
    const [infoEstabelecimento, setEstabelecimento] = useState();
    const [historia, setHistoria] = useState();
    const [endereco, setEndereco] = useState();
    const [nomeEstabelecimento, setNomeEstabelecimento] = useState();

    const [image, setImage] = useState(null);
    const [user, setUser] = useState();


    function onAuthStateChanged(user) {
        if (user) {
            database().ref(`estabelecimento/${base64.encode(user.email)}`)
                .on('value', snapshot => {
                    setEstabelecimento(snapshot.val())
                });
        }
        if (initializing) setInitializing(false);
    }


    useEffect(() => {

        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber; // unsubscribe on unmount
    }, []);

    function uploadSucess() {
        navigation.goBack();
        alert('Imagem salva!')
        database().ref(`estabelecimentos/${base64.encode(user.email)}`)
            .update({ fotoPerfil: image })
    }


    const uploadImagem = async () => {

        const task = storage()
            .ref(`fotoUsuario/${base64.encode(user.email)}/`)
            .putFile(image)
            .then(sucess => uploadSucess())


        try {
            await task;
        } catch (e) {
            console.error(e);
        }
    }

    const BotaoUploadImagem = () => {
        if (!image) {
            return <Text style={{ marginTop: 10 }} >Faça o upload da imagem</Text>
        } else {
            return <TouchableOpacity onPress={() => uploadImagem()} style={{ width: '80%', backgroundColor: '#00FF91', marginTop: 20, height: 80, borderRadius: 50, alignItems: 'center', justifyContent: "center" }}>
                <Text style={{ fontWeight: 'bold', color: 'white' }}>Fazer Upload da imagem</Text>
            </TouchableOpacity>
        }
    }

    function selectImage() {
        const options = {
            maxWidth: 2000,
            maxHeight: 2000,
            storageOptions: {
                skipBackup: true,
                path: 'images'
            }
        }
        launchImageLibrary(options, (response) => {
            if (response.didCancel) {
                alert('Nenhuma imagem selecionada');
            } else if (response.error) {
                alert('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                alert('User tapped custom button: ', response.customButton);
            } else {

                setImage(response.assets[0].uri);

            }
        });
    };



    const I = () => {
        if (image) {
            return <Image style={{ height: 200, marginTop: 20, width: 200 }} source={{ uri: image }} />
        } else {
            return null
        }
    }



    function promessaSalvar() {
        alert('Suas informações foram salvas com sucesso!')
    }


    function salvar() {

        database().ref(`estabelecimento/${base64.encode(infoEstabelecimento.email)}`)
            .update({ historia, nome: nomeEstabelecimento, endereco, cidade })
            .then(() => promessaSalvar())
    }

    /* HORARIO DE FUNCIOAMENTO DO ESTABELECIMENTO */

    /* ADICIONAR AO "HomeProfessor" os dados que faltam para completar as informações no app*/


    return (
        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ alignItems: "center", justifyContent: "center" }} >

                <Text style={{ fontWeight: 'bold', fontSize: 18, marginTop: 10 }} >Informações para o perfil na PayPer</Text>

                <Text style={{ fontWeight: 'bold', color: 'purple', fontSize: 16, marginTop: 10 }} >Todas as informações são necessarias*</Text>

                <Text style={{ fontWeight: 'bold', fontSize: 15, marginTop: 20 }} >Determine a imagem de perfil do estabelecimento que será exibida para os clientes na nossa rede</Text>

                <TouchableOpacity onPress={() => selectImage()} style={{ borderWidth: 2, borderColor: 'black', width: '80%', marginTop: 20, height: 80, backgroundColor: 'white', borderRadius: 50, alignItems: 'center', justifyContent: "center" }}>
                    <Text style={{ fontWeight: 'bold' }}>Selecionar Imagem</Text>
                </TouchableOpacity>

                <BotaoUploadImagem />

                <I />

                <Text style={{ fontWeight: 'bold', fontSize: 15, marginTop: 20 }} >Determine os horários de funcionamento do estabelecimento</Text>


                <TouchableOpacity onPress={() => navigation.navigate('AdicionarHorario')} style={{ borderWidth: 2, borderColor: 'black', width: '80%', marginTop: 20, height: 80, backgroundColor: 'white', borderRadius: 50, alignItems: 'center', justifyContent: "center" }}>
                    <Text style={{ fontWeight: 'bold' }}>Horário de funcionamento</Text>
                </TouchableOpacity>

                <Text style={{ fontWeight: 'bold', fontSize: 18, marginTop: 50 }} >Informações sobre o estabelecimento</Text>

                <Text style={{ fontWeight: 'bold', color: 'purple', fontSize: 16, marginTop: 20 }} >Todas as informações são necessarias*</Text>

                <TextInput style={{ width: '90%', height: 80, color: "black", borderBottomWidth: 1, borderColor: 'black' }} value={nomeEstabelecimento} onChangeText={text => setNomeEstabelecimento(text)} placeholder='Nome do estabelecimento...' />

                <TextInput style={{ width: '90%', height: 80, color: "black", borderBottomWidth: 1, borderColor: 'black' }} value={endereco} onChangeText={text => setEndereco(text)} placeholder='Endereço...' />

                <TextInput style={{ width: '90%', height: 80, color: "black", borderBottomWidth: 1, borderColor: 'black' }} value={cidade} onChangeText={text => setCidade(text)} placeholder='Cidade...' />


                <Text style={{ fontWeight: 'bold', fontSize: 18, marginTop: 20 }} >Conte as pessoas a história da marca</Text>
                <Text style={{ padding: 10 }} >Aproveite para contar como começou, o que é hoje, etc.</Text>

                <TextInput style={{ width: '90%', height: 120, marginTop: 20, color: "black", borderWidth: 1, borderColor: 'black' }} value={historia} onChangeText={text => setHistoria(text)} placeholder='Fale sobre a historia da marca e fatos interessantes...' />


                <TouchableOpacity onPress={() => salvar()} style={{ height: 80, borderRadius: 60, marginTop: 20, borderWidth: 1, borderColor: 'purple', width: '70%', backgroundColor: 'white', alignItems: 'center', justifyContent: "center" }}>
                    <Text style={{ color: 'purple' }} > Salvar </Text>
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

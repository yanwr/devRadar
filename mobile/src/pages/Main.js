import React, { useEffect, useState } from 'react';
import MapView, { Marker, Callout } from 'react-native-maps'; // utilizando o Marker que é uma marcação dentro do maps ----- utilizando o Callout para poder ver o que cada Marker tera de info
import { StyleSheet, Image, View, Text, TextInput, TouchableOpacity, Keyboard } from 'react-native';
import { requestPermissionsAsync, getCurrentPositionAsync } from 'expo-location'; // o primeiro vai pedir permissao para usar a localização do user e a segunda vai gettar a localização
import { MaterialIcons } from "@expo/vector-icons"; // pegando todos os Icons de onde eu quiser com o expo

import api from '../services/api'; 

function Main({ navigation }){
//#region Estado  
    const [ currentRegion, setCurrentRegion ] = useState(null);
    const [ users, setUsers ] = useState([]); // sempre iniciar o state com o que ele ira receber. Nesse caso sera uma lista de usuarios, entao um array vazio.
    const [ tecnologias, setTecnologias ] = useState('');
//#endregion
    useEffect(() => {
        async function loadInitialPosition(){
            const { granted } = await requestPermissionsAsync();
            if(granted){
                const { coords } = await getCurrentPositionAsync({
                    enableHighAccuracy: true, // serve para pegar a localização do GPS to celular, se caso estiver ligado. Se quiser gettar sem o GPS so passar false dai vai pegar a localizaçao via Wifi ou algo do tipo
                });

                const { latitude, longitude } = coords; 

                setCurrentRegion({
                    latitude,
                    longitude,
                    latitudeDelta: 0.13,
                    longitudeDelta: 0.13,
                })
            }
        }
        loadInitialPosition();
    }, []);
    
    async function loadUsers(){ // essa função vai pegar os users que tiverem as buscar do Input
        const { latitude, longitude } = currentRegion;

        const response = await api.get('/search', {// pegando a resposta da rota /search que temos na APi do backend
            params:{
                latitude, // quando nao se usa o -- propriedadeDoObjeto: recebimentoParaEssaPropriedade -- e fica com esta o codigo agora é pq as duas coisas tem o mesmo nome, dai é so passar o nome sem recebimento que funciona.
                longitude,
                tecnologias,
            },
        });
        
        setUsers(response.data.users);
    }

    function handleRegionChanged(region){ // essa funçao serve para toda vez que o usuario no ceclular ir alterando a longitude e latitude.
        console.log(region);
        setCurrentRegion(region); // jogando as novas localizações.
    }

    if(!currentRegion){
        return null;
    }
    return (
        <>
            <MapView 
                onRegionChangeComplete={handleRegionChanged} 
                initialRegion={currentRegion}  
                style={styles.map} 
            >
                { // para que todos os usuarios da lista fiquem aparecendo no maps como um pontinho de locazação e com seus devidos dados
                    users.map( dev => ( // sempre que usar map o primeiro elemento tem que conter a -- key={} -- maioria das vezes sempre sera um id/cod
                        <Marker
                            key={dev._id}
                            coordinate={{
                                longitude: dev.location.coordinates[0],
                                latitude: dev.location.coordinates[1],
                            }}
                        >
                            <Image style={styles.avatar} source={{ uri: dev.avatar_url }} />
                            <Callout onPress={() => {
                                navigation.navigate('Profile', { github_username: dev.github_username });
                            }}>
                                <View style={styles.callout}>
                                    <Text style={styles.userName}>{dev.name}</Text>
                                    <Text style={styles.userBio}>{dev.bio}</Text>
                                    <Text style={styles.userTec}>{dev.tecnologias.join(', ')}</Text>
                                </View>
                            </Callout>
                        </Marker>
                    ))
                }
            </MapView>
            <View style={styles.searchForm}>
                    <TextInput 
                        style={styles.searchInput} 
                        placeholder="Buscar Devs por Tecs"
                        placeholderTextColor="#999" 
                        autoCapitalize="words"
                        autoCorrect={false}
                        value={tecnologias}
                        onChangeText={ text => setTecnologias(text) }
                    />
                    <TouchableOpacity onPress={loadUsers} style={styles.searchBtn} >
                        <MaterialIcons name="my-location" size={20} color="#FFF"/>
                    </TouchableOpacity>
            </View>
        </>
    )
    }

const styles = StyleSheet.create({
    map: {
        flex: 1,
    },
    avatar: {
        width: 54,
        height: 54,
        borderRadius: 50,
        borderWidth: 2,
        borderColor: '#7D40E7',
    },
    callout:{
        width: 260,
    },
    userName:{
        fontWeight: 'bold',
        fontSize: 16,
    },
    userBio:{
        color:'#666',
        marginTop: 5,
    },
    userTec:{
        marginTop: 5,
    },
    searchForm:{
        position:'absolute',
        top: 20,
        left: 20,
        right: 20,
        zIndex: 5,
        flexDirection: 'row',
    }, 
    searchInput:{
        flex: 1,
        height: 50,
        backgroundColor: '#FFF',
        color: '#333',
        borderRadius: 25,
        paddingHorizontal: 20,
        fontSize: 16,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowOffset: {
            width: 4,
            height: 4,
        },
        elevation: 2,
    },
    searchBtn:{
        width: 50,
        height: 50,
        backgroundColor: '#8F4Dff',
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 15,
    },
});
export default Main;
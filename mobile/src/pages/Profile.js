import React from 'react';
import { View } from 'react-native';
import { WebView } from 'react-native-webview';

function Profile({ navigation }){
    const githubUserName = navigation.getParam('github_username');// pegando o valor de github_username da Main.js linha 39
    return <WebView style={{ flex: 1}} source={{ uri:`https://github.com/${githubUserName}`}} />
}

export default Profile;
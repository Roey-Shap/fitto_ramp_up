import React from 'react';
import {View, Text, StyleSheet} from "react-native";
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/EvilIcons'

const UserIcon = () => {
    const navigation = useNavigation();

    return (
    <View style={ styles.container }>
        <Icon onPress={() => navigation.navigate('UserScreen')} name="user" size = {35} />
    </View>
    );
}
export default UserIcon;

const styles = StyleSheet.create({
    container: {
        padding: 7,
        left: 10,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'

    },

});
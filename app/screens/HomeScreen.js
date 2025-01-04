import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import SafeViewAndroid from '../styles/SafeViewAndroid';
import YellowButton from '../components/YellowButton';
import MenuButton from '../components/MenuButton';

function HomeScreen(props) {
    return (
        <SafeAreaView style={SafeViewAndroid.AndroidSafeArea}>
            <View style={styles.container}>
                <View style={styles.header}>
                    <View style={styles.header_main}>
                        <MenuButton/>
                        <Text style={styles.title_text}>
                        The Pendle Fridge
                        </Text>
                        <Image style={styles.pendle_icon} source={require('../assets/images/pendle.png')}/>
                    </View>
                    <View style={styles.header_btn_container}>
                        <YellowButton title="Donate an item"/>
                    </View>
                </View>
                <View style={styles.body}>
                    <ScrollView >
                        <Text>Hello</Text>
                    </ScrollView>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    header: {
        flex: 1,
        backgroundColor: "green",
    },

    header_main: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        paddingTop: 20,
        paddingBottom: 20,
    },

    header_btn_container: {
        alignItems: "center",
    },

    pendle_icon: {
        width: 50,
        height: 50,
    },

    body: {
        flex: 4,
        backgroundColor: "white"
    },

    title_text: {
        fontFamily: "Poppins",
        fontWeight: "bold",
        fontSize: 29,
        color: "white"
    },

    body_text: {
        fontFamily: "Poppins",
        fontWeight: "bold",
        fontSize: 50,
        color: "black"
    }
});

export default HomeScreen;
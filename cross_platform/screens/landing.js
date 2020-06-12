import React, { Component } from 'react'
import { View, FlatList, Text, StyleSheet, Button, TouchableOpacity, Image } from 'react-native'
import {SearchBar} from 'react-native-elements'
import Constants from 'expo-constants';
import { StackActions } from '@react-navigation/native';
import firebase from '../firebase';
import AsyncStorage from '@react-native-community/async-storage'

const DATA = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      recipeName: 'Palya',
      comment: 'Tasty recipe!!',
      filePath: require('../assets/picture1.jpg')
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      recipeName: 'Dosa',
      comment: 'Yummy recipe..',
      filePath: require('../assets/picture2.jpg')
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      recipeName: 'Upma',
      comment: 'Nice recipe',
      filePath: require('../assets/picture3.jpg')
    },
    {
        id: '58694a0f-3da1-471f-bd96-145571e29d74',
        recipeName: 'Rice',
        comment: 'Tasty recipe',
        filePath: require('../assets/picture1.jpg')
    },
    {
        id: '58694a0f-3da1-471f-bd96-145571e29d78',
        recipeName: 'Poha',
        comment: 'Yummy recipe!',
        filePath: require('../assets/picture2.jpg')
    },

  ];

export class LandingComponent extends Component {

    state = {
        username: '',
        userID: '',
        isLoaded: false
    }

    constructor(props){  
        super(props);
        AsyncStorage.getItem('username').then(value =>
            this.setState({ username: value })
        );
        AsyncStorage.getItem('userID').then(value =>
            {
                this.setState({ userID: value });
                this.setState({ isLoaded: true });
            }
        );
    }

    handleSignout = (navigation) => {
        firebase.auth().signOut().then(function () {
            navigation.dispatch(StackActions.replace('Login'))
        })
        console.log("Signed Out Successfully!")
    }
    render() {
        if(this.state.isLoaded){
        var popularRecipes = this.getPopularRecipeImages();
        return (
            <View style={StyleSheet.container}>
                <View style={StyleSheet.heading}>
                    <View style={styles.new_section}>
                        <Text> Welcome {this.state.username} </Text>
                        <Text> Explore Our Popular Recipes : </Text>
                        <SearchBar        
                            placeholder="Search for Recipes"        
                            lightTheme        
                            round        
                            
                            autoCorrect={false}             
                        />    
                        {/* This is placeholder images for top 3 dishes  */}
                        <View style={{ flexDirection: "row", marginTop: 10 }}>
                            {/* {
                                popularRecipes.map((item, key) => (
                                    <TouchableOpacity key={key} style={{ flex: 1 }} activeOpacity={.5} onPress={() => {
                                        this.props.navigation.push('Recipe', {
                                            imgsrc: item.filePath,
                                            recipeName: item.recipeName
                                        })

                                        this.props.navigation.navigate('Recipe')
                                    }}>
                                        <Image style={{ width: 100, height: 100 }} source={item.filePath} />
                                    </TouchableOpacity>
                                ))
                            } */}
                            <FlatList data = {DATA} 
                            renderItem = {({item})=><View>
                                <TouchableOpacity key={item.id} style={{ margin:5,flex: 1, width:"100%", alignSelf: "center" }} activeOpacity={.5} onPress={() => {
                                        this.props.navigation.push('Recipe', {
                                            imgsrc: item.filePath,
                                            recipeName: item.recipeName
                                        })

                                        this.props.navigation.navigate('Recipe')
                                    }}><View style={styles.listitems}>
                                        <Text style={{marginTop:36}} >{item.recipeName}</Text>
                                        <Image style={{ margin:10, height:70, width:70, borderRadius: 35 }} source={item.filePath} />
                                        </View>
                                    </TouchableOpacity>
                            </View>

                            }
                            keyExtractor={item => item.id}
                            />
                        </View>
                    </View>

                    {/* Fetch and Display Breakfast recipes from backend */}
                    <View style={styles.new_section} >
                        <Text> Breakfast Recipes: </Text>
                    </View>

                    {/* Fetch and Display Lunch recipes from backend */}
                    <View style={styles.new_section} >
                        <Text> Lunch Recipes: </Text>
                    </View>

                    <View style={styles.new_section} >
                        <Text> Dinner Recipes: </Text>
                    </View>
                </View>

                <FlatList
                    // data = {this.props.route.params.data}
                    renderItem={({ item }) => <Text style={styles.item}>{item}</Text>}
                />
                <View style={{ paddingTop: 250 }}>
                    <Button title="Take a Picture" onPress={() => { this.props.navigation.navigate('Camera'); }} />
                </View>
                <Button title="Sign Out" onPress={this.handleSignout.bind(this, this.props.navigation)} />
            </View>
        )
        }
        return null
    }

    getPopularRecipeImages = () => {
        // var popularImageData = [];

        // get from API
        // var popularImageNames = ['picture1.jpg', 'picture2.jpg', 'picture3.jpg'];

        // get from API
        // var popularImageUri = '../assets/';

        // to update the image source dynamically, as require() method takes only static values
        // popularImageNames.forEach(function(key){
        //     popularImageData.push(
        //         {uri: popularImageUri+key}
        //     );
        // });
        // return popularImageData;
        var popularImageData = [
            { filePath: require('../assets/picture1.jpg'), recipeName: "My Recipe 1" },
            { filePath: require('../assets/picture2.jpg'), recipeName: "My Recipe 2" },
            { filePath: require('../assets/picture3.jpg'), recipeName: "My Recipe 3" }
        ];
        return popularImageData;
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: Constants.statusBarHeight,
    },
    item: {
        backgroundColor: '#f9c2ff',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
    },
    heading: {
        fontSize: 1
    },
    new_section: {
        padding: 20,
    },
    listitems:{
        flex:1,
        flexDirection: "row-reverse",
        backgroundColor: '#bdc6cf',
        alignSelf: "center",
        justifyContent: "flex-end",
        padding:5,
        borderRadius:15,
        width: "80%"
    }
});
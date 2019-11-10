/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-unused-vars */
import React, {Component} from 'react';
import {Alert, Platform, StyleSheet, View, StatusBar} from 'react-native';
import {
  Content,
  Fab,
  Button,
  Icon,
  Spinner,
  ListItem,
  Left,
  Body,
  Right,
  Thumbnail,
  Text,
} from 'native-base';
import axios from 'axios';
import ListItems from './component/ListItems';

export default class HomeScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      loading: false,
    };
  }

  makeRemoteRequest = () => {
    this.setState({loading: true});
    setTimeout(() => {
      axios
        .get('http://ec2-3-81-168-96.compute-1.amazonaws.com/api/materi')
        .then(res => {
          const newData = this.state.data.concat(res.data);
          this.setState({
            loading: false,
            data: newData,
          });
        })
        .catch(err => {
          throw err;
        });
    }, 1500);
  };
  componentDidMount() {
    this.makeRemoteRequest();
  }
  handlePostClick = (thumbnail, title, content) => {
    axios
      .post('http://ec2-3-81-168-96.compute-1.amazonaws.com/api/materi', {
        thumbnail,
        title,
        content,
      })
      .then(response => {
        const newData = this.state.data.concat(response.data);
        this.setState({
          data: newData,
        });
        this.props.navigation.popToTop();
      })
      .catch(error => {
        throw error;
      });
  };
  renderFooter = () => {
    if (this.state.loading === false) return null;
    return (
      <View>
        <Spinner color="#1e88e5" />
        <Text
          style={{
            color: '#aaa',
            fontSize: 12,
            textAlign: 'center',
            bottom: 10,
          }}>
          Loading data
        </Text>
      </View>
    );
  };

  handleEdit = (thumbnail, title, content, id) => {
    axios
      .put('http://ec2-3-81-168-96.compute-1.amazonaws.com/api/materi/${id}', {
        thumbnail,
        title,
        content,
      })
      .then(response => {
        this.setState({
          data: response.data,
        });
        this.props.navigation.popToTop();
      })
      .catch(error => {
        throw error;
      });
  };
  handleDelete = (id, index) => {
    axios
      .delete('http://ec2-3-81-168-96.compute-1.amazonaws.com/api/materi/${id}')
      .then(res => {
        const newData = this.state.data.concat();
        newData.slice(index, 1);

        this.setState({
          data: newData,
        });
      })
      .catch(err => {
        throw err;
      });
  };

  renderList = (item, index) => {
    return (
      <ListItem
        style={{marginRight: 20}}
        avatar
        key={index}
        onPress={() =>
          this.props.navigation.navigate('Edit', {
            id: item._id,
            handleEdit: this.handleEdit,
          })
        }
        onLongPress={() =>
          Alert.alert(
            'Are you sure',
            'you want to delete this List ?',
            [
              {text: 'Cancel', onPress: () => null},
              {text: 'OK', onPress: () => this.handleDelete(item._id, index)},
            ],
            {cancelable: false},
          )
        }>
        <Left>
          <Thumbnail
            style={{backgroundColor: '#1e88e5'}}
            source={{
              uri:
                'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/Gnome-stock_person.svg/1024px-Gnome-stock_person.svg.png',
            }}
          />
        </Left>
        <Body>
          <Text>{item.thumbnail}</Text>
          <Text note>{item.title}</Text>
          <Text note>{item.content}</Text>
        </Body>
      </ListItem>
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="#1e88e5" barStyle="light-content" />
        <View style={{flex: 1}}>
          <ListItems
            {...this.props}
            data={this.state.data}
            renderList={this.renderList}
            renderFooter={this.renderFooter}
          />
        </View>
        <Fab
          style={{backgroundColor: '#1e88e5'}}
          position="bottomRight"
          onPress={() =>
            this.props.navigation.navigate('Add', {
              handlePostClick: this.handlePostClick,
            })
          }>
          <Icon type="FontAwesome" name="pencil" />
        </Fab>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
});

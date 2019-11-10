/* eslint-disable no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  Container,
  List,
  Left,
  Body,
  Right,
  Thumbnail,
  ListItem,
  Content,
  Form,
  Item,
  Input,
  Button,
  Text,
  Label,
} from 'native-base';
import {FlatList} from 'react-native';
import axios from 'axios';

export default class EditScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      nama: '',
      nomor: '',
      email: '',
    };
  }

  componentDidMount() {
    axios
      .get(
        'http://ec2-3-81-168-96.compute-1.amazonaws.com/api/materi/${this.props.navigation.state.params.id}',
      )
      .then(res => {
        const newData = this.state.data.concat(res.data);
        this.setState({
          data: newData,
          thumbnail: res.data.thumbnail,
          title: res.data.title,
          content: res.data.content,
        });
      })
      .catch(err => {
        throw err;
      });
  }

  handleThumbnail = val => {
    this.state({
      thumbnail: val,
    });
  };

  handleTitle = val => {
    this.state({
      title: val,
    });
  };

  handleContent = val => {
    this.state({
      content: val,
    });
  };

  handleEdit = id => {
    const {thumbnail, title, content} = this.state;
    this.props.navigation.state.params.handleEdit(
      thumbnail,
      title,
      content,
      id,
    );
    this.setState({
      thumbnail: '',
      title: '',
      content: '',
    });
  };

  render() {
    const {id} = this.props.navigation.state.params;
    return (
      <Container>
        <Content>
          <List style={{marginTop: 10}}>
            <FlatList
              data={this.state.data}
              keyExtractor={(item, index) => item._id}
              renderItem={({item, index}) => (
                <ListItem style={{marginRight: 20}} avatar>
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
              )}
            />
          </List>

          <Text
            style={{
              alignSelf: 'center',
              marginTop: 20,
              marginBottom: 20,
              color: '#aaa',
            }}>
            Fill the form to edit
          </Text>
          <Form style={{marginRight: 20, marginLeft: 5}}>
            <Item stackedLabel>
              <Label>Thumbnail</Label>
              <Input
                value={this.state.thumbnail}
                onChangeText={this.handleThumbnail}
              />
            </Item>
            <Item stackedLabel>
              <Label>Title</Label>
              <Input value={this.state.title} onChangeText={this.handleTitle} />
            </Item>
            <Item stackedLabel>
              <Label>Content</Label>
              <Input
                value={this.state.content}
                onChangeText={this.handleContent}
              />
            </Item>
          </Form>
          <Button block transparent onPress={() => this.handleEdit(id)}>
            <Text>Done</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}

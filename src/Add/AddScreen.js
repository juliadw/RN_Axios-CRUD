/* eslint-disable no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  Container,
  Content,
  Title,
  Form,
  Item,
  Input,
  Button,
  Text,
  Label,
  Thumbnail,
} from 'native-base';

export default class Addscreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      thumbnail: '',
      content: '',
      title: '',
    };
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
  handlePostClick = () => {
    const {thumbnail, title, content} = this.state;
    this.props.navigation.state.params.handlePostClick(
      thumbnail,
      title,
      content,
    );
    this.setState({
      thumbnail: '',
      title: '',
      content: '',
    });
  };
  render() {
    return (
      <Container>
        <Content>
          <Thumbnail
            style={{
              marginTop: 20,
              marginBottom: 10,
              alignSelf: 'center',
              backgroundColor: '#1e88e5',
            }}
            source={{
              uri:
                'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/Gnome-stock_person.svg/1024px-Gnome-stock_person.svg.png',
            }}
          />
          <Form style={{marginRight: 20, marginLeft: 5}}>
            <Item floatingLabel>
              <Label>Thumbnail</Label>
              <Input
                value={this.state.thumbnail}
                onChangeText={this.handleThumbnail}
                required
              />
            </Item>
            <Item floatingLabel>
              <Label>Title</Label>
              <Input
                value={this.state.title}
                onChangeText={this.handleTitle}
                required
              />
            </Item>
            <Item floatingLabel>
              <Label>Content</Label>
              <Input
                value={this.state.content}
                onChangeText={this.handleContent}
                required
              />
            </Item>
          </Form>
          <Button block transparent onPress={this.handlePostClick}>
            <Text>Done</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}

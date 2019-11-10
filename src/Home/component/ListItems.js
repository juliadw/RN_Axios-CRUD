/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-unused-vars */
import React, {Component} from 'react';
import {Container, Header, Content, List, Item} from 'native-base';
import {FlatList, Alert} from 'react-native';

export default class ListItems extends Component {
  render() {
    const {renderFooter, renderList} = this.props;
    return (
      <List style={{marginTop: 110}}>
        <FlatList
          data={this.props.data}
          keyExtractor={(item, index) => item._id}
          ListFooterComponent={renderFooter()}
          renderItem={({item, index}) => renderList(item, index)}
        />
      </List>
    );
  }
}

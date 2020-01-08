import Taro , { Component } from '@tarojs/taro';
// import _ from 'lodash'
import { View, Text , Button, ScrollView } from '@tarojs/components';
import { AtSearchBar } from 'taro-ui'

import './search.scss'

export default class Index extends Component {

  config = {
    navigationBarTitleText: '搜索'
  }

  state = {
    value: '',
    list: []
  }

  onChange (value) {
    this.setState({
      value
    })
  }

  componentWillMount () {}
  componentDidMount () {
    this._getData()
  } 
  componentWillReceiveProps (nextProps,nextContext) {} 
  componentWillUnmount () {} 
  componentDidShow () {} 
  componentDidHide () {} 
  componentDidCatchError () {} 
  componentDidNotFound () {} 

  _getData() {
    Taro.request({
      url: 'https://ik9hkddr.qcloud.la/index.php/trade/get_search_list',
      data: {
        keyword: this.state.value
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: (result) => {
        if (result.data.ret) {
          this.setState({
            list: result.data.data
          })
        }
      }
    })
  }

  handleActionClick = () => {
    this._getData()
  }

  render() {
    return (
      <View className="search-wrap">
        <View className="my-search-bar">
          <AtSearchBar
            value={this.state.value}
            onChange={this.onChange.bind(this)}
            showActionButton={true}
            onActionClick={this.handleActionClick}
          />
        </View>
        <ScrollView
          className="result-list"
          scroll-y
        >
          {
            this.state.list.map((item, index) => {
              return (
                <View 
                  className="list-item"
                  key={item.id}
                >
                  <View className="list-address">
                    <Text>{item.address}</Text>
                  </View>
                  <View className="list-message">
                    <Text>{item.message}</Text>
                  </View>
                </View>
              )
            })
          }
        </ScrollView>
      </View>
    );
  }
}
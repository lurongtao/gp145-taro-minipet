import Taro , { Component } from '@tarojs/taro';
import { View, Text , Button} from '@tarojs/components';
import { connect } from '@tarojs/redux'
import './detail.scss'

@connect((state) => {
  return {
    id: state.id
  }
})
class Detail extends Component {

  config = {
    navigationBarTitleText: ''
  }

  state = {
    message: {}
  }

  componentWillMount () {}
  componentDidMount () {
    // this.config.navigationBarTitleText = this.props.id
    Taro.setNavigationBarTitle({
      title: this.props.id
    })
    Taro.request({
      url: 'https://ik9hkddr.qcloud.la/index.php/trade/get_item',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        id: this.$router.params.id
      },
      success: (result) => {
        this.setState({
          message: result.data.data
        })
      }
    })
  } 
  componentWillReceiveProps (nextProps,nextContext) {} 
  componentWillUnmount () {} 
  componentDidShow () {} 
  componentDidHide () {} 
  componentDidCatchError () {} 
  componentDidNotFound () {} 

  handleBackTap = () => {
    Taro.navigateBack({})
  }

  render() {
    return (
      <View 
        className="publish-wrap"
      >
        <View className="item">
          <View className="label">
            我的地址
          </View>
          <View 
            className="content"
          >
            {message.address}
          </View>
        </View>
        <View className="item">
          <View className="label">
            类型
          </View>
          <View className="content">
            {message.type}
          </View>
        </View>
        <View className="item">
          <View className="label">
            说明
          </View>
          <View className="content">
            {message.message}
          </View>
        </View>
        <View className="item">
          <View className="label">
            联系方式
          </View>
          <View className="content">
            {message.contact}
          </View>
        </View>

        <View>
          <Button
            className="button"
            type="primary"
            size=""
            onClick={this.handleBackTap}
          >返回</Button>
        </View>
      </View>
    );
  }
}

export default Detail
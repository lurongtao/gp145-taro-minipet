import Taro , { Component, Fragment } from '@tarojs/taro';
import { View, Text , Button, Icon } from '@tarojs/components';

import './notice.scss'

export default class Index extends Component {

  config = {
    navigationBarTitleText: 'notice'
  }

  state={}

  componentWillMount () {}
  componentDidMount () {} 
  componentWillReceiveProps (nextProps,nextContext) {} 
  componentWillUnmount () {} 
  componentDidShow () {} 
  componentDidHide () {} 
  componentDidCatchError () {} 
  componentDidNotFound () {} 

  handleNoticeTap() {
    if (this.props.isSucc) {
      Taro.reLaunch({
        url: '../index/index',
      })
    } else {
      this.props.onChangeSubmit(false)
    }
  }

  render() {
    let { isSubmit, isSucc } = this.props
    return (
      <Fragment>
        {
          isSubmit && (<View 
            className="notice"
          >
            <View className="info">
              <Icon
                type={isSucc ? 'success' : 'cancel'}
                size="{{46}}"
              ></Icon>
              <Text>
                信息发布{isSucc ? '成功' : '失败'}！
              </Text>
            </View>
    
            <Button
              className={`button ${isSucc ? 'back' : 'submit'}`}
              type="primary"
              size=""
              onClick={this.handleNoticeTap}
            >
              {isSucc ? '返回首页' : '再次提交'}
            </Button>
          </View>)
        }
      </Fragment>
    )
  }
}
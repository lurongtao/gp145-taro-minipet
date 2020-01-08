import Taro , { Component, Fragment } from '@tarojs/taro';
import { View, Text , Button, RadioGroup, Radio, Input } from '@tarojs/components';

import './publish.scss'

import Notice from '../../components/Notice'

class Index extends Component {

  config = {
    navigationBarTitleText: '信息发布'
  }

  state = {
    address: '点击选择，要勾选哦~',
    isSubmit: false,
    isSucc: false
  }

  componentWillMount () {
    this.staticData = {
      type: 'buy'
    }
  }

  componentDidMount () {} 
  componentWillReceiveProps (nextProps,nextContext) {} 
  componentWillUnmount () {} 
  componentDidShow () {} 
  componentDidHide () {} 
  componentDidCatchError () {} 
  componentDidNotFound () {} 

  handleAddressTap() {
    Taro.chooseLocation({
      success: (res) => {
        this.setState({
          address: res.address
        })

        this.staticData.longitude = res.longitude
        this.staticData.latitude = res.latitude
      }
    })
  }

  radioChange(e) {
    this.staticData.type = e.detail.value
  }

  bindMessageInput(e) {
    this.staticData.message = e.detail.value
  }

  bindContactInput(e) {
    this.staticData.contact = e.detail.value
  }

  showToast(title) {
    Taro.showToast({
      title,
      icon: 'loading',
      duration: 2000
    })
  }

  handleSubmitTap() {
    if (this.state.address === '点击选择，要勾选哦~') {
      this.showToast('请选择地址')
      return
    }

    if (!this.staticData.message) {
      this.showToast('请填写说明')
      return
    }

    if (!this.staticData.contact) {
      this.showToast('请填写联系方式')
      return
    }

    const data = {
      ...this.staticData,
      address: this.state.address
    }

    Taro.request({
      url: 'https://ik9hkddr.qcloud.la/index.php/trade/add_item', 
      data,
      method: 'POST',
      dataType: 'json',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: (res) => {
        this.setState({
          isSubmit: true,
          isSucc: res.data.ret
        })
      }
    })
  }

  handleNoticeTap() {
    this.state.isSucc
    ? (
      Taro.reLaunch({
        url: '/pages/index/index',
      })
    )
    : (
      this.setState({
        isSubmit: false
      })
    )
  }

  handleChangeSubmit = (isSubmit) => {
    this.setState({
      isSubmit
    })
  }

  render() {
    return (
      <Fragment>
        {
          !this.state.isSubmit
          ? (
            <View
              className="publish-wrap"
            >
              <View className="item">
                <View className="label">
                  我的地址
                </View>
                <View 
                  className="content"
                  onClick={this.handleAddressTap}
                >
                  {this.state.address}
                </View>
              </View>
              <View className="item">
                <View className="label">
                  类型
                </View>
                <View className="content">
                  <RadioGroup className="radio-group" onChange={this.radioChange}>
                    <Radio className="radio" value="buy" checked={true}>
                      <Text>求购</Text>
                    </Radio>
                    <Radio className="radio" value="sell">
                      <Text>转让</Text>
                    </Radio>
                  </RadioGroup>
                </View>
              </View>
              <View className="item">
                <View className="label">
                  说明
                </View>
                <View className="content">
                  <Input className="weui-input" maxlength="10" onInput={this.bindMessageInput} placeholder="填写您的具体需求"/>
                </View>
              </View>
              <View className="item">
                <View className="label">
                  联系方式
                </View>
                <View className="content">
                  <Input className="weui-input" maxlength="10" onInput={this.bindContactInput} placeholder="填写您的联系方式"/>
                </View>
              </View>

              <View>
                <Button
                  className="button"
                  type="primary"
                  size=""
                  onClick={this.handleSubmitTap}
                >发布信息</Button>
              </View>
            </View>
          )
          : (
            <Notice
              isSubmit={this.state.isSubmit}
              isSucc={this.state.isSucc}
              onChangeSubmit={this.handleChangeSubmit}
            />
          )
        }
      </Fragment>
    )
  }
}
export default Index;
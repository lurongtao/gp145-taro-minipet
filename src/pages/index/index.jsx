import Taro, { Component } from '@tarojs/taro'
import { View, Button, Text, CoverImage, CoverView, Navigator, Map } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { changeId } from '../../actions/id'

import './index.scss'

import center from '../../resources/center.png'
import pin from '../../resources/pin.png'
import buy from '../../resources/buy.png'

@connect((state) => {
  return {
    id: state.id
  }
}, (dispatch) => {
  return {
    changeId(id) {
      dispatch(changeId(id))
    }
  }
})
class Index extends Component {
  config = {
    navigationBarTitleText: '萌宠交易平台'
  }

  state = {
    longitude: 0,
    latitude: 0,
    markers: [],
    _map: Taro.createMapContext('map')
  }

  componentDidMount() {
    Taro.getLocation({
      type: 'wgs84',
      success: (res) => {
        this.setState({
          longitude: res.longitude,
          latitude: res.latitude
        })
      }
    })

    Taro.request({
      url: 'https://ik9hkddr.qcloud.la/index.php/trade/get_list',
      success: (result) => {
        let markers = result.data.data.map((value, index) => {
          return {
            iconPath: require(`../../resources/${value.type}.png`),
            id: value.id,
            latitude: value.latitude,
            longitude: value.longitude,
            width: 40,
            height: 40,
            callout: {}
          }
        })
        this.setState({
          markers
        })
      }
    })
  }

  handleCoverTap = () => {
    this.state._map.moveToLocation()
  }

  handlePubTap() {
    Taro.navigateTo({
      url: '../publish/publish',
    })
  }

  markertap(e) {
    Taro.navigateTo({
      url: '../detail/detail?id=' + e.markerId,
    })
    this.props.changeId(e.markerId)
  }

  render () {
    let { markers, latitude, longitude } = this.state
    return (
      <View className="wrap">
        <View className="map">
          <Map 
            id="map"
            markers={markers}
            show-location
            latitude={latitude}
            longitude={longitude}
            onMarkerTap={this.markertap}
            scale="16"
          >
            <CoverImage
              src={center}
              className="cover-center"
              onClick={this.handleCoverTap}
            ></CoverImage>
            <CoverView
              className="cover-pin"
            >
              <CoverImage src={pin} />
            </CoverView>
          </Map>
        </View>
        <View className="nav">
          <View onClick={this.handlePubTap}>发布</View>
          <Navigator url="../search/search">搜索</Navigator>
        </View>
      </View>
    )
  }
}

export default Index

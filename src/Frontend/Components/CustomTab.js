
import React from 'react'
import {
  StyleSheet, View,
  Animated, Dimensions
} from 'react-native'
import IconFontAwesome from 'react-native-vector-icons/FontAwesome'
import Toggle from './Toggle'

const IconFontAwesomeAnimated = Animated.createAnimatedComponent(IconFontAwesome)
const Width = Dimensions.get('window').width

export default class CustomTab extends React.PureComponent {
  constructor (props) {
    super(props)
    this.offset = new Animated.Value(0)
    this.props.scrollValue.addListener(this.updateView)
  }
  updateView = (offset) => {
    // offset.value | 0-1
    this.offset.setValue(-(offset.value - 1) * (Width / 2 - NAVI_BTN_SIZE + TOGGE_PADDING))
  }

  render () {
    const {goToPage, activeTab} = this.props

    // Animated btn scale
    const scaleBtnLeft = this.offset.interpolate({
      inputRange: [-1 * (Width / 2 - NAVI_BTN_SIZE), 0, 1 * (Width / 2 - NAVI_BTN_SIZE)],
      outputRange: [1, 1, 1.5]
    })
    const WidthBtnCenter = this.offset.interpolate({
      inputRange: [-1 * (Width / 2 - NAVI_BTN_SIZE), 0, 1 * (Width / 2 - NAVI_BTN_SIZE)],
      outputRange: [TOGGE_WIDTH / 2, TOGGE_WIDTH + TOGGE_PADDING, TOGGE_WIDTH / 2]
    })
    const scaleBtnRight = this.offset.interpolate({
      inputRange: [-1 * (Width / 2 - NAVI_BTN_SIZE), 0, 1 * (Width / 2 - NAVI_BTN_SIZE)],
      outputRange: [1.5, 1, 1]
    })

    // Animated btn colors
    const colorBtnLeft = scaleBtnLeft.interpolate({
      inputRange: [1, 1.5],
      outputRange: [IconColor, '#fcca35']
    })

    const colorBtnRight = scaleBtnRight.interpolate({
      inputRange: [1, 1.5],
      outputRange: [IconColor, 'lightgreen']
    })

    return (
      <View style={[styles.header]}>
        <Animated.View style={[styles.headerAnimated, {marginLeft: this.offset}]}>
          <Animated.Text
            onPress={() => goToPage(0)}
            style={[styles.Btn, { transform: [{scale: scaleBtnLeft}] }]}
          >
            <IconFontAwesomeAnimated name='user' style={{ color: colorBtnLeft, fontSize: 25 }} />
          </Animated.Text>

          <Toggle goToPage={goToPage} width={WidthBtnCenter} isActive={activeTab === 1}/>

          <Animated.Text
            onPress={() => goToPage(2)}
            style={[styles.Btn, {transform: [ {scale: scaleBtnRight} ]}]}
          >
            <IconFontAwesomeAnimated name='comments' style={{ color: colorBtnRight, fontSize: 25 }} />
          </Animated.Text>
        </Animated.View>
      </View>
    )
  }
}

const NAVI_BTN_SIZE = 36
const TOGGE_WIDTH = 80
const TOGGE_PADDING = 10
const IconColor = '#e3e5e8'

const styles = StyleSheet.create({

  Btn: {
    width: NAVI_BTN_SIZE,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center'
  },
  header: {
    width: Width
  },
  headerAnimated: {
    width: Width,
    padding: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  }
})
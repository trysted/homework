import Svg, { Path } from "react-native-svg"
import { Animated, Easing, ColorValue } from "react-native"

type LoaderProps = {
    stroke: ColorValue
}

export const Loader = ({stroke}: LoaderProps) => {

    const spinValue = new Animated.Value(0);

    const animation = Animated.loop(
        Animated.timing(spinValue, {
            toValue: 1,
            duration: 1000,
            easing: Easing.inOut(Easing.ease),
            delay: 0,
            useNativeDriver: true
        }), {iterations: 100}
    ).start()

    const spin = spinValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg']
    })

  return (
    <Animated.View style = { {width: 22, height: 22, transform: [{rotate: spin}] } }>
        <Svg width={22} height={22} fill="none">
        <Path
        d="M1 11c0 5.523 4.477 10 10 10v0c5.523 0 10-4.477 10-10S16.523 1 11 1"
        stroke = {stroke}
        strokeWidth={1.5}
        strokeLinecap="round"
        />
    </Svg>
    </Animated.View>
  )
}
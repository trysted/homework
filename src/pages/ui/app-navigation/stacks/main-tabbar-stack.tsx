import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Main, Atms, Profile } from '@pages/screens';
import { StackParamList } from '@entities/common/models/types';
import { NativeStackNavigationProp, createNativeStackNavigator } from '@react-navigation/native-stack';
import { getFocusedRouteNameFromRoute, useNavigation } from '@react-navigation/native';
import { Images } from '../../../../../assets';
import { Button, ImageSourcePropType, Platform } from 'react-native';
import { styled } from '@shared/ui/theme';
import { PaymentsStackNavigation } from './payments-stack';
import { useTheme } from 'styled-components';

const Stack = createNativeStackNavigator<StackParamList>()
const Tabs = createBottomTabNavigator()

type TabBarIconProps = {
  isFocused: boolean,
  source: ImageSourcePropType
}

type TabBarLabelProps = {
  isFocused: boolean,
  title: string
}

type TabBarIconUIProps = {
  isFocused: boolean
}

type TabBarLabelUIProps = {
  isFocused: boolean
}

const TabBarIcon = styled.Image<TabBarIconUIProps>`
  width: 24px;
  height: 24px;
  tint-color: ${ ({theme, isFocused}) => isFocused ? theme.palette.accent.secondary : theme.palette.text.secondary };
`
const TabBarLabel = styled.Text<TabBarLabelUIProps>`
  letter-scaping: ${ ({theme}) => theme.typography.caption2.letterSpacing };
  font-family: ${ ({theme}) => theme.typography.caption2.fontFamily };
  font-size: ${ ({theme}) => theme.typography.caption2.size };
  font-weight: 400;
  color: ${ ({theme, isFocused}) => isFocused ? theme.palette.accent.secondary : theme.palette.text.secondary };
`

export const MainAppNavigation = () => {
    const navigation = useNavigation<NativeStackNavigationProp<StackParamList>>()
    const theme = useTheme()

    const tabBarIcon = ({isFocused, source}: TabBarIconProps)  => {
      return <TabBarIcon source = {source} isFocused = { isFocused } />
    }

    const tabBarLabel = ({isFocused, title}: TabBarLabelProps) => {
      return <TabBarLabel isFocused = { isFocused }>{title}</TabBarLabel>
    }

    return (
        <Tabs.Navigator screenOptions={{ 
        tabBarStyle: { backgroundColor: theme.palette.background.primary, borderTopWidth: 0 },
        headerStyle: { backgroundColor: theme.palette.background.primary },
        headerTintColor: 'white',
        headerShadowVisible: false
        }}>
        <Tabs.Screen name = 'Главная' component = { Main }  options = {{ 
            tabBarLabel: ({focused}) => (
              tabBarLabel({ isFocused: focused, title: 'Главная' })
            ),
            tabBarIcon: ({ focused }) => (
              tabBarIcon( {isFocused: focused, source: Images.mainTab})
            )
        }}/>
    
        <Tabs.Screen name = 'Платежи' component = { PaymentsStackNavigation }
        options={({route}) => ({
            headerShown: false,
            tabBarLabel: ({focused}) => (
              tabBarLabel({ isFocused: focused, title: 'Платежи' })
            ),
            tabBarIcon: ({ focused }) => (
              tabBarIcon( {isFocused: focused, source: Images.paymentTab})
            ),
            headerStyle: {
              borderBottomWidth: 0,
              backgroundColor: theme.palette.background.primary
            },
            tabBarOptions: {
              keyboardHidesTabBar: Platform.OS !== 'ios',
            },
            tabBarStyle: {
              display: getFocusedRouteNameFromRoute(route) === "paymentsType" || getFocusedRouteNameFromRoute(route) === undefined ? 'flex' : 'none',
              backgroundColor: theme.palette.background.primary,
              borderTopWidth: 0
            }
          })}
          />
  
        <Tabs.Screen name = 'Банкоматы' component = { Atms } options = {{ 
        tabBarLabel: ({focused}) => (
            tabBarLabel({ isFocused: focused, title: 'Банкоматы' })
        ),
        tabBarIcon: ({ focused }) => (
            tabBarIcon( {isFocused: focused, source: Images.atmsTab})
        )
        }}/>
  
        <Tabs.Screen name = 'Профиль' component = { Profile }  options = {{ 
        tabBarLabel: ({focused}) => (
            tabBarLabel({ isFocused: focused, title: 'Профиль' })
        ),
        tabBarIcon: ({ focused }) => (
            tabBarIcon( {isFocused: focused, source: Images.profileTab})
        ),
        headerRight: () => (
          <Button
            onPress={() => {
              navigation.popToTop()
            }}
            title = "Выход"
            color = '#FFF'
          />
        ),
        }} />
        </Tabs.Navigator>
    )
}
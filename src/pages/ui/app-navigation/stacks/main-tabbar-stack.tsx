import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Main, Atms, Profile } from '@pages/screens';
import { StackParamList } from '@shared/types/types';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { Images } from '../../../../../assets';
import { ImageSourcePropType, Platform } from 'react-native';
import { styled } from '@shared/ui/theme';
import { PaymentsStackNavigation } from './payments-stack';

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
  theme: any,
  isFocused: boolean
}

type TabBarLabelUIProps = {
  theme: any,
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
    const tabBarIcon = ({isFocused, source}: TabBarIconProps)  => {
      return <TabBarIcon source = {source} isFocused = { isFocused } />
    }

    const tabBarLabel = ({isFocused, title}: TabBarLabelProps) => {
      return <TabBarLabel isFocused = { isFocused }>{title}</TabBarLabel>
    }

    return (
        <Tabs.Navigator screenOptions={{ 
        tabBarStyle: { backgroundColor: '#312C39', borderTopWidth: 0 },
        headerStyle: { backgroundColor: '#312C39' },
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
              backgroundColor: '#312C39'
            },
            tabBarOptions: {
              keyboardHidesTabBar: Platform.OS !== 'ios',
            },
            tabBarStyle: {
              display: getFocusedRouteNameFromRoute(route) === "paymentsType" || getFocusedRouteNameFromRoute(route) === undefined ? 'flex' : 'none',
              backgroundColor: '#312C39',
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
        }} />
        </Tabs.Navigator>
    )
}
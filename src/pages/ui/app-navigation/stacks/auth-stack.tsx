import { PhoneAuth, PinCode, PasswordScreen, SuccessScreen, ErrorScreen } from '@pages/screens';
import { StackParamList } from '@shared/types/types';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MainAppNavigation } from './main-tabbar-stack';

const Stack = createNativeStackNavigator<StackParamList>()

export const AuthStackNavigation = () => {
    return (
        <Stack.Navigator screenOptions= {{ 
          headerShown: false,
          gestureEnabled: false
        }}>
            <Stack.Group>
                <Stack.Screen name = 'phoneAuth' component = { PhoneAuth }/>
                <Stack.Screen name = 'pinCode' component = { PinCode } />
                <Stack.Screen name = 'passwordScreen' component = { PasswordScreen } />
                <Stack.Screen name = 'successScreen' component = { SuccessScreen } />
                <Stack.Screen name = 'mainTabBarScreen' component = { MainAppNavigation } />
            </Stack.Group>
            <Stack.Group screenOptions = {{presentation: 'fullScreenModal'}}> 
                <Stack.Screen name = 'errorScreen' component = { ErrorScreen }/>
            </Stack.Group>
        </Stack.Navigator>
    )
}
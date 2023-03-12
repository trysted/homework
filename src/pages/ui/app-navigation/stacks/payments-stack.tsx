import { PaymentServices, Payments, Payment } from '@pages/screens';
import { StackParamList } from '@shared/types/types';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useTheme } from 'styled-components';

const Stack = createNativeStackNavigator<StackParamList>()

export const PaymentsStackNavigation = () => {
    const theme = useTheme()

    return (
        <Stack.Navigator screenOptions= {{ 
          headerStyle: { 
            backgroundColor: theme.palette.background.primary,
          },
          headerTintColor: 'white',
          headerShadowVisible: false
        }}>
          <Stack.Screen name = 'paymentsType' component = { Payments } options = {{ title: 'Платежи', headerShown: false }} />
          <Stack.Screen name = 'paymentServices' component = { PaymentServices } options={({route}) => ({title: route.params.title})}/>
          <Stack.Screen name = 'payment' component = { Payment } />
        </Stack.Navigator>
    )
}
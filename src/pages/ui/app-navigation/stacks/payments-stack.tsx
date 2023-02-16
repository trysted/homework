import { PaymentServices, Payments, Payment } from '@pages/screens';
import { StackParamList } from '@shared/types/types';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator<StackParamList>()

export const PaymentsStackNavigation = () => {
    return (
        <Stack.Navigator screenOptions= {{ 
          headerStyle: { 
            backgroundColor: '#312C39',
          },
          headerTintColor: 'white',
          headerShadowVisible: false
        }}>
          <Stack.Screen name = 'paymentsType' component = { Payments } options = {{ title: 'Платежи', headerShown: false }} />
          <Stack.Screen name = 'paymentServices' component = { PaymentServices }/>
          <Stack.Screen name = 'payment' component = { Payment } />
        </Stack.Navigator>
    )
}
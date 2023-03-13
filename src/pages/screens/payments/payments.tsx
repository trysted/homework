import { ActivityIndicator } from "react-native"
import { Flex1 } from "@shared/ui/core"
import { useEffect } from "react"
import { PaymentCategory } from "@entities/payments/models/types"
import { useStore } from "effector-react"
import { ErrorAlert } from "@shared/ui/core"
import { $paymentsGetStatus, clearError, fetchPaymentsFx } from "@entities/payments/models"
import { styled } from "@shared/ui/theme"
import { useTheme } from "styled-components"
import { PaymentsHeader, PaymentsTemplate } from "./components"
import { useNavigation } from "@react-navigation/native"
import { StackParamList } from "@entities/common/models/types"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"

const Container = styled(Flex1)`
    background-color: ${ ({theme}) => theme.palette.background.secondary };
`
const ActivityIndicatorContainer = styled(Container)`
    justify-content: center;
    align-self: center;
`

export const Payments = () => {
    const navigation = useNavigation<NativeStackNavigationProp<StackParamList>>()
    const { loading, error, data } = useStore($paymentsGetStatus)
    const theme = useTheme()

    const fetchCategories = (ignoreCache: boolean) => {
        fetchPaymentsFx(ignoreCache)
    }

    useEffect(() => {
        fetchCategories(false)
    }, [])

    const onRefresh = () => {
        fetchCategories(true)
    }

    const handleCloseErrorAlert = () => {
        if (!data) {
            fetchCategories(false)
        } else {
            clearError()
        }
    }

    const onPressCategory = (category: PaymentCategory) => {
        navigation.navigate(
            'paymentServices',
            {
                title: category.categoryName,
                services: category.services
            }
            )
    }

    if (!data && loading) {
        return (
        <Container>
            <PaymentsHeader title = "Платежи" />
            <ActivityIndicatorContainer>
                <ActivityIndicator size = 'large'/>
            </ActivityIndicatorContainer>
        </Container>
        )
    }

    return (
        <Container>
            <ErrorAlert 
                isVisiable = { Boolean(error) } 
                title = { error?.message ?? '' }
                onClose = { handleCloseErrorAlert }
                timeToDismiss = { 2000 }
            />
            <PaymentsTemplate
            header = {{ title: "Платежи" }}
            categories = {{ 
                data: data,
                onPress: onPressCategory,
                onRefresh: onRefresh,
                refreshing: (data && loading) ?? false,
                refreshTintColor: theme.palette.accent.tertiary
            }}
            />
        </Container>
    )
}
import { ActivityIndicator, FlatList, FlatListProps, RefreshControl } from "react-native"
import { TitledImageItem, Separator, Flex1, Typography } from "@shared/ui/core"
import { useEffect } from "react"
import { StackParamList, PaymentCategory } from "@shared/types/types"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { useNavigation } from "@react-navigation/native"
import { useStore } from "effector-react"
import { ErrorAlert } from "@shared/ui/core"
import { $paymentsGetStatus, clearError, fetchPaymentsFx } from "@entities/payments/models"
import { styled } from "@shared/ui/theme"
import { useTheme } from "styled-components"

const Container = styled(Flex1)`
    background-color: ${ ({theme}) => theme.palette.background.secondary };
`
const ActivityIndicatorContainer = styled(Container)`
    justify-content: center;
    align-self: center;
`
const Header = styled.View`
    background-color: ${ ({theme}) => theme.palette.background.primary };
    height: 116px;
    justify-content: flex-end;
`
const HeaderText = styled(Typography)`
    margin: 0px ${ ({theme}) => theme.spacing(2) }px;
`
const CategoryFlatList = styled(FlatList as new (props: FlatListProps<PaymentCategory>) => FlatList<PaymentCategory>)`
    flex: 1;
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

    if (!data && loading) {
        return (
        <Container>
            <Header>
                <HeaderText>Платежи</HeaderText>
            </Header>
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
            <Header>
                <HeaderText variant = 'title'>Платежи</HeaderText>
            </Header>
            <CategoryFlatList 
            data = { data }
            renderItem = { ({ item }) => (
                <TitledImageItem isSmallImage = { true } title = { item.categoryName } source = { item.categoryIcon } onClick = { 
                    () => { 
                        navigation.navigate(
                        'paymentServices',
                        {
                            title: item.categoryName,
                            services: item.services
                        }
                        )}
                } />
            )}
            keyExtractor={item => item.categoryId }
            ItemSeparatorComponent = { Separator }
            refreshControl = {
                <RefreshControl
                refreshing = { (data && loading) ?? false }
                onRefresh = { onRefresh }
                tintColor = { theme.palette.accent.tertiary }
                />
            }
            />
        </Container>
    )
}
import { ActivityIndicator, FlatList, FlatListProps, RefreshControl } from "react-native"
import { TitledImageItem, Separator } from "@shared/ui/core"
import { useEffect } from "react"
import { StackParamList, PaymentCategory } from "@shared/types/types"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { useNavigation } from "@react-navigation/native"
import { useStore } from "effector-react"
import { ErrorAlert } from "@shared/ui/core"
import { $paymentsGetStatus, clearCache, clearError, fetchPaymentsFx } from './model'
import { styled } from "@shared/ui/theme"

type PaymentsProps = {}

const Container = styled.View`
    flex: 1;
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
const HeaderText = styled.Text`
    color: ${ ({theme}) => theme.palette.text.primary };
    letter-scaping: ${ ({theme}) => theme.typography.title.letterSpacing };
    font-family: ${ ({theme}) => theme.typography.title.fontFamily };
    font-size: ${ ({theme}) => theme.typography.title.size };
    margin: 0px ${ ({theme}) => theme.spacing(2) }px;
`
const CategoryFlatList = styled(FlatList as new (props: FlatListProps<PaymentCategory>) => FlatList<PaymentCategory>)`
    flex: 1;
`

export const Payments = ({}: PaymentsProps) => {
    const navigation = useNavigation<NativeStackNavigationProp<StackParamList>>()
    const { loading, error, data} = useStore($paymentsGetStatus)

    const fetchCategories = () => {
        fetchPaymentsFx()
    }

    useEffect(() => {
        fetchCategories()
    }, [])

    const onRefresh = () => {
        clearCache()
        fetchCategories()
    }

    const handleCloseErrorAlert = () => {
        if (!data) {
            fetchCategories()
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
                <ActivityIndicator />
            </ActivityIndicatorContainer>
        </Container>
        )
    }

    return (
    <Container>
        <ErrorAlert 
            isVisiable = { error !== null } 
            title = { error?.message ?? '' }
            onClose = { handleCloseErrorAlert }
            timeToDismiss = { 2000 }
        />
        <Header>
            <HeaderText>Платежи</HeaderText>
        </Header>
        {!error && data && 
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
              refreshing = { data && loading }
              onRefresh = { onRefresh }
              tintColor = { '#FFFFFF' }
            />
        }
        />}
    </Container>
    )
}
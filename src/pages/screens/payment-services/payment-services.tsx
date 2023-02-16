import { FlatList, FlatListProps } from "react-native"
import { TitledImageItem, Separator, Placeholder } from "@shared/ui/core"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { useEffect } from "react"
import { ServiceCategory, StackParamList } from "@shared/types/types"
import { Images } from "../../../../assets"
import { useStore } from "effector-react"
import { $filteredServices, searchServices, setServices } from './model'
import { styled } from "@shared/ui/theme"

type PaymentServicesProps = NativeStackScreenProps<StackParamList, 'paymentServices'>

const MainContainer = styled.KeyboardAvoidingView`
    flex: 1;
    background-color: ${ ({theme}) => theme.palette.background.primary };
`
const Container = styled.View`
    flex: 1;
    background-color: ${ ({theme}) => theme.palette.background.primary };
`
const TextInputContainer = styled.View`
    border-radius: 8px;
    background-color: ${ ({theme}) => theme.palette.content.secondary };
    border-color: #333;
    margin: ${ ({theme}) => theme.spacing(1.5) }px ${ ({theme}) => theme.spacing(2) }px ${ ({theme}) => theme.spacing(2) }px;
    flex-direction: row;
    padding: ${ ({theme}) => theme.spacing(1) }px ${ ({theme}) => theme.spacing(1) }px;
`
const SearchIcon = styled.Image`
    width: 24px;
    height: 24px;
    margin: 0px 0px;
`
const SearchTextInput = styled.TextInput`
    color: ${ ({theme}) => theme.palette.text.primary };
    flex-grow: ${ ({theme}) => theme.spacing(2) };
    flex: 1;
`
const ServicesFlatList = styled(FlatList as new (props: FlatListProps<ServiceCategory>) => FlatList<ServiceCategory>)`
    flex: 1;
    background-color: ${ ({theme}) => theme.palette.background.secondary };
`

export const PaymentServices = ({ route, navigation }: PaymentServicesProps) => {
    const filteredServices = useStore($filteredServices)
    const initialData = route.params.services

    useEffect(() => {
        setServices(initialData)
        navigation.setOptions({ title: route.params.title })
    }, [])

    const handleSearch = (text: string) => {
        searchServices({ text: text, initialData: initialData })
    }

    return (
    <MainContainer>
        { initialData.length > 0 &&
        <Container>
        <TextInputContainer>
            <SearchIcon source = { Images.search }/>
            <SearchTextInput
                autoCapitalize = 'none'
                autoCorrect = { false } 
                placeholder = "Поиск"
                placeholderTextColor= '#706D76'
                clearButtonMode = 'always'
                onChangeText = { (text) => handleSearch(text) }
            />
        </TextInputContainer>
        <ServicesFlatList
        data = { filteredServices }
        renderItem = { ({ item }) => (
            <TitledImageItem isSmallImage = { false } title = { item.serviceName } source = { item.serviceIcon } onClick = { () => {
                navigation.navigate('payment', {
                    service: item
                })
            }} />
        )}
        keyExtractor = { (item, index) => index.toString() }
        ItemSeparatorComponent = { Separator }
        />
        </Container>
        }
        { initialData.length == 0 &&
        <Placeholder message= 'На данный момент доступных способов оплаты нет' />
        }
    </MainContainer>
    )
}
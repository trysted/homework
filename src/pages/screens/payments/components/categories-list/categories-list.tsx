import { PaymentCategory } from "@entities/payments/models/types"
import { Flex1, Separator, TitledImageItem } from "@shared/ui/core"
import { styled } from "@shared/ui/theme"
import { ColorValue, FlatList, FlatListProps, RefreshControl, View } from "react-native"

const CategoryFlatList = styled(FlatList as new (props: FlatListProps<PaymentCategory>) => FlatList<PaymentCategory>)`
    flex: 1;
`

type CategoriesListProps = {
    data: PaymentCategory[] | null
    onPress: (category: PaymentCategory) => void
    refreshing: boolean
    onRefresh: () => void
    refreshTintColor: ColorValue
}

export const CategoriesList = ({data, onPress, refreshing, onRefresh, refreshTintColor}: CategoriesListProps) => {
    return (
        <Flex1>
            <CategoryFlatList 
            data = { data }
            renderItem = { ({ item }) => (
                <TitledImageItem isSmallImage = { true } title = { item.categoryName } source = { item.categoryIcon } onClick = { () => {
                    onPress(item)
                }}/>
            )}
            keyExtractor={item => item.categoryId }
            ItemSeparatorComponent = { Separator }
            refreshControl = {
                <RefreshControl
                refreshing = { refreshing }
                onRefresh = { onRefresh }
                tintColor = { refreshTintColor }
                />
            }
            />
        </Flex1>
    )
}
import { ComponentMeta, ComponentStory } from "@storybook/react-native";
import { CategoriesList } from "./categories-list";
import { styled } from "@shared/ui/theme";
import { Flex1 } from "@shared/ui/core";

const Wrapper = styled(Flex1)`
    background-color: ${ ({theme}) => theme.palette.background.secondary };
`;

const Meta: ComponentMeta<typeof CategoriesList> = {
    title: 'pages/screens/payments/components/categories-list',
    component: CategoriesList,
    args: {
        onPress: () => {},
        data: [
            {
                categoryId: '1',
                categoryName: 'Мобильная связь',
                categoryIcon: "https://github.com/kode-frontend/files/raw/main/1_mobile.png",
                services: []
            },
            {
                categoryId: '2',
                categoryName: 'ЖКХ',
                categoryIcon: "https://github.com/kode-frontend/files/raw/main/1_JKH.png",
                services: []
            },
            {
                categoryId: '3',
                categoryName: 'Интернет',
                categoryIcon: "https://github.com/kode-frontend/files/raw/main/1_Internet.png",
                services: []
            },
    ],
        onRefresh: () => {},
        refreshing: false,
        refreshTintColor: 'FFF'
    }
}

export default Meta;

type CategoriesListStory = ComponentStory<typeof CategoriesList>;

export const Default: CategoriesListStory = args => (
    <Wrapper>
        <CategoriesList {...args} />
    </Wrapper>
);
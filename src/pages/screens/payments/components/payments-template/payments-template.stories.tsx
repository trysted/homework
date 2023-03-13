import { ComponentMeta, ComponentStory } from "@storybook/react-native";
import { PaymentsTemplate } from "./payments-template";

const Meta: ComponentMeta<typeof PaymentsTemplate> = {
    title: 'pages/screens/payments/payments/',
    component: PaymentsTemplate,
    args: {
        header: {
            title: 'Платежи'
        },
        categories: {
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
            onPress: () => {},
            onRefresh: () => {},
            refreshing: false,
            refreshTintColor: '#FFF'
        }
    }
}

export default Meta;

type PaymentsTemplateStory = ComponentStory<typeof PaymentsTemplate>;

export const Default: PaymentsTemplateStory = args => (
    <PaymentsTemplate {...args} />
);
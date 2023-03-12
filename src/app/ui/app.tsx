import { StrictMode, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppLoading from 'expo-app-loading';
import { useFonts } from 'expo-font';

import { AppThemeProvider, styled } from '@shared/ui/theme';
import { AppNavigation } from '@pages/ui';
import { QueryClient, QueryClientProvider } from 'react-query';

import { Storybook } from '../../../.storybook';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { SafeAreaFlex1 } from '@shared/ui/core';

const StorybookButton = styled.TouchableOpacity`
  height: 32px;
  padding: ${({ theme }) => theme.spacing(1)}px;
  background-color: ${({ theme }) => theme.palette.button.primary};
`;
const StorybookButtonText = styled.Text`
  color: ${({ theme }) => theme.palette.text.primary};
  text-align: center;
`;

const queryClient = new QueryClient()

const customFonts = {
  SF_PRO_BOLD_700: require('../../../assets/fonts/SFProDisplay-Bold.ttf'),
  SF_PRO_SEMIBOLD_600: require('../../../assets/fonts/SFProDisplay-Semibold.ttf'),
  SF_PRO_MEDIUM_500: require('../../../assets/fonts/SFProDisplay-Medium.ttf'),
  SF_PRO_REGULAR_400: require('../../../assets/fonts/SFProDisplay-Regular.ttf'),
  OPEN_SANS_BOLD_700: require('../../../assets/fonts/OpenSans-Bold.ttf'),
  OPEN_SANS_SEMIBOLD_600: require('../../../assets/fonts/OpenSans-SemiBold.ttf'),
  OPEN_SANS_MEDIUM_500: require('../../../assets/fonts/OpenSans-Medium.ttf'),
  OPEN_SANS_REGULAR_400: require('../../../assets/fonts/OpenSans-Regular.ttf'),
  OPEN_SANS_ITALIC_300: require('../../../assets/fonts/OpenSans-Light.ttf'),
};

export const App = () => {
  const [isFontsLoaded] = useFonts(customFonts);
  const [isStorybookClosed, setStorybookClosed] = useState(false);

  if (!isFontsLoaded) {
    return <AppLoading />;
  }

  if (!isStorybookClosed) {
    return (
      <StrictMode>
        <AppThemeProvider>
          <SafeAreaProvider>
            <SafeAreaFlex1>
              <Storybook />
              <StorybookButton onPress={() => setStorybookClosed(true)}>
                <StorybookButtonText>OPEN APP</StorybookButtonText>
              </StorybookButton>
              </SafeAreaFlex1>
          </SafeAreaProvider>
        </AppThemeProvider>
      </StrictMode>
    );
  }

  return (
    <StrictMode>
      <AppThemeProvider>
        <QueryClientProvider client=  { queryClient }>
          <NavigationContainer>
            <AppNavigation />
          </NavigationContainer>
        </QueryClientProvider>
      </AppThemeProvider>
    </StrictMode>
  );
};

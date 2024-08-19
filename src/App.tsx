// Only import react-native-gesture-handler on native platforms
import 'react-native-gesture-handler';
import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { StackNavigator } from './presentation/navigation/StackNavigator';
import { ThemeContextProvider } from './presentation/context/ThemeContext';

const queryClient = new QueryClient();

type PokemonAppProps = {};

export const PokemonApp = ({}: PokemonAppProps): React.JSX.Element => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeContextProvider>
          <StackNavigator />
      </ThemeContextProvider>
    </QueryClientProvider>
  );
};

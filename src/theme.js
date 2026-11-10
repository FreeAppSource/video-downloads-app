import React, { createContext, useContext, useState } from 'react';

export const colors = {
  primary: '#FCDA5F',       // Snaptube iconic bright yellow
  primaryDark: '#B8951B',
  primaryLight: '#FDE79A',
  primarySoft: '#FEF5D4',
  black: '#151515',
  darkSurface: '#1E1E1E',
  darkCard: '#242424',
  gray900: '#161616',
  gray800: '#343434',
  gray700: '#5A5A5A',
  gray600: '#969696',
  gray400: '#D3D3D3',
  gray200: '#F1F1F1',
  gray100: '#F7F7F7',
  white: '#FFFFFF',
  red: '#FF3B30',
  youtubeRed: '#FF0000',
  green: '#2ECC71',
  blue: '#3498DB',
  whatsappGreen: '#25D366',
  facebookBlue: '#1877F2',
  instagramPink: '#E1306C',
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 20,
  xl: 24,
  xxl: 32,
};

export const radius = {
  sm: 6,
  md: 12,
  lg: 16,
  xl: 24,
  full: 9999,
};

export const palettes = {
  light: {
    bg: '#FAF9F7',
    surface: '#FFFFFF',
    card: '#FFFFFF',
    cardBorder: '#EFEFEF',
    text: '#151515',
    subText: '#777777',
    inputBg: '#F1F1F1',
    divider: '#EBEBEB',
    chipBg: '#F1F1F1',
    chipActiveBg: '#FCDA5F',
    chipActiveText: '#151515',
  },
  dark: {
    bg: '#121212',
    surface: '#1E1E1E',
    card: '#222222',
    cardBorder: 'rgba(255, 255, 255, 0.08)',
    text: '#FFFFFF',
    subText: '#AAAAAA',
    inputBg: '#2C2C2C',
    divider: 'rgba(255, 255, 255, 0.12)',
    chipBg: '#2A2A2A',
    chipActiveBg: '#FCDA5F',
    chipActiveText: '#151515',
  },
};

const ThemeContext = createContext({
  isDark: false,
  toggleTheme: () => {},
  theme: palettes.light,
});

export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(false);

  const toggleTheme = () => {
    setIsDark((prev) => !prev);
  };

  const theme = isDark ? palettes.dark : palettes.light;

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme, theme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);

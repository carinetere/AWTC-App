// src/utils/theme.js
export const Colors = {
  // Couleurs du dégradé principal AWTC
  primary: '#c72599',
  primaryMedium: '#972eaf', 
  primaryDark: '#6041c9',
  
  // Couleurs de base
  white: '#FFFFFF',
  black: '#000000',
  
  // Couleurs pour le texte
  textPrimary: '#333333',
  textSecondary: '#666666',
  textLight: '#FFFFFF',
  
  // Couleurs pour les backgrounds
  backgroundLight: '#F8F9FA',
  backgroundDark: '#1A1A1A',
  
  // Couleurs pour les états
  success: '#28A745',
  error: '#DC3545',
  warning: '#FFC107',
  info: '#17A2B8',
  
  // Couleurs pour les bordures
  border: '#E0E0E0',
  borderDark: '#CCCCCC',
};

export const Gradients = {
  primary: ['#c72599', '#972eaf', '#6041c9'],
  primaryReverse: ['#6041c9', '#972eaf', '#c72599'],
};

export const Fonts = {
  regular: 'System',
  medium: 'System',
  bold: 'System',
  light: 'System',
};

export const FontSizes = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 18,
  xl: 20,
  xxl: 24,
  xxxl: 32,
};

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const BorderRadius = {
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  full: 999,
};

const Theme = {
  Colors,
  Gradients,
  Fonts,
  FontSizes,
  Spacing,
  BorderRadius,
};

export default Theme;
import { Injectable } from '@angular/core';

export interface ThemeConfig {
  primaryColor: string;
  secondaryColor: string;
  backgroundColor: string;
  textColor: string;
  lightColor: string;
  darkColor: string;
}

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private defaultTheme: ThemeConfig = {
    primaryColor: '#1a3c6e',
    secondaryColor: '#e25822',
    backgroundColor: '#f5f5f5',
    textColor: '#333',
    lightColor: '#fff',
    darkColor: '#222'
  };
  
  constructor() {
    this.loadTheme(this.defaultTheme);
  }
  
  loadTheme(theme: ThemeConfig) {
    // Apply theme by setting CSS variables
    document.documentElement.style.setProperty('--primary-color', theme.primaryColor);
    document.documentElement.style.setProperty('--secondary-color', theme.secondaryColor);
    document.documentElement.style.setProperty('--background-color', theme.backgroundColor);
    document.documentElement.style.setProperty('--text-color', theme.textColor);
    document.documentElement.style.setProperty('--light-color', theme.lightColor);
    document.documentElement.style.setProperty('--dark-color', theme.darkColor);
  }
}

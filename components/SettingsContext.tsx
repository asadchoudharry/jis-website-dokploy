import React from 'react';

export interface SiteSettings {
  title: string;
  logoUrl: string;
}

export const SettingsContext = React.createContext<SiteSettings | null>(null);

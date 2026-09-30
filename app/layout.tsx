import type { Metadata } from 'next';
import './globals.css';
export const metadata:Metadata={title:'Marathon 2027 · Préparation',description:'Suivi de préparation marathon personnalisé'};
export const viewport={width:'device-width',initialScale:1,viewportFit:'cover',themeColor:'#f7f8f5'};
export default function RootLayout({children}:{children:React.ReactNode}) { return <html lang="fr"><body>{children}</body></html>; }

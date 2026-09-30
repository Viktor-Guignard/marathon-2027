import type { Metadata } from 'next';
import './globals.css';
export const metadata:Metadata={title:'Marathon 2027 · Préparation',description:'Suivi de préparation marathon personnalisé'};
export default function RootLayout({children}:{children:React.ReactNode}) { return <html lang="fr"><body>{children}</body></html>; }

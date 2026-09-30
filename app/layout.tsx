import type { Metadata } from 'next';
import './globals.css';
const base = process.env.GITHUB_PAGES === 'true' ? '/marathon-2027' : '';
export const metadata:Metadata={
  title:'Stride · Marathon 2027 · Préparation',
  description:'Ton carnet personnel de préparation marathon.',
  applicationName:'Stride',
  manifest:`${base}/manifest.webmanifest`,
  appleWebApp:{capable:true,title:'Stride',statusBarStyle:'black-translucent'},
  icons:{icon:[{url:`${base}/icons/icon-192.png`,sizes:'192x192',type:'image/png'},{url:`${base}/icons/icon-512.png`,sizes:'512x512',type:'image/png'}],apple:`${base}/apple-touch-icon.png`},
};
export const viewport={width:'device-width',initialScale:1,viewportFit:'cover',themeColor:'#f7f8f5'};
export default function RootLayout({children}:{children:React.ReactNode}) { return <html lang="fr"><head><meta name="apple-mobile-web-app-capable" content="yes"/></head><body>{children}</body></html>; }

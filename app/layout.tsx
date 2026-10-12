import type { Metadata, Viewport } from 'next';
import './globals.css';
export const metadata:Metadata={title:'FitRota · Sana özel antrenman',description:'Hedefine, seviyene ve ekipmanına göre antrenman planları. Hesap gerektirmez.',applicationName:'FitRota',appleWebApp:{capable:true,title:'FitRota',statusBarStyle:'black-translucent'}};
export const viewport:Viewport={width:'device-width',initialScale:1,themeColor:'#10120f'};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="tr"><body>{children}</body></html>}

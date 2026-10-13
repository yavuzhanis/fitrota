import type {MetadataRoute} from 'next';
const base='https://fitrota.pages.dev';
export const dynamic='force-static';
export default function sitemap():MetadataRoute.Sitemap{return ['','/gizlilik','/kullanim-sartlari','/saglik-uyarisi'].map(path=>({url:`${base}${path}`,lastModified:new Date('2026-10-13'),changeFrequency:path===''?'weekly':'yearly',priority:path===''?1:.4}));}

import {authenticated,configured} from '@/lib/auth';
import {getSite} from '@/lib/site';
import AdminApp from '@/components/AdminApp';
export const dynamic='force-dynamic';
export default async function Admin(){const logged=await authenticated();return <AdminApp initialSite={logged?getSite():null} isConfigured={configured()}/>}

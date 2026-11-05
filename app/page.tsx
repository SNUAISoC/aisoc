import {getSite} from '@/lib/site';
import {Home} from '@/components/PublicSite';
export const dynamic='force-dynamic';
export default function Page(){return <Home site={getSite()}/>}

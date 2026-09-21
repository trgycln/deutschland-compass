import { redirect } from 'next/navigation';

interface PageProps {
  searchParams: Promise<{ preview?: string }>;
}

export default async function AlmancaB2RedirectPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const qs = params?.preview ? `?preview=${params.preview}` : '';
  redirect(`/almanca/b2-sinav-hazirlik${qs}`);
}

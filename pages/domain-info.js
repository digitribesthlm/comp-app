import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import Head from 'next/head';
import DomainForm from '../components/DomainForm';

export default function DomainInfo() {
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get('token');
    if (!token) {
      router.replace('/login');
    }
  }, []);

  return (
    <div className="container mx-auto p-4">
      <Head>
        <title>Domain Information</title>
        <meta name="description" content="Submit domain information" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-4xl font-bold mb-6">Submit Domain Information</h1>
        <DomainForm />
      </main>
    </div>
  );
}

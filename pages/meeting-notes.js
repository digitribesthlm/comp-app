import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import Head from 'next/head';
import MeetingForm from '../components/MeetingForm';
import DomainForm from '../components/DomainForm';

export default function Home() {
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
        <title>Meeting Notes</title>
        <meta name="description" content="Submit meeting notes" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-4xl font-bold mb-6">Admin Interface Make</h1>
        <MeetingForm />
        <DomainForm />
      </main>
    </div>
  );
}

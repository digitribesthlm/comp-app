import Head from 'next/head';
import MeetingForm from '../components/MeetingForm';

export default function Home() {
  return (
    <div className="container mx-auto p-4">
      <Head>
        <title>Meeting Notes</title>
        <meta name="description" content="Submit meeting notes" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-4xl font-bold mb-6">Submit Meeting Notes</h1>
        <MeetingForm />
      </main>
    </div>
  );
}

import { useState } from 'react';

const DomainForm = () => {
  const [domain, setDomain] = useState('');
  const [url, setUrl] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      domain,
      url,
    };

    const queryParams = new URLSearchParams({
      Domain: domain,
      Url: url
    }).toString();
    const webhookUrl = process.env.NEXT_PUBLIC_LATENODE_WEBHOOK_URL;

    const fullUrl = `${webhookUrl}?${queryParams}`;
    console.log('Full Webhook URL:', fullUrl);

    try {
      const response = await fetch(`${webhookUrl}?${queryParams}`, {
        method: 'GET',
      });

      const responseData = await response.text();
      if (response.ok) {
        setSuccessMessage('Domain information submitted successfully!');
        setDomain('');
        setUrl('');
      } else {
        console.error('Failed to submit domain information:', responseData);
        setSuccessMessage('Failed to submit domain information.');
      }
    } catch (error) {
      console.error('Error submitting domain information:', error);
      setSuccessMessage('An error occurred while submitting domain information.');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="w-full max-w-md p-6 bg-white rounded-lg shadow-md space-y-4">
        <h2 className="text-2xl font-bold mb-4 text-center">Submit Domain Information</h2>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Domain</span>
          </label>
          <input
            type="text"
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
            className="input input-bordered w-full"
            required
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Url</span>
          </label>
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="input input-bordered w-full"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary w-full">
          Send
        </button>
        {successMessage && (
          <div className="mt-4 text-green-500 text-center">
            {successMessage}
          </div>
        )}
      </form>
    </div>
  );
};

export default DomainForm;

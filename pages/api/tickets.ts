import type { NextApiRequest, NextApiResponse } from 'next';
import { put } from '@vercel/blob';

const blobUrl =
	'https://clgltu8txlutapga.public.blob.vercel-storage.com/tickets-pyCCTdxBoXrL01AhJ87jpa1SEMqUOV.json';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method === 'GET') {
		try {
			const response = await fetch(blobUrl);
			const tickets = await response.json();
			return res.status(200).json(tickets);
		} catch (error) {
			console.error('GET error:', error);
			return res.status(500).json({ message: 'Error fetching tickets' });
		}
	}

	if (req.method === 'POST') {
		try {
			const newTicket = req.body;

			const response = await fetch(blobUrl);
			const tickets = await response.json();
			const updatedTickets = [...tickets, newTicket];

			const updatedBlob = await put(
				'tickets-pyCCTdxBoXrL01AhJ87jpa1SEMqUOV.json',
				JSON.stringify(updatedTickets, null, 2),
				{
					access: 'public',
					// only include token if needed
					token: process.env.VERCEL_BLOB_READ_WRITE_TOKEN,
				}
			);

			return res
				.status(200)
				.json({ success: true, url: updatedBlob.url });
		} catch (error) {
			console.error('POST error:', error);
			return res.status(500).json({ message: 'Error saving ticket' });
		}
	}

	return res
		.setHeader('Allow', ['GET', 'POST'])
		.status(405)
		.end(`Method ${req.method} Not Allowed`);
}

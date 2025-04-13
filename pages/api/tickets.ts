import type { NextApiRequest, NextApiResponse } from 'next';
import { put } from '@vercel/blob';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method === 'GET') {
		try {
			const blobUrl =
				'https://mirunas-projects.vercel-storage.com/tickets.json';
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
			const { url } = await fetch('tickets.json');
			const response = await fetch(url);
			const tickets = await response.json();
			const updatedTickets = [...tickets, newTicket];

			const updatedBlob = await put(
				'tickets.json',
				JSON.stringify(updatedTickets, null, 2),
				{
					access: 'public',
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

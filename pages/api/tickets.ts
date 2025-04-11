import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

const ticketsFilePath = path.join(process.cwd(), 'tickets.json');

export default function handler(req: NextApiRequest, res: NextApiResponse) {
	const tickets = JSON.parse(fs.readFileSync(ticketsFilePath, 'utf-8'));

	if (req.method === 'POST') {
		const { name, issue } = req.body;
		tickets.push({ name, issue });

		// Save the updated tickets back to the file
		fs.writeFileSync(ticketsFilePath, JSON.stringify(tickets, null, 2));

		res.status(201).json({ message: 'Ticket created' });
	} else if (req.method === 'GET') {
		res.status(200).json(tickets);
	} else {
		res.setHeader('Allow', ['GET', 'POST']);
		res.status(405).end(`Method ${req.method} Not Allowed`);
	}
}
//with memory storage
// import { NextApiRequest, NextApiResponse } from 'next';

// const tickets: { name: string; issue: string }[] = [];

// export default function handler(req: NextApiRequest, res: NextApiResponse) {
// 	if (req.method === 'POST') {
// 		const { name, issue } = req.body;
// 		tickets.push({ name, issue });
// 		res.status(201).json({ message: 'Ticket created' });
// 	} else if (req.method === 'GET') {
// 		res.status(200).json(tickets);
// 	} else {
// 		res.setHeader('Allow', ['GET', 'POST']);
// 		res.status(405).end(`Method ${req.method} Not Allowed`);
// 	}
// }
// with json storage

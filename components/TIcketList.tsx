// components/TicketList.tsx

import { useEffect, useState } from 'react';

export default function TicketList() {
	const [tickets, setTickets] = useState<{ name: string; issue: string }[]>(
		[]
	);

	useEffect(() => {
		const fetchTickets = async () => {
			try {
				const res = await fetch('/api/tickets');
				const data = await res.json();
				setTickets(data);
			} catch (err) {
				console.error('Error fetching tickets:', err);
			}
		};

		fetchTickets();
	}, []);

	return (
		<div>
			<h2>Tickets</h2>
			<ul>
				{tickets.map((t, index) => (
					<li key={index}>
						<strong>{t.name}</strong>: {t.issue}
					</li>
				))}
			</ul>
		</div>
	);
}

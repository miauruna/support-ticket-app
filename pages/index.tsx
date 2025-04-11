import { useState, useEffect } from 'react';

export default function Home() {
	const [name, setName] = useState('');
	const [issue, setIssue] = useState('');
	const [tickets, setTickets] = useState<{ name: string; issue: string }[]>(
		[]
	);

	async function fetchTickets() {
		const res = await fetch('/api/tickets');
		const data = await res.json();
		setTickets(data);
	}
	useEffect(() => {
		fetchTickets();
	}, []);

	async function handleSubmit(e: React.FormEvent) {
		e.preventDefault();
		await fetch('/api/tickets', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ name, issue }),
		});
		setName('');
		setIssue('');
		fetchTickets();
	}

	return (
		<main style={{ padding: 20 }}>
			<h1>Submit a Support Ticket</h1>
			<form onSubmit={handleSubmit} style={{ marginBottom: 20 }}>
				<input
					value={name}
					onChange={(e) => setName(e.target.value)}
					placeholder='Your name'
					required
				/>
				<input
					value={issue}
					onChange={(e) => setIssue(e.target.value)}
					placeholder='Your issue'
					required
				/>
				<button type='submit'>Submit</button>
			</form>
			<h2>Submitted Tickets</h2>
			<ul>
				{tickets.map((t, i) => (
					<li key={i}>
						<strong>{t.name}</strong>: {t.issue}
					</li>
				))}
			</ul>
		</main>
	);
}

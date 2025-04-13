// components/TicketForm.tsx

import { useState } from 'react';

export default function TicketForm() {
	const [name, setName] = useState('');
	const [issue, setIssue] = useState('');

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		const newTicket = { name, issue };

		try {
			const res = await fetch('/api/tickets', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(newTicket),
			});

			if (res.ok) {
				alert('Ticket submitted!');
				setName('');
				setIssue('');
			} else {
				alert('Something went wrong.');
			}
		} catch (err) {
			console.error('Error submitting ticket:', err);
		}
	};

	return (
		<form onSubmit={handleSubmit}>
			<h2>Submit a New Ticket</h2>
			<input
				placeholder='Your name'
				value={name}
				onChange={(e) => setName(e.target.value)}
			/>
			<textarea
				placeholder='Describe your issue'
				value={issue}
				onChange={(e) => setIssue(e.target.value)}
			/>
			<button type='submit'>Submit Ticket</button>
		</form>
	);
}

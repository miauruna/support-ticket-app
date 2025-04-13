import TicketForm from '@/components/TicketForm';
import TicketList from '@/components/TIcketList';

export default function Home() {
	return (
		<div>
			<TicketForm />
			<TicketList />
		</div>
	);
}

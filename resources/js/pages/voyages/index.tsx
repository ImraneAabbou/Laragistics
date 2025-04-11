import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, usePage, Link } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

export default function Dashboard() {
    const { voyages } = usePage().props
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <h1 className="text-2xl font-bold mb-4">Voyages List</h1>
                <Link
                    className='ms-auto'
                    href="/voyages/new"
                >
                    + Add Voyage
                </Link>
                <table className="min-w-full table-auto border-collapse border border-gray-300">
                    <thead>
                        <tr>
                            <th className="border px-4 py-2">ID</th>
                            <th className="border px-4 py-2">FROM</th>
                            <th className="border px-4 py-2">TO</th>
                            <th className="border px-4 py-2">BOAT</th>
                            <th className="border px-4 py-2">Departure Date</th>
                            <th className="border px-4 py-2">Arrival Date</th>
                            <th className="border px-4 py-2">Status</th>
                            <th className="border px-4 py-2"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {voyages.map((voyage) => (
                            <tr key={voyage.id}>
                                <td className="border px-4 py-2">
                                    <Link
                                        href={route("cargos.index", { voyage: voyage.id })}
                                        className="text-blue-600 hover:underline"
                                    >
                                        {voyage.id}
                                    </Link>
                                </td>
                                <td className="border px-4 py-2">{voyage.departure_port.name}</td>
                                <td className="border px-4 py-2">{voyage.arrival_port.name}</td>
                                <td className="border px-4 py-2">{voyage.boat.name}</td>
                                <td className="border px-4 py-2">{voyage.departure_date}</td>
                                <td className="border px-4 py-2">{voyage.arrival_date}</td>
                                <td className="border px-4 py-2">{voyage.status}</td>
                                <td className="border px-4 py-2">
                                    <Link href={route('voyages.destroy', { voyage: voyage.id })} method="delete">delete</Link>
                                    {" "}
                                    |
                                    {" "}
                                    <Link href={route('voyages.edit', { voyage: voyage.id })}>edit</Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </AppLayout>
    );
}

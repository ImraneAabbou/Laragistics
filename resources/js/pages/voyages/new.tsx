import { useForm, usePage } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import { type BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

export default function Dashboard() {
    const { boats, ports, statuses } = usePage().props;

    const { data, setData, post, processing, errors } = useForm({
        boat_id: '',
        departure_port_id: '',
        arrival_port_id: '',
        departure_date: '',
        arrival_date: '',
        status: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setData(e.target.name, e.target.value);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route("voyages.store"), {
            onSuccess: () => {
                console.log('Voyage created successfully');
            },
            onError: (error) => {
                console.error('Error creating voyage:', error);
            },
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Voyage" />
            <div className="flex flex-col gap-4 rounded-xl p-4">
                <h2 className="text-2xl font-bold mb-4">Créer un nouveau voyage</h2>

                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Boat */}
                    <div>
                        <label className="block text-sm font-semibold mb-1">Bateau</label>
                        <select
                            name="boat_id"
                            value={data.boat_id}
                            onChange={handleChange}
                            className="w-full p-2 border rounded-lg"
                            required
                        >
                            <option value="">-- Sélectionner un bateau --</option>
                            {boats.map((boat) => (
                                <option key={boat.id} value={boat.id}>
                                    {boat.name}
                                </option>
                            ))}
                        </select>
                        {errors.boat_id && <p className="text-red-500 text-sm">{errors.boat_id}</p>}
                    </div>

                    {/* Departure Port */}
                    <div>
                        <label className="block text-sm font-semibold mb-1">Port de départ</label>
                        <select
                            name="departure_port_id"
                            value={data.departure_port_id}
                            onChange={handleChange}
                            className="w-full p-2 border rounded-lg"
                            required
                        >
                            <option value="">-- Sélectionner un port --</option>
                            {ports.map((port) => (
                                <option key={port.id} value={port.id}>
                                    {port.name}
                                </option>
                            ))}
                        </select>
                        {errors.departure_port_id && (
                            <p className="text-red-500 text-sm">{errors.departure_port_id}</p>
                        )}
                    </div>

                    {/* Arrival Port */}
                    <div>
                        <label className="block text-sm font-semibold mb-1">Port d’arrivée</label>
                        <select
                            name="arrival_port_id"
                            value={data.arrival_port_id}
                            onChange={handleChange}
                            className="w-full p-2 border rounded-lg"
                            required
                        >
                            <option value="">-- Sélectionner un port --</option>
                            {ports.map((port) => (
                                <option key={port.id} value={port.id}>
                                    {port.name}
                                </option>
                            ))}
                        </select>
                        {errors.arrival_port_id && (
                            <p className="text-red-500 text-sm">{errors.arrival_port_id}</p>
                        )}
                    </div>

                    {/* Departure Date */}
                    <div>
                        <label className="block text-sm font-semibold mb-1">Date de départ</label>
                        <input
                            type="date"
                            name="departure_date"
                            value={data.departure_date}
                            onChange={handleChange}
                            className="w-full p-2 border rounded-lg"
                            required
                        />
                        {errors.departure_date && (
                            <p className="text-red-500 text-sm">{errors.departure_date}</p>
                        )}
                    </div>

                    {/* Arrival Date */}
                    <div>
                        <label className="block text-sm font-semibold mb-1">Date d’arrivée</label>
                        <input
                            type="date"
                            name="arrival_date"
                            value={data.arrival_date}
                            onChange={handleChange}
                            className="w-full p-2 border rounded-lg"
                            required
                        />
                        {errors.arrival_date && (
                            <p className="text-red-500 text-sm">{errors.arrival_date}</p>
                        )}
                    </div>

                    {/* Status */}
                    <div>
                        <label className="block text-sm font-semibold mb-1">Statut</label>
                        <select
                            name="status"
                            value={data.status}
                            onChange={handleChange}
                            className="w-full p-2 border rounded-lg"
                            required
                        >
                            <option value="">-- Sélectionner un statut --</option>
                            {statuses.map((s) => (
                                <option key={s} value={s}>
                                    {s}
                                </option>
                            ))}
                        </select>
                        {errors.status && <p className="text-red-500 text-sm">{errors.status}</p>}
                    </div>

                    {/* Submit */}
                    <div className="col-span-1 md:col-span-2">
                        <button
                            type="submit"
                            className="bg-blue-600 text-white py-2 px-6 rounded-lg mt-2"
                            disabled={processing}
                        >
                            {processing ? 'Création en cours...' : 'Créer le voyage'}
                        </button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}


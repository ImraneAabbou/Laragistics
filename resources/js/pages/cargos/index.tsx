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
    const { voyage, cargosByPortionName } = usePage().props;
    const portions = Object.keys(cargosByPortionName)

    console.log(cargosByPortionName)

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <h2 className="text-2xl font-bold mb-4">Cargos List For Voyage {voyage.id}</h2>
                <Link href={route("cargos.create", { voyage: voyage.id })} className='ms-auto'> + Add Cargos</Link>

                {/* Loop through portions */}
                {portions.map((portion) => (
                    <div key={portion} className="mb-8">
                        {/* Portion Title */}
                        <h3 className="text-xl font-semibold mb-2">{portion}</h3>

                        {/* Cargo Table for this portion */}
                        {!!cargosByPortionName[portion].length
                            ? <table className="min-w-full table-auto border-collapse border border-gray-300">
                                <thead>
                                    <tr>
                                        <th className="border px-4 py-2">Cargo ID</th>
                                        <th className="border px-4 py-2">Description</th>
                                        <th className="border px-4 py-2">Weight</th>
                                        <th className="border px-4 py-2">Owner</th>
                                        <th className="border px-4 py-2">Receiver</th>
                                        <th className="border px-4 py-2">Type</th>
                                        <th className="border px-4 py-2"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {/* Loop through cargos for each portion */}
                                    {cargosByPortionName[portion].map((cargo) => (
                                        <tr key={cargo.id}>
                                            <td className="border px-4 py-2">{cargo.id}</td>
                                            <td className="border px-4 py-2">{cargo.description}</td>
                                            <td className="border px-4 py-2">{cargo.weight}</td>
                                            <td className="border px-4 py-2">{cargo.owner}</td>
                                            <td className="border px-4 py-2">{cargo.receiver}</td>
                                            <td className="border px-4 py-2">{cargo.type}</td>
                                            <td className="border px-4 py-2">
                                                <Link
                                                    href={route("cargos.destroy", { cargo: cargo.id })}
                                                    method="delete"
                                                >
                                                    delete
                                                </Link>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            : <div className="text-2xl text-gray-500 text-center">Empty Portion</div>
                        }
                    </div>
                ))}
            </div>
        </AppLayout>
    );
}


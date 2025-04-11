import { useState } from 'react';
import { useForm, usePage } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

export default function Dashboard() {
    const { voyage, portions, cargos } = usePage().props;

    // Using Inertia's useForm for handling form submission and state
    const { data, setData, put, processing, errors } = useForm({
        cargos,
    });

    console.log(cargos)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>, index: number) => {
        const { name, value } = e.target;
        const updatedCargos = [...data.cargos];
        updatedCargos[index] = { ...updatedCargos[index], [name]: value };
        setData('cargos', updatedCargos);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(route("cargos.store", { voyage: voyage.id }), {
            onSuccess: () => {
                // Do something on successful form submission
                console.log('Cargos submitted successfully');
            },
            onError: (error) => {
                // Handle error during submission
                console.error('Error submitting cargos:', error);
            },
        });
    };

    const addCargo = () => {
        setData('cargos', [
            ...data.cargos,
            {
                weight: '',
                portion_id: '',
                description: '',
                owner: '',
                receiver: '',
                type: '',
            },
        ]);
    };

    const removeCargo = (index: number) => {
        const updatedCargos = data.cargos.filter((_, i) => i !== index);
        setData('cargos', updatedCargos);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <h2 className="text-2xl font-bold mb-4">Modify Cargos For Voyage {voyage.id}</h2>

                {/* Cargos Form */}
                <form onSubmit={handleSubmit}>
                    {data.cargos.map((cargo, index) => (
                        <div key={index} className="border p-4 mb-4 rounded-lg">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                                {/* Cargo Weight */}
                                <div className="col-span-1">
                                    <label className="block text-sm font-semibold mb-2">Weight</label>
                                    <input
                                        type="number"
                                        name="weight"
                                        value={cargo.weight}
                                        onChange={(e) => handleChange(e, index)}
                                        className="w-full p-2 border rounded-lg"
                                        required
                                    />
                                    {errors.cargos?.[index]?.weight && (
                                        <p className="text-red-500 text-sm">{errors.cargos[index].weight}</p>
                                    )}
                                </div>

                                {/* Portion ID */}
                                <div className="col-span-1">
                                    <label className="block text-sm font-semibold mb-2">Portion</label>
                                    <select
                                        name="portion_id"
                                        value={cargo.portion_id}
                                        onChange={(e) => handleChange(e, index)}
                                        className="w-full p-2 border rounded-lg"
                                        required
                                    >
                                        <option value="">Select Portion</option>
                                        {portions.map((portion) => (
                                            <option key={portion.id} value={portion.id}>
                                                {portion.name}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.cargos?.[index]?.portion_id && (
                                        <p className="text-red-500 text-sm">{errors.cargos[index].portion_id}</p>
                                    )}
                                </div>

                                {/* Cargo Description */}
                                <div className="col-span-1">
                                    <label className="block text-sm font-semibold mb-2">Description</label>
                                    <input
                                        type="text"
                                        name="description"
                                        value={cargo.description}
                                        onChange={(e) => handleChange(e, index)}
                                        className="w-full p-2 border rounded-lg"
                                        required
                                    />
                                    {errors.cargos?.[index]?.description && (
                                        <p className="text-red-500 text-sm">{errors.cargos[index].description}</p>
                                    )}
                                </div>

                                {/* Cargo Owner */}
                                <div className="col-span-1">
                                    <label className="block text-sm font-semibold mb-2">Owner</label>
                                    <input
                                        type="text"
                                        name="owner"
                                        value={cargo.owner}
                                        onChange={(e) => handleChange(e, index)}
                                        className="w-full p-2 border rounded-lg"
                                        required
                                    />
                                    {errors.cargos?.[index]?.owner && (
                                        <p className="text-red-500 text-sm">{errors.cargos[index].owner}</p>
                                    )}
                                </div>

                                {/* Cargo Receiver */}
                                <div className="col-span-1">
                                    <label className="block text-sm font-semibold mb-2">Receiver</label>
                                    <input
                                        type="text"
                                        name="receiver"
                                        value={cargo.receiver}
                                        onChange={(e) => handleChange(e, index)}
                                        className="w-full p-2 border rounded-lg"
                                        required
                                    />
                                    {errors.cargos?.[index]?.receiver && (
                                        <p className="text-red-500 text-sm">{errors.cargos[index].receiver}</p>
                                    )}
                                </div>

                                {/* Cargo Type */}
                                <div className="col-span-1">
                                    <label className="block text-sm font-semibold mb-2">Cargo Type</label>
                                    <select
                                        name="type"
                                        value={cargo.type}
                                        onChange={(e) => handleChange(e, index)}
                                        className="w-full p-2 border rounded-lg"
                                        required
                                    >
                                        <option value="">Select Type</option>
                                        <option value="perishable">Perishable</option>
                                        <option value="hazardous">Hazardous</option>
                                        <option value="fragile">Fragile</option>
                                        <option value="live">Live</option>
                                        <option value="oversized">Oversized</option>
                                        <option value="general">General</option>
                                    </select>
                                    {errors.cargos?.[index]?.type && (
                                        <p className="text-red-500 text-sm">{errors.cargos[index].type}</p>
                                    )}
                                </div>
                            </div>

                            {/* Remove Cargo Field */}
                            <button
                                type="button"
                                onClick={() => removeCargo(index)}
                                className="mt-2 text-red-600 hover:underline"
                            >
                                Remove Cargo
                            </button>
                        </div>
                    ))}

                    <button
                        type="button"
                        onClick={addCargo}
                        className="mb-4 text-blue-600 hover:underline"
                    >
                        Add Another Cargo
                    </button>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="bg-blue-600 text-white py-2 px-6 rounded-lg"
                        disabled={processing}
                    >
                        {processing ? 'Submitting...' : 'Submit'}
                    </button>
                </form>
            </div>
        </AppLayout>
    );
}


import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";

export default async function StatusPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const statusPage = await prisma.statusPage.findUnique({
      where: { slug: id }
  });

  if (!statusPage) notFound();

  let monitorIds: string[] = [];
  try {
      monitorIds = JSON.parse(statusPage.monitors);
  } catch (e) {
      console.error("Failed to parse monitor IDs", e);
  }

  const monitors = await prisma.monitor.findMany({
      where: { id: { in: monitorIds } },
      select: {
          id: true,
          name: true,
          status: true,
          url: true
      }
  });

  const allUp = monitors.length > 0 && monitors.every(m => m.status === 'UP');
  const someDown = monitors.some(m => m.status === 'DOWN');

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto space-y-8">
            <div className="text-center">
                <h1 className="text-3xl font-extrabold text-gray-900">{statusPage.name}</h1>
                {statusPage.description && (
                    <p className="mt-3 text-lg text-gray-500">{statusPage.description}</p>
                )}
            </div>

            <div className={`rounded-lg p-6 text-center ${
                allUp ? 'bg-green-50 border border-green-200' :
                someDown ? 'bg-red-50 border border-red-200' :
                'bg-yellow-50 border border-yellow-200'
            }`}>
                <h2 className={`text-2xl font-bold ${
                    allUp ? 'text-green-800' :
                    someDown ? 'text-red-800' :
                    'text-yellow-800'
                }`}>
                    {allUp ? 'All Systems Operational' :
                     someDown ? 'Some Systems Experiencing Outages' :
                     'Degraded Performance'}
                </h2>
            </div>

            <div className="bg-white shadow overflow-hidden sm:rounded-md border border-gray-200">
                <ul className="divide-y divide-gray-200">
                    {monitors.map(monitor => (
                        <li key={monitor.id} className="px-4 sm:px-6 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0">
                            <div className="w-full sm:w-auto overflow-hidden">
                                <h3 className="text-lg font-medium text-gray-900 truncate">{monitor.name}</h3>
                                <p className="text-sm text-gray-500 truncate max-w-[250px] sm:max-w-md">{monitor.url}</p>
                            </div>
                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium whitespace-nowrap self-start sm:self-auto ${
                                monitor.status === 'UP' ? 'bg-green-100 text-green-800' :
                                monitor.status === 'DOWN' ? 'bg-red-100 text-red-800' :
                                'bg-gray-100 text-gray-800'
                            }`}>
                                {monitor.status}
                            </span>
                        </li>
                    ))}
                    {monitors.length === 0 && (
                        <li className="px-6 py-4 text-center text-gray-500">No services configured for this page.</li>
                    )}
                </ul>
            </div>
        </div>
    </div>
  );
}

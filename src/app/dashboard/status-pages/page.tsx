import prisma from "@/lib/prisma";
import Link from "next/link";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function StatusPagesList() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) return null;

  const pages = await prisma.statusPage.findMany({
      where: { userId: session.user.id },
      orderBy: { createdAt: 'desc' }
  });

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Status Pages</h1>
        <Link href="/dashboard/status-pages/new" className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-700">
            Create Status Page
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
        {pages.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
                No status pages yet. Create one to share your uptime publicly.
            </div>
        ) : (
            <table className="w-full text-left">
                <thead className="bg-gray-50 border-b border-gray-100 text-sm text-gray-600">
                    <tr>
                        <th className="p-4 font-medium">Name</th>
                        <th className="p-4 font-medium">Slug / URL</th>
                        <th className="p-4 font-medium text-right">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                    {pages.map(page => (
                        <tr key={page.id} className="hover:bg-gray-50">
                            <td className="p-4 font-medium text-gray-900">{page.name}</td>
                            <td className="p-4 text-sm text-gray-500">
                                <a href={`/status/${page.slug}`} target="_blank" rel="noreferrer" className="text-indigo-600 hover:underline">
                                    /status/{page.slug}
                                </a>
                            </td>
                            <td className="p-4 text-right text-sm">
                                <a href={`/status/${page.slug}`} target="_blank" rel="noreferrer" className="text-indigo-600 hover:text-indigo-900 font-medium">
                                    View Page
                                </a>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        )}
      </div>
    </div>
  );
}

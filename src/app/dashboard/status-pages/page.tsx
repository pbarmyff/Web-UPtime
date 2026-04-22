import prisma from "@/lib/prisma";
import Link from "next/link";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table";

export default async function StatusPagesList() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) return null;

  const pages = await prisma.statusPage.findMany({
      where: { userId: session.user.id },
      orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="relative z-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-white">Status Pages</h1>
        <Button className="bg-brand-accent text-brand-background rounded-none text-sm font-medium hover:bg-brand-accent/90">
            <Link href="/dashboard/status-pages/new">
                Create Status Page
            </Link>
        </Button>
      </div>

      <div className="bg-brand-surface/80 backdrop-blur-md rounded-none border border-brand-muted/30 overflow-x-auto block w-full">
        {pages.length === 0 ? (
            <div className="p-8 text-center text-brand-muted">
                No status pages yet. Create one to share your uptime publicly.
            </div>
        ) : (
            <Table className="w-full min-w-[600px] text-left">
                <TableHeader className="bg-brand-background/50 border-b border-brand-muted/30 text-sm text-brand-muted">
                    <TableRow>
                        <TableHead className="p-4 font-medium text-brand-muted">Name</TableHead>
                        <TableHead className="p-4 font-medium text-brand-muted">Slug / URL</TableHead>
                        <TableHead className="p-4 font-medium text-right text-brand-muted">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody className="divide-y divide-gray-800">
                    {pages.map(page => (
                        <TableRow key={page.id} className="hover:bg-brand-background/50 border-gray-800 transition-colors">
                            <TableCell className="p-4 font-medium text-white">{page.name}</TableCell>
                            <TableCell className="p-4 text-sm text-brand-muted">
                                <a href={`/status/${page.slug}`} target="_blank" rel="noreferrer" className="text-brand-accent hover:underline">
                                    /status/{page.slug}
                                </a>
                            </TableCell>
                            <TableCell className="p-4 text-right text-sm">
                                <Button variant="ghost" className="text-brand-accent hover:text-white hover:bg-brand-accent/10 h-8 px-2">
                                    <a href={`/status/${page.slug}`} target="_blank" rel="noreferrer">
                                        View Page
                                    </a>
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        )}
      </div>
    </div>
  );
}

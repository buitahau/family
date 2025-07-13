import { eventFolders } from "@/lib/family-data";

export async function generateStaticParams() {
  return eventFolders.map((folder) => ({
    eventId: folder.id,
  }));
}

export default function EventFolderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
import { familyMembers } from "@/lib/family-data";

export async function generateStaticParams() {
  return familyMembers.map((member) => ({
    id: member.id,
  }));
}

export default function MemberLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
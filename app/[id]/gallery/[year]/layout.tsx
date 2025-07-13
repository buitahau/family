import { familyMembers } from "@/lib/family-data";

export async function generateStaticParams() {
  const params = [];
  
  for (const member of familyMembers) {
    // Get unique years for each member
    const years = Array.from(new Set(member.gallery.map(img => img.year)));
    
    for (const year of years) {
      params.push({
        id: member.id,
        year: year.toString(),
      });
    }
  }
  
  return params;
}

export default function YearGalleryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
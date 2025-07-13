"use client";
export const runtime = 'edge'
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import { MOCK_FAMILY_MEMBERS } from "@/services/mock-data";
import { 
  ArrowLeftIcon, 
  ImageIcon,
  PlusIcon
} from "lucide-react";

export default function MemberGalleryPage() {
  const params = useParams();
  const memberId = params.id as string;
  
  // Find member from mock data
  const member = MOCK_FAMILY_MEMBERS.find(m => m.id === memberId);

  if (!member) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Member Not Found</h1>
          <Link href="/admin/member" className="text-indigo-600 hover:text-indigo-800">
            Back to Members
          </Link>
        </div>
      </div>
    );
  }

  // Group images by year
  const imagesByYear = member.gallery.reduce((acc, image) => {
    if (!acc[image.year]) {
      acc[image.year] = [];
    }
    acc[image.year].push(image);
    return acc;
  }, {} as Record<number, typeof member.gallery>);

  const sortedYears = Object.keys(imagesByYear).map(Number).sort((a, b) => b - a);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-4">
              <Link 
                href="/admin/member"
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ArrowLeftIcon size={20} />
                <span>Back to Members</span>
              </Link>
              <div className="h-6 w-px bg-gray-300" />
              <div className="flex items-center gap-2">
                <ImageIcon size={20} className="text-indigo-600" />
                <h1 className="text-xl font-bold text-gray-900">{member.name}'s Gallery</h1>
              </div>
            </div>
            
            <button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-colors">
              <PlusIcon size={20} />
              Add Photos
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {sortedYears.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm p-12 text-center">
            <ImageIcon className="mx-auto text-gray-400 mb-4" size={64} />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No Photos Yet</h3>
            <p className="text-gray-600 mb-6">Start building {member.name}'s gallery by adding some photos.</p>
            <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg transition-colors">
              Add First Photo
            </button>
          </div>
        ) : (
          <div className="space-y-8">
            {sortedYears.map((year) => {
              const yearImages = imagesByYear[year];
              
              return (
                <motion.div
                  key={year}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-xl shadow-sm p-6"
                >
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">{year}</h2>
                    <span className="text-sm text-gray-500">
                      {yearImages.length} {yearImages.length === 1 ? 'photo' : 'photos'}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {yearImages.map((image, index) => (
                      <div key={index} className="group relative">
                        <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                          <img
                            src={image.url}
                            alt={image.caption || `Photo ${index + 1}`}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                          />
                        </div>
                        {image.caption && (
                          <p className="mt-2 text-sm text-gray-600 text-center">
                            {image.caption}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
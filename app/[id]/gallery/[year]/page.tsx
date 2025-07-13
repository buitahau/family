"use client";

import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { getFamilyMemberById } from "@/lib/family-data";
import { LazyGallery } from "@/components/lazy-gallery";
import { ArrowLeft, Calendar, Image } from "lucide-react";
import Link from "next/link";

export default function YearGalleryPage() {
  const params = useParams();
  const id = params.id as string;
  const year = parseInt(params.year as string);
  const member = getFamilyMemberById(id);

  if (!member) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Member Not Found</h1>
          <Link href="/" className="text-indigo-600 hover:text-indigo-800">
            Return to Family Page
          </Link>
        </div>
      </div>
    );
  }

  // Filter images for the specific year
  const yearImages = member.gallery.filter(image => image.year === year);

  if (yearImages.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">No Photos Found</h1>
          <p className="text-gray-600 mb-6">No photos found for {year}</p>
          <Link href={`/${id}`} className="text-indigo-600 hover:text-indigo-800">
            Return to {member.name}'s Page
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-sm border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <Link href={`/${id}`} className="flex items-center gap-2 text-indigo-600 hover:text-indigo-800 transition-colors">
            <ArrowLeft size={20} />
            <span className="font-medium">Back to {member.name}</span>
          </Link>
        </div>
      </nav>

      {/* Header */}
      <div className="pt-8 pb-12 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-8"
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="p-3 bg-indigo-100 rounded-full">
                <Calendar className="text-indigo-600" size={24} />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                {year}
              </h1>
            </div>
            <p className="text-xl text-gray-600 mb-2">
              {member.name}'s Photos from {year}
            </p>
            <div className="flex items-center justify-center gap-2 text-gray-500">
              <Image size={16} />
              <span>{yearImages.length} {yearImages.length === 1 ? 'photo' : 'photos'}</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Gallery */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="mb-16"
      >
        <div className="max-w-6xl mx-auto px-4">
          <LazyGallery images={yearImages} />
        </div>
      </motion.div>

      {/* Footer */}
      <footer className="bg-white/80 backdrop-blur-sm border-t border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="text-center">
            <Link href={`/${id}`} className="text-indigo-600 hover:text-indigo-800 font-medium">
              ← Back to {member.name}'s Profile
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
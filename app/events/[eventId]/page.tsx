"use client";

import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { getEventFolderById } from "@/lib/family-data";
import { LazyGallery } from "@/components/lazy-gallery";
import { ArrowLeft, Image, Cake, Heart, Star, Gift, Folder } from "lucide-react";
import Link from "next/link";

const getIconComponent = (iconName: string) => {
  const icons: { [key: string]: any } = {
    Cake,
    Heart,
    Star,
    Gift,
    Folder
  };
  return icons[iconName] || Folder;
};

export default function EventFolderPage() {
  const params = useParams();
  const eventId = params.eventId as string;
  const eventFolder = getEventFolderById(eventId);

  if (!eventFolder) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Event Not Found</h1>
          <Link href="/" className="text-indigo-600 hover:text-indigo-800">
            Return to Family Page
          </Link>
        </div>
      </div>
    );
  }

  if (eventFolder.images.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">No Photos Found</h1>
          <p className="text-gray-600 mb-6">No photos found for {eventFolder.name}</p>
          <Link href="/" className="text-indigo-600 hover:text-indigo-800">
            Return to Family Page
          </Link>
        </div>
      </div>
    );
  }

  const IconComponent = getIconComponent(eventFolder.icon);

  // Convert image URLs to GalleryImage format for LazyGallery component
  const galleryImages = eventFolder.images.map(url => ({
    url,
    year: eventFolder.year,
    caption: `${eventFolder.name} - ${eventFolder.year}`
  }));

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-sm border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <Link href="/" className="flex items-center gap-2 text-indigo-600 hover:text-indigo-800 transition-colors">
            <ArrowLeft size={20} />
            <span className="font-medium">Back to Family</span>
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
              <div className={`p-3 rounded-full ${eventFolder.color}`}>
                <IconComponent size={24} />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                {eventFolder.name}
              </h1>
            </div>
            
            {eventFolder.description && (
              <p className="text-xl text-gray-600 mb-4 max-w-2xl mx-auto">
                {eventFolder.description}
              </p>
            )}
            
            <div className="flex items-center justify-center gap-6 text-gray-500">
              <div className="flex items-center gap-2">
                <Image size={16} />
                <span>{eventFolder.images.length} {eventFolder.images.length === 1 ? 'photo' : 'photos'}</span>
              </div>
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
          <LazyGallery images={galleryImages} />
        </div>
      </motion.div>

      {/* Footer */}
      <footer className="bg-white/80 backdrop-blur-sm border-t border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="text-center">
            <Link href="/" className="text-indigo-600 hover:text-indigo-800 font-medium">
              ← Back to Family Homepage
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
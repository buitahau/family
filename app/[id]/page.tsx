"use client";

import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { getFamilyMemberById } from "@/lib/family-data";
import { ImageCarousel } from "@/components/image-carousel";
import { Timeline } from "@/components/timeline";
import { GalleryFolders } from "@/components/gallery-folders";
import { ArrowLeft, Heart } from "lucide-react";
import Link from "next/link";

export default function MemberPage() {
  const params = useParams();
  const id = params.id as string;
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

      {/* Hero Section */}
      <div className="pt-8 pb-12 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
              {member.name}
            </h1>
            <p className="text-xl text-indigo-600 font-medium uppercase tracking-wide">
              {member.role}
            </p>
          </motion.div>
        </div>
      </div>

      {/* Carousel Section */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="mb-16"
      >
        <ImageCarousel images={member.carouselImages} />
      </motion.div>

      {/* Timeline Section */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="mb-16"
      >
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Life Timeline</h2>
            <p className="text-gray-600">Journey through the important moments and milestones</p>
          </div>
          <Timeline events={member.timeline} />
        </div>
      </motion.div>

      {/* Gallery Section */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="mb-16"
      >
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Photo Albums</h2>
            <p className="text-gray-600">Browse photos organized by year</p>
          </div>
          <GalleryFolders images={member.gallery} memberId={member.id} />
        </div>
      </motion.div>

      {/* Footer */}
      <footer className="bg-white/80 backdrop-blur-sm border-t border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="text-center">
            <p className="text-gray-600">
              Made with <Heart className="inline text-rose-500 mx-1" size={16} /> by the Johnson Family
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
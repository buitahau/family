"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { 
  ArrowLeftIcon, 
  ImageIcon,
  UploadIcon,
  FolderIcon
} from "lucide-react";

export default function AdminGalleryPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-4">
              <Link 
                href="/admin"
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ArrowLeftIcon size={20} />
                <span>Back to Admin</span>
              </Link>
              <div className="h-6 w-px bg-gray-300" />
              <div className="flex items-center gap-2">
                <ImageIcon size={20} className="text-indigo-600" />
                <h1 className="text-xl font-bold text-gray-900">Image Gallery</h1>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-12"
        >
          <div className="max-w-md mx-auto">
            <div className="bg-white rounded-xl shadow-sm p-8">
              <ImageIcon className="mx-auto text-gray-400 mb-4" size={64} />
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Gallery Management
              </h2>
              <p className="text-gray-600 mb-6">
                Manage family photos and organize them by member and event.
              </p>
              
              <div className="space-y-3">
                <Link
                  href="/admin/members"
                  className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors"
                >
                  <FolderIcon size={20} />
                  Manage Member Photos
                </Link>
                
                <Link
                  href="/admin/events"
                  className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
                >
                  <UploadIcon size={20} />
                  Manage Event Photos
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
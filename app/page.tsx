"use client";

import { motion, easeOut } from "framer-motion";
import Link from "next/link";
import { familyMembers, getEventFoldersByYear } from "@/lib/family-data";
import { Heart, Cake, Star, Gift, Folder } from "lucide-react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const cardVariants = {
  hidden: { 
    opacity: 0, 
    y: 50,
    scale: 0.9
  },
  visible: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: easeOut
    }
  }
};

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

export default function Home() {
  const eventsByYear = getEventFoldersByYear();
  const sortedYears = Object.keys(eventsByYear).map(Number).sort((a, b) => b - a);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Hero Section */}
      <div className="pt-16 pb-8 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <div className="flex items-center justify-center gap-2 mb-4">
              <Heart className="text-rose-500" size={32} />
              <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                The Johnson Family
              </h1>
            </div>
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
              Welcome to our family story. Get to know each member of our wonderful family through their personal journeys, memories, and moments.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Family Members Grid */}
      <div className="max-w-6xl mx-auto px-4 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Meet Our Family
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Get to know each family member through their personal stories and memories
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16"
        >
          {familyMembers.map((member) => (
            <motion.div
              key={member.id}
              variants={cardVariants}
              whileHover={{ 
                y: -10, 
                scale: 1.05,
                transition: { duration: 0.3 }
              }}
              whileTap={{ scale: 0.95 }}
            >
              <Link href={`/${member.id}`}>
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 cursor-pointer">
                  <div className="aspect-square overflow-hidden">
                    <img
                      src={member.thumbnail}
                      alt={member.name}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {member.name}
                    </h3>
                    <p className="text-indigo-600 font-medium text-sm uppercase tracking-wide">
                      {member.role}
                    </p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Special Events Section */}
      <div className="max-w-6xl mx-auto px-4 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Special Events & Occasions
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Memorable family moments organized by year
          </p>
        </motion.div>

        {/* Events by Year */}
        {sortedYears.map((year) => {
          const yearEvents = eventsByYear[year];
          
          return (
            <div key={year} className="mb-12">
              {/* Year Header */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center mb-8"
              >
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{year}</h3>
                <div className="w-16 h-0.5 bg-gradient-to-r from-purple-400 to-pink-400 mx-auto"></div>
              </motion.div>

              {/* Events Grid for this year */}
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {yearEvents.map((folder) => {
                  const IconComponent = getIconComponent(folder.icon);
                  
                  return (
                    <motion.div
                      key={folder.id}
                      variants={cardVariants} 
                      whileHover={{ 
                        y: -10, 
                        scale: 1.05,
                        transition: { duration: 0.3 }
                      }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Link href={`/events/${folder.id}`}>
                        <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 cursor-pointer">
                          {/* Event Preview */}
                          <div className="aspect-square p-4 bg-gradient-to-br from-purple-50 to-pink-50">
                            <div className="h-full grid grid-cols-2 gap-2">
                              {folder.images.slice(0, 4).map((image, index) => (
                                <div
                                  key={index}
                                  className="bg-white rounded-lg overflow-hidden shadow-sm group"
                                >
                                  <img
                                    src={image}
                                    alt={`${folder.name} preview ${index + 1}`}
                                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                                  />
                                </div>
                              ))}
                              {/* Fill empty slots if less than 4 images */}
                              {Array.from({ length: Math.max(0, 4 - folder.images.length) }).map((_, index) => (
                                <div
                                  key={`empty-${index}`}
                                  className="bg-gray-100 rounded-lg flex items-center justify-center"
                                >
                                  <IconComponent className="text-gray-400" size={20} />
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Event Info */}
                          <div className="p-6">
                            <div className="flex items-center gap-3 mb-3">
                              <div className={`p-2 rounded-lg ${folder.color}`}>
                                <IconComponent size={20} />
                              </div>
                              <div>
                                <h3 className="text-xl font-bold text-gray-900">{folder.name}</h3>
                                <p className="text-sm text-gray-500">{new Date(folder.createdAt).toLocaleDateString()}</p>
                              </div>
                            </div>
                            
                            {folder.description && (
                              <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                                {folder.description}
                              </p>
                            )}
                            
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-gray-600">
                                {folder.images.length} {folder.images.length === 1 ? 'photo' : 'photos'}
                              </span>
                              <div className="text-purple-600 font-medium text-sm group-hover:text-purple-800 transition-colors">
                                View Event →
                              </div>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  );
                })}
              </motion.div>
            </div>
          );
        })}
      </div>

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
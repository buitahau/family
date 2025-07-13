"use client";

import { useState } from "react";
import { easeOut, motion } from "framer-motion";
import { GalleryImage } from "@/lib/family-data";
import { Folder, Calendar, Image, Tag, Cake, Heart, Star, Gift } from "lucide-react";
import Link from "next/link";

interface GalleryFoldersProps {
  images: GalleryImage[];
  memberId: string;
}

export function GalleryFolders({ images, memberId }: GalleryFoldersProps) {
  // Group images by year and sort by year (newest first)
  const imagesByYear = images.reduce((acc, image) => {
    if (!acc[image.year]) {
      acc[image.year] = [];
    }
    acc[image.year].push(image);
    return acc;
  }, {} as Record<number, GalleryImage[]>);


  const sortedYears = Object.keys(imagesByYear)
    .map(Number)
    .sort((a, b) => b - a); // Newest first


  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const folderVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: easeOut
      }
    }
  };

  return (
    <div>
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-2">Photos by Year</h3>
          <p className="text-gray-600">Browse photos organized chronologically</p>
        </div>
        
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {sortedYears.map((year) => {
            const yearImages = imagesByYear[year];
            const imageCount = yearImages.length;
            
            return (
              <motion.div
                key={year}
                variants={folderVariants}
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link href={`/${memberId}/gallery/${year}`}>
                  <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer overflow-hidden group">
                    {/* Folder Preview - Show first 4 images in a grid */}
                    <div className="aspect-square p-4 bg-gradient-to-br from-blue-50 to-indigo-50">
                      <div className="h-full grid grid-cols-2 gap-2">
                        {yearImages.slice(0, 4).map((image, index) => (
                          <div
                            key={index}
                            className="bg-white rounded-lg overflow-hidden shadow-sm"
                          >
                            <img
                              src={image.url}
                              alt={image.caption || `Preview ${index + 1}`}
                              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                            />
                          </div>
                        ))}
                        {/* Fill empty slots if less than 4 images */}
                        {Array.from({ length: Math.max(0, 4 - yearImages.length) }).map((_, index) => (
                          <div
                            key={`empty-${index}`}
                            className="bg-gray-100 rounded-lg flex items-center justify-center"
                          >
                            <Image className="text-gray-400" size={20} />
                          </div>
                        ))}
                      </div>
                    </div>
                    {/* Folder Info */}
                    <div className="p-6">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="p-2 bg-indigo-100 rounded-lg">
                          <Folder className="text-indigo-600" size={20} />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-gray-900">{year}</h3>
                          <div className="flex items-center gap-1 text-sm text-gray-500">
                            <Calendar size={14} />
                            <span>Year {year}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">
                          {imageCount} {imageCount === 1 ? 'photo' : 'photos'}
                        </span>
                        <div className="text-indigo-600 font-medium text-sm group-hover:text-indigo-800 transition-colors">
                          View All →
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
}
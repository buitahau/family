"use client";

import { motion, easeOut } from "framer-motion";
import { TimelineEvent } from "@/lib/family-data";
import { Calendar } from "lucide-react";

interface TimelineProps {
  events: TimelineEvent[];
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: easeOut
    }
  }
};

export function Timeline({ events }: TimelineProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="relative"
    >
      {/* Timeline Line */}
      <div className="absolute left-6 md:left-1/2 md:-translate-x-0.5 top-0 bottom-0 w-0.5 bg-gradient-to-b from-indigo-400 to-purple-400" />

      {/* Timeline Events */}
      <div className="space-y-8">
        {events.map((event, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            className={`relative flex items-center ${
              index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
            }`}
          >
            {/* Timeline Dot */}
            <div className="absolute left-6 md:left-1/2 md:-translate-x-1/2 w-3 h-3 bg-indigo-600 rounded-full border-4 border-white shadow-lg z-10" />

            {/* Event Card */}
            <div className={`flex-1 ml-16 md:ml-0 ${
              index % 2 === 0 ? 'md:pr-8' : 'md:pl-8'
            }`}>
              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
                <div className="flex items-center gap-2 mb-3">
                  <Calendar className="text-indigo-600" size={16} />
                  <span className="text-sm font-medium text-indigo-600">
                    {event.year}
                  </span>
                </div>
                <p className="text-gray-800 font-medium leading-relaxed">
                  {event.title}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
"use client";

import { motion } from "framer-motion";
import { 
  SettingsIcon,
  UserIcon,
  ShieldIcon,
  BellIcon,
  PaletteIcon,
  DatabaseIcon,
  DownloadIcon,
  UploadIcon
} from "lucide-react";

export default function AdminSettingsPage() {
  const settingSections = [
    {
      title: "General Settings",
      description: "Basic application configuration",
      icon: SettingsIcon,
      settings: [
        { name: "Site Title", value: "The Johnson Family", type: "text" },
        { name: "Site Description", value: "Welcome to our family story", type: "text" },
        { name: "Contact Email", value: "family@johnson.com", type: "email" },
      ]
    },
    {
      title: "User Management",
      description: "Admin user settings and permissions",
      icon: UserIcon,
      settings: [
        { name: "Admin Username", value: "admin", type: "text" },
        { name: "Change Password", value: "••••••••", type: "password" },
        { name: "Two-Factor Auth", value: false, type: "toggle" },
      ]
    },
    {
      title: "Security",
      description: "Security and privacy settings",
      icon: ShieldIcon,
      settings: [
        { name: "Public Gallery", value: true, type: "toggle" },
        { name: "Guest Access", value: false, type: "toggle" },
        { name: "Auto Logout", value: "30 minutes", type: "select" },
      ]
    },
    {
      title: "Notifications",
      description: "Email and system notifications",
      icon: BellIcon,
      settings: [
        { name: "Email Notifications", value: true, type: "toggle" },
        { name: "New Photo Alerts", value: true, type: "toggle" },
        { name: "Weekly Summary", value: false, type: "toggle" },
      ]
    },
    {
      title: "Appearance",
      description: "Theme and display preferences",
      icon: PaletteIcon,
      settings: [
        { name: "Theme", value: "Light", type: "select" },
        { name: "Primary Color", value: "#4F46E5", type: "color" },
        { name: "Font Size", value: "Medium", type: "select" },
      ]
    },
    {
      title: "Data Management",
      description: "Backup and data operations",
      icon: DatabaseIcon,
      settings: [
        { name: "Auto Backup", value: true, type: "toggle" },
        { name: "Backup Frequency", value: "Weekly", type: "select" },
        { name: "Storage Used", value: "2.3 GB / 10 GB", type: "info" },
      ]
    }
  ];

  return (
    <div className="flex-1 p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Settings</h1>
        <p className="text-gray-600">Manage your family site configuration and preferences.</p>
      </div>

      {/* Settings Sections */}
      <div className="space-y-8">
        {settingSections.map((section, sectionIndex) => {
          const IconComponent = section.icon;
          
          return (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: sectionIndex * 0.1 }}
              className="bg-white rounded-xl shadow-sm border border-gray-100"
            >
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-indigo-100 rounded-lg">
                    <IconComponent className="text-indigo-600" size={20} />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900">{section.title}</h2>
                    <p className="text-sm text-gray-600">{section.description}</p>
                  </div>
                </div>
              </div>
              
              <div className="p-6 space-y-4">
                {section.settings.map((setting, settingIndex) => (
                  <div key={setting.name} className="flex items-center justify-between py-2">
                    <div className="flex-1">
                      <label className="text-sm font-medium text-gray-900">{setting.name}</label>
                    </div>
                    <div className="flex-1 max-w-xs">
                      {setting.type === "text" || setting.type === "email" ? (
                        <input
                          type={setting.type}
                          defaultValue={setting.value as string}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
                        />
                      ) : setting.type === "password" ? (
                        <input
                          type="password"
                          defaultValue={setting.value as string}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
                        />
                      ) : setting.type === "toggle" ? (
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            defaultChecked={setting.value as boolean}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                        </label>
                      ) : setting.type === "select" ? (
                        <select
                          defaultValue={setting.value as string}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
                        >
                          <option value={setting.value as string}>{setting.value}</option>
                        </select>
                      ) : setting.type === "color" ? (
                        <input
                          type="color"
                          defaultValue={setting.value as string}
                          className="w-16 h-8 border border-gray-300 rounded cursor-pointer"
                        />
                      ) : setting.type === "info" ? (
                        <span className="text-sm text-gray-600">{setting.value}</span>
                      ) : null}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Action Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="mt-8 bg-white rounded-xl shadow-sm border border-gray-100 p-6"
      >
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Data Operations</h2>
        <div className="flex flex-wrap gap-4">
          <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors">
            <DownloadIcon size={16} />
            Export Data
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors">
            <UploadIcon size={16} />
            Import Data
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
            <DatabaseIcon size={16} />
            Create Backup
          </button>
        </div>
      </motion.div>

      {/* Save Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="mt-8 flex justify-end"
      >
        <button className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors">
          Save All Changes
        </button>
      </motion.div>
    </div>
  );
}
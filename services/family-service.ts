import { FamilyMember, EventFolder, GalleryImage } from '@/lib/family-data';

// Mock API service using browser storage
export class FamilyService {
  private static STORAGE_KEYS = {
    FAMILY_MEMBERS: 'family_members',
    EVENT_FOLDERS: 'event_folders',
  };

  // Family Members
  static async getFamilyMembers(): Promise<FamilyMember[]> {
    const stored = localStorage.getItem(this.STORAGE_KEYS.FAMILY_MEMBERS);
    if (stored) {
      return JSON.parse(stored);
    }
    
    // Return default data if nothing stored
    const { familyMembers } = await import('@/lib/family-data');
    return familyMembers;
  }

  static async getFamilyMemberById(id: string): Promise<FamilyMember | null> {
    const members = await this.getFamilyMembers();
    return members.find(member => member.id === id) || null;
  }

  static async createFamilyMember(memberData: Omit<FamilyMember, 'id'>): Promise<FamilyMember> {
    const members = await this.getFamilyMembers();
    const newMember: FamilyMember = {
      ...memberData,
      id: `member_${Date.now()}`,
    };
    
    const updatedMembers = [...members, newMember];
    localStorage.setItem(this.STORAGE_KEYS.FAMILY_MEMBERS, JSON.stringify(updatedMembers));
    
    return newMember;
  }

  static async updateFamilyMember(id: string, memberData: Partial<FamilyMember>): Promise<FamilyMember> {
    const members = await this.getFamilyMembers();
    const memberIndex = members.findIndex(member => member.id === id);
    
    if (memberIndex === -1) {
      throw new Error('Member not found');
    }
    
    const updatedMember = { ...members[memberIndex], ...memberData };
    members[memberIndex] = updatedMember;
    
    localStorage.setItem(this.STORAGE_KEYS.FAMILY_MEMBERS, JSON.stringify(members));
    
    return updatedMember;
  }

  static async deleteFamilyMember(id: string): Promise<void> {
    const members = await this.getFamilyMembers();
    const filteredMembers = members.filter(member => member.id !== id);
    localStorage.setItem(this.STORAGE_KEYS.FAMILY_MEMBERS, JSON.stringify(filteredMembers));
  }

  static async addGalleryImages(memberId: string, images: GalleryImage[]): Promise<FamilyMember> {
    const members = await this.getFamilyMembers();
    const memberIndex = members.findIndex(member => member.id === memberId);
    
    if (memberIndex === -1) {
      throw new Error('Member not found');
    }
    
    const updatedMember = {
      ...members[memberIndex],
      gallery: [...members[memberIndex].gallery, ...images],
    };
    
    members[memberIndex] = updatedMember;
    localStorage.setItem(this.STORAGE_KEYS.FAMILY_MEMBERS, JSON.stringify(members));
    
    return updatedMember;
  }

  // Event Folders
  static async getEventFolders(): Promise<EventFolder[]> {
    const stored = localStorage.getItem(this.STORAGE_KEYS.EVENT_FOLDERS);
    if (stored) {
      return JSON.parse(stored);
    }
    
    // Return default data if nothing stored
    const { eventFolders } = await import('@/lib/family-data');
    return eventFolders;
  }

  static async getEventFolderById(id: string): Promise<EventFolder | null> {
    const folders = await this.getEventFolders();
    return folders.find(folder => folder.id === id) || null;
  }

  static async createEventFolder(folderData: Omit<EventFolder, 'id' | 'createdAt'>): Promise<EventFolder> {
    const folders = await this.getEventFolders();
    const newFolder: EventFolder = {
      ...folderData,
      id: `event_${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    
    const updatedFolders = [...folders, newFolder];
    localStorage.setItem(this.STORAGE_KEYS.EVENT_FOLDERS, JSON.stringify(updatedFolders));
    
    return newFolder;
  }

  static async updateEventFolder(id: string, folderData: Partial<EventFolder>): Promise<EventFolder> {
    const folders = await this.getEventFolders();
    const folderIndex = folders.findIndex(folder => folder.id === id);
    
    if (folderIndex === -1) {
      throw new Error('Event folder not found');
    }
    
    const updatedFolder = { ...folders[folderIndex], ...folderData };
    folders[folderIndex] = updatedFolder;
    
    localStorage.setItem(this.STORAGE_KEYS.EVENT_FOLDERS, JSON.stringify(folders));
    
    return updatedFolder;
  }

  static async deleteEventFolder(id: string): Promise<void> {
    const folders = await this.getEventFolders();
    const filteredFolders = folders.filter(folder => folder.id !== id);
    localStorage.setItem(this.STORAGE_KEYS.EVENT_FOLDERS, JSON.stringify(filteredFolders));
  }

  static async addEventImages(eventId: string, images: string[]): Promise<EventFolder> {
    const folders = await this.getEventFolders();
    const folderIndex = folders.findIndex(folder => folder.id === eventId);
    
    if (folderIndex === -1) {
      throw new Error('Event folder not found');
    }
    
    const updatedFolder = {
      ...folders[folderIndex],
      images: [...folders[folderIndex].images, ...images],
    };
    
    folders[folderIndex] = updatedFolder;
    localStorage.setItem(this.STORAGE_KEYS.EVENT_FOLDERS, JSON.stringify(folders));
    
    return updatedFolder;
  }

  // Mock image upload
  static async uploadImages(files: File[]): Promise<string[]> {
    // Simulate upload delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Return mock URLs
    return files.map((_, index) => `/images/uploaded/mock-${Date.now()}-${index}.jpg`);
  }
}
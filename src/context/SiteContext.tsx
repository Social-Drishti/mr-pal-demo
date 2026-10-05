import React, { createContext, useContext, useState, useEffect } from 'react';
import { ServiceItem, PeopleItem, TeamMember, SiteSettings } from '../types';
import { DEFAULT_SETTINGS, DEFAULT_SERVICES, DEFAULT_PEOPLE, DEFAULT_TEAM } from '../data/defaultData';
import { migrateImageRefs } from '../data/images';

interface SiteContextType {
  settings: SiteSettings;
  services: ServiceItem[];
  people: PeopleItem[];
  team: TeamMember[];
  updateSettings: (newSettings: Partial<SiteSettings>) => void;
  updateService: (updated: ServiceItem) => void;
  addService: (newService: Omit<ServiceItem, 'id'>) => void;
  deleteService: (id: string) => void;
  updatePerson: (updated: PeopleItem) => void;
  addPerson: (newPerson: Omit<PeopleItem, 'id'>) => void;
  deletePerson: (id: string) => void;
  resetToDemoDefaults: () => void;
  openWhatsApp: (message?: string) => void;
  activeWhatsAppMsg: string | null;
  closeWhatsAppModal: () => void;
}

const SiteContext = createContext<SiteContextType | undefined>(undefined);

export const SiteProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<SiteSettings>(() => {
    try {
      const saved = localStorage.getItem('mrpal_settings');
      if (!saved) return DEFAULT_SETTINGS;
      const parsed = JSON.parse(saved);
      return migrateImageRefs({ ...DEFAULT_SETTINGS, ...parsed });
    } catch {
      return DEFAULT_SETTINGS;
    }
  });

  const [services, setServices] = useState<ServiceItem[]>(() => {
    try {
      const saved = localStorage.getItem('mrpal_services');
      return saved ? migrateImageRefs(JSON.parse(saved)) : DEFAULT_SERVICES;
    } catch {
      return DEFAULT_SERVICES;
    }
  });

  const [people, setPeople] = useState<PeopleItem[]>(() => {
    try {
      const saved = localStorage.getItem('mrpal_people');
      return saved ? migrateImageRefs(JSON.parse(saved)) : DEFAULT_PEOPLE;
    } catch {
      return DEFAULT_PEOPLE;
    }
  });

  const [team] = useState<TeamMember[]>(() => {
    try {
      const saved = localStorage.getItem('mrpal_team');
      return saved ? migrateImageRefs(JSON.parse(saved)) : DEFAULT_TEAM;
    } catch {
      return DEFAULT_TEAM;
    }
  });

  const [activeWhatsAppMsg, setActiveWhatsAppMsg] = useState<string | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem('mrpal_settings', JSON.stringify(settings));
    } catch {
      // ignore
    }
  }, [settings]);

  useEffect(() => {
    try {
      localStorage.setItem('mrpal_services', JSON.stringify(services));
    } catch {
      // ignore
    }
  }, [services]);

  useEffect(() => {
    try {
      localStorage.setItem('mrpal_people', JSON.stringify(people));
    } catch {
      // ignore
    }
  }, [people]);

  const updateSettings = (newSettings: Partial<SiteSettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  const updateService = (updated: ServiceItem) => {
    setServices(prev => prev.map(s => s.id === updated.id ? updated : s));
  };

  const addService = (newService: Omit<ServiceItem, 'id'>) => {
    const id = newService.slug || `service-${Date.now()}`;
    const fullService: ServiceItem = { ...newService, id };
    setServices(prev => [...prev, fullService]);
  };

  const deleteService = (id: string) => {
    setServices(prev => prev.filter(s => s.id !== id));
  };

  const updatePerson = (updated: PeopleItem) => {
    setPeople(prev => prev.map(p => p.id === updated.id ? updated : p));
  };

  const addPerson = (newPerson: Omit<PeopleItem, 'id'>) => {
    const id = `person-${Date.now()}`;
    const fullPerson: PeopleItem = { ...newPerson, id };
    setPeople(prev => [...prev, fullPerson]);
  };

  const deletePerson = (id: string) => {
    setPeople(prev => prev.filter(p => p.id !== id));
  };

  const resetToDemoDefaults = () => {
    setSettings(DEFAULT_SETTINGS);
    setServices(DEFAULT_SERVICES);
    setPeople(DEFAULT_PEOPLE);
    localStorage.removeItem('mrpal_settings');
    localStorage.removeItem('mrpal_services');
    localStorage.removeItem('mrpal_people');
  };

  const openWhatsApp = (message?: string) => {
    const text = message || settings.defaultWhatsAppMessage;
    setActiveWhatsAppMsg(text);
  };

  const closeWhatsAppModal = () => {
    setActiveWhatsAppMsg(null);
  };

  return (
    <SiteContext.Provider
      value={{
        settings,
        services,
        people,
        team,
        updateSettings,
        updateService,
        addService,
        deleteService,
        updatePerson,
        addPerson,
        deletePerson,
        resetToDemoDefaults,
        openWhatsApp,
        activeWhatsAppMsg,
        closeWhatsAppModal,
      }}
    >
      {children}
    </SiteContext.Provider>
  );
};

export const useSite = () => {
  const context = useContext(SiteContext);
  if (!context) {
    throw new Error('useSite must be used within a SiteProvider');
  }
  return context;
};

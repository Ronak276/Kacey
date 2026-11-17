import React, { createContext, useContext, useState } from 'react';
import { Animal, DiagnosticTest, VetProfile, AppTab } from '../types';
import { INITIAL_ANIMALS, INITIAL_TESTS, INITIAL_VET_PROFILE } from '../data/initialData';

interface AppContextType {
  activeTab: AppTab;
  setActiveTab: (tab: AppTab) => void;
  animals: Animal[];
  tests: DiagnosticTest[];
  vetProfile: VetProfile;
  selectedAnimal: Animal | null;
  setSelectedAnimal: (animal: Animal | null) => void;
  selectedTest: DiagnosticTest | null;
  setSelectedTest: (test: DiagnosticTest | null) => void;
  currentTestResult: DiagnosticTest | null;
  setCurrentTestResult: (result: DiagnosticTest | null) => void;
  addAnimal: (animal: Omit<Animal, 'id'>) => Animal;
  updateAnimal: (id: string, animal: Partial<Animal>) => void;
  deleteAnimal: (id: string) => void;
  addTestResult: (test: DiagnosticTest) => void;
  updateVetProfile: (profile: Partial<VetProfile>) => void;
  navigateToAnimalDetail: (animal: Animal) => void;
  navigateToReportDetail: (test: DiagnosticTest) => void;
  startScannerForAnimal: (animal?: Animal) => void;
  isLoggedIn: boolean;
  setIsLoggedIn: (val: boolean) => void;
  isBottomNavHidden: boolean;
  setIsBottomNavHidden: (val: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Always start NOT logged in on fresh load / refresh
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<AppTab>('home');
  const [isBottomNavHidden, setIsBottomNavHidden] = useState<boolean>(false);
  const [animals, setAnimals] = useState<Animal[]>(INITIAL_ANIMALS);
  const [tests, setTests] = useState<DiagnosticTest[]>(INITIAL_TESTS);
  const [vetProfile, setVetProfile] = useState<VetProfile>(INITIAL_VET_PROFILE);
  const [selectedAnimal, setSelectedAnimal] = useState<Animal | null>(INITIAL_ANIMALS[0]);
  const [selectedTest, setSelectedTest] = useState<DiagnosticTest | null>(INITIAL_TESTS[0]);
  const [currentTestResult, setCurrentTestResult] = useState<DiagnosticTest | null>(INITIAL_TESTS[0]);

  const addAnimal = (newAnimalData: Omit<Animal, 'id'>) => {
    const newAnimal: Animal = {
      ...newAnimalData,
      id: `anim-${Date.now()}`,
    };
    setAnimals((prev) => [newAnimal, ...prev]);
    return newAnimal;
  };

  const updateAnimal = (id: string, updated: Partial<Animal>) => {
    setAnimals((prev) =>
      prev.map((a) => (a.id === id ? { ...a, ...updated } : a))
    );
    if (selectedAnimal && selectedAnimal.id === id) {
      setSelectedAnimal((prev) => (prev ? { ...prev, ...updated } : null));
    }
  };

  const deleteAnimal = (id: string) => {
    setAnimals((prev) => prev.filter((a) => a.id !== id));
    if (selectedAnimal?.id === id) {
      setSelectedAnimal(null);
    }
  };

  const addTestResult = (newTest: DiagnosticTest) => {
    setTests((prev) => [newTest, ...prev]);
    setCurrentTestResult(newTest);
    setSelectedTest(newTest);
    setAnimals((prev) =>
      prev.map((a) =>
        a.id === newTest.animalId ? { ...a, lastTestDate: 'Today' } : a
      )
    );
  };

  const updateVetProfile = (updated: Partial<VetProfile>) => {
    setVetProfile((prev) => ({ ...prev, ...updated }));
  };

  const navigateToAnimalDetail = (animal: Animal) => {
    setSelectedAnimal(animal);
    setActiveTab('animal-detail');
  };

  const navigateToReportDetail = (test: DiagnosticTest) => {
    setSelectedTest(test);
    setActiveTab('report-detail');
  };

  const startScannerForAnimal = (animal?: Animal) => {
    if (animal) {
      setSelectedAnimal(animal);
    }
    setActiveTab('scanner');
  };

  return (
    <AppContext.Provider
      value={{
        activeTab,
        setActiveTab,
        animals,
        tests,
        vetProfile,
        selectedAnimal,
        setSelectedAnimal,
        selectedTest,
        setSelectedTest,
        currentTestResult,
        setCurrentTestResult,
        addAnimal,
        updateAnimal,
        deleteAnimal,
        addTestResult,
        updateVetProfile,
        navigateToAnimalDetail,
        navigateToReportDetail,
        startScannerForAnimal,
        isLoggedIn,
        setIsLoggedIn,
        isBottomNavHidden,
        setIsBottomNavHidden,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

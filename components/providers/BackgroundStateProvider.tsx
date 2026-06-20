"use client";

import React, { createContext, useContext, useState } from "react";

export type BackgroundDiagram =
  | "default"
  | "smart-attendance"
  | "secure-vote"
  | "neuroadaptive"
  | "student-stress"
  | "supercx";

interface BackgroundStateContextType {
  activeDiagram: BackgroundDiagram;
  setActiveDiagram: (diagram: BackgroundDiagram) => void;
  workstationMode: boolean;
  setWorkstationMode: (val: boolean) => void;
  searchFocused: boolean;
  setSearchFocused: (val: boolean) => void;
}

const BackgroundStateContext = createContext<BackgroundStateContextType | undefined>(undefined);

export function BackgroundStateProvider({ children }: { children: React.ReactNode }) {
  const [activeDiagram, setActiveDiagram] = useState<BackgroundDiagram>("default");
  const [workstationMode, setWorkstationMode] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);

  return (
    <BackgroundStateContext.Provider
      value={{
        activeDiagram,
        setActiveDiagram,
        workstationMode,
        setWorkstationMode,
        searchFocused,
        setSearchFocused,
      }}
    >
      {children}
    </BackgroundStateContext.Provider>
  );
}

export function useBackgroundState() {
  const context = useContext(BackgroundStateContext);
  if (!context) {
    // If not wrapped (e.g. in some isolated views), fallback gracefully
    return {
      activeDiagram: "default" as BackgroundDiagram,
      setActiveDiagram: () => {},
      workstationMode: false,
      setWorkstationMode: () => {},
      searchFocused: false,
      setSearchFocused: () => {},
    };
  }
  return context;
}

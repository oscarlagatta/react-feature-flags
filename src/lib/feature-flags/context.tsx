"use client"

import { createContext, useContext, useEffect, useState } from "react"
import type { FeatureFlag, FeatureFlagContextType, FeatureFlagProviderProps } from "./types"

// Replace the defaultFlags array with this import
import defaultFlagsData from "./feature-flags.json"

// Create the context
const FeatureFlagContext = createContext<FeatureFlagContextType | undefined>(undefined)

// Helper function to safely access localStorage
const safeLocalStorage = {
  getItem: (key: string): string | null => {
    try {
      if (typeof window !== "undefined") {
        return localStorage.getItem(key)
      }
    } catch (e) {
      console.error("Error accessing localStorage:", e)
    }
    return null
  },
  setItem: (key: string, value: string): boolean => {
    try {
      if (typeof window !== "undefined") {
        localStorage.setItem(key, value)
        return true
      }
    } catch (e) {
      console.error("Error setting localStorage:", e)
    }
    return false
  },
}

// Helper to get environment
const getEnvironment = () => {
  try {
    // For Vite, use import.meta.env
    if (typeof import.meta !== "undefined" && import.meta.env) {
      return import.meta.env.VITE_ENV || import.meta.env.MODE
    }
    // Fallback
    return "development"
  } catch (e) {
    console.error("Error getting environment:", e)
    return "development"
  }
}

// Update the FeatureFlagProvider component to include the addFlag function
export const FeatureFlagProvider = ({ children, initialFlags }: FeatureFlagProviderProps) => {
  // Initialize with empty array first to avoid undefined errors
  const [flags, setFlags] = useState<FeatureFlag[]>([])
  const [isManagementVisible, setIsManagementVisible] = useState(false)
  const [isInitialized, setIsInitialized] = useState(false)

  // Initialize flags from props or default data
  useEffect(() => {
    try {
      const flagsData =
          initialFlags ||
          Object.values(defaultFlagsData).map((flag) => {
            if (!["feature", "route", "component"].includes(flag.type)) {
              console.warn(`Invalid flag type: ${flag.type}`)
              return { ...flag, type: "feature" } as FeatureFlag
            }
            return { ...flag } as FeatureFlag
          })

      setFlags(flagsData)

      // Check if we're in a non-production environment
      const env = getEnvironment()
      const allowedEnvs = ["development", "test", "preview", "uat"]

      // Always enable management in development for easier testing
      setIsManagementVisible(allowedEnvs.includes(env) || env === "development")

      // Load flags from localStorage if available
      const storedFlags = safeLocalStorage.getItem("featureFlags")
      if (storedFlags) {
        try {
          setFlags(JSON.parse(storedFlags))
        } catch (e) {
          console.error("Failed to parse stored feature flags", e)
        }
      }

      setIsInitialized(true)
    } catch (error) {
      console.error("Error initializing feature flags:", error)
      // Fallback to empty array to prevent crashes
      setFlags([])
      setIsInitialized(true)
    }
  }, [initialFlags])

  // Save flags to localStorage whenever they change
  useEffect(() => {
    if (isInitialized && flags.length > 0) {
      safeLocalStorage.setItem("featureFlags", JSON.stringify(flags))
    }
  }, [flags, isInitialized])

  const isFeatureEnabled = (featureId: string) => {
    const flag = flags.find((f) => f.id === featureId)
    return flag?.enabled || false
  }

  const toggleFeature = (featureId: string) => {
    setFlags((prevFlags) =>
        prevFlags.map((flag) => (flag.id === featureId ? { ...flag, enabled: !flag.enabled } : flag)),
    )
  }

  const updateFlag = (updatedFlag: FeatureFlag) => {
    setFlags((prevFlags) => prevFlags.map((flag) => (flag.id === updatedFlag.id ? updatedFlag : flag)))
  }

  // Add new function to add a flag
  const addFlag = (newFlag: Omit<FeatureFlag, "enabled">) => {
    const flagWithEnabled: FeatureFlag = { ...newFlag, enabled: false }
    setFlags((prevFlags) => {
      // Check if flag with this ID already exists
      if (prevFlags.some((flag) => flag.id === newFlag.id)) {
        return prevFlags
      }
      return [...prevFlags, flagWithEnabled]
    })
  }

  const value = {
    flags,
    isFeatureEnabled,
    toggleFeature,
    updateFlag,
    addFlag,
    isManagementVisible,
  }

  return <FeatureFlagContext.Provider value={value}>{children}</FeatureFlagContext.Provider>
}

export const useFeatureFlags = () => {
  const context = useContext(FeatureFlagContext)
  if (context === undefined) {
    throw new Error("useFeatureFlags must be used within a FeatureFlagProvider")
  }
  return context
}


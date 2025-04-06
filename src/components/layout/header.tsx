import { FeatureFlagDialog } from "@/components/feature-flags/feature-flag-dialog"
import { useFeatureFlags } from "@/lib/feature-flags/context"
import {NavLink} from "@/components/nav-link.tsx";


export function Header() {
  const { isManagementVisible } = useFeatureFlags()

  return (
      <header className="sticky top-0 z-50 w-full border-b bg-background">
        <div className="container flex h-14 items-center">
          <nav className="flex items-center space-x-4 lg:space-x-6 mx-6">
            <NavLink to="/feature-flags/home">Home</NavLink>
            <NavLink to="/feature-flags/dashboard">Dashboard</NavLink>
            <NavLink to="/feature-flags/features">General Information</NavLink>
            {isManagementVisible && <NavLink to="/feature-flags/manage">Manage Flags</NavLink>}
            <NavLink to="/feature-flags/documentation">Documentation</NavLink>
            <NavLink to="/feature-flags/settings">Settings</NavLink>
          </nav>

          <div className="ml-auto flex items-center space-x-4">{isManagementVisible && <FeatureFlagDialog />}</div>
        </div>
      </header>
  )
}


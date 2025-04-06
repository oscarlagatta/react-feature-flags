import { FeatureFlagDialog } from "@/components/feature-flags/feature-flag-dialog"
import { useFeatureFlags } from "@/lib/feature-flags/context"
import {Link} from "react-router";

export function Header() {
  const { isManagementVisible } = useFeatureFlags()

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background">
      <div className="container flex h-14 items-center">
        <nav className="flex items-center space-x-4 lg:space-x-6 mx-6">
          <Link
              to="/feature-flags/home"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            Home
          </Link>
          <Link to="/feature-flags/dashboard" className="text-sm font-medium transition-colors hover:text-primary">
            Dashboard
          </Link>

          <Link
              to="/feature-flags/features"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            General Information
          </Link>
          {isManagementVisible && (
            <Link
                to="/feature-flags/manage"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              Manage Flags
            </Link>
          )}


          <Link
              to="/feature-flags/documentation"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            Documentation
          </Link>
          <Link
              to="/feature-flags/settings"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            Settings
          </Link>
        </nav>

        <div className="ml-auto flex items-center space-x-4">{isManagementVisible && <FeatureFlagDialog />}</div>
      </div>
    </header>
  )
}


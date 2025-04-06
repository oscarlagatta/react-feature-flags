import { FeatureFlagDialog } from "@/components/feature-flags/feature-flag-dialog"
import { useFeatureFlags } from "@/lib/feature-flags/context"
import { Mountain } from "lucide-react"
import {Link} from "react-router";

export function Header() {
  const { isManagementVisible } = useFeatureFlags()

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background">
      <div className="container flex h-14 items-center">
        <div className="flex items-center gap-2 font-semibold">
          <Mountain className="h-5 w-5" />
          <span>My Application</span>
        </div>

        <nav className="flex items-center space-x-4 lg:space-x-6 mx-6">
          <Link to="/" className="text-sm font-medium transition-colors hover:text-primary">
            Dashboard
          </Link>
          <Link
              to="/features"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            Features
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
              to="/settings"
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


import {BrowserRouter, Navigate, Route, Routes} from "react-router";
import FeatureFlagLayout from "@/feature-flags/layout/feature-flag-layout.tsx";
import {FeatureFlag, FeatureFlagProvider} from "@/lib/feature-flags";
import DashboardPage from "@/feature-flags/pages/dashboard/dashboard-page.tsx";
import HomePage from "@/feature-flags/home/home-page.tsx";
import DocumentationPage from "@/feature-flags/pages/feature-flags/documentation/documentation-page.tsx";
import ManageFeatureFlagsPage from "@/feature-flags/pages/feature-flags/manage/manage-page.tsx";
import {FeatureFlagsDocsPage} from "@/feature-flags/pages/features/features-page.tsx";
import SettingsPage from "@/feature-flags/pages/settings/settings-page.tsx";

const initialFlags: FeatureFlag[] = [
    {
        id: "advanced-analytics",
        name: "Advanced Analytics",
        description: "Enable advanced analytics visualizations",
        type: "feature",
        enabled: false,
    },
    {
        id: "component-data-grid",
        name: "Enhanced Data Grid",
        description: "Use the enhanced data grid component",
        type: "component",
        enabled: false,
    },
    {
        id: "premium-features",
        name: "Premium Features",
        description: "Enable premium features",
        type: "feature",
        category: "premium",
        enabled: false,
    },
    {
        id: "experimental-ui",
        name: "Experimental UI",
        description: "Enable experimental UI components",
        type: "feature",
        category: "experimental",
        enabled: false,
    },
    {
        id: "route-settings",
        name: "Settings Page",
        description: "Allow access to the settings page",
        type: "route",
        enabled: true,
    },
]

export const AppRouter = () => {
    return (
        <FeatureFlagProvider initialFlags={initialFlags}>
            <BrowserRouter>
                <Routes>
                    <Route path='/feature-flags' element={<FeatureFlagLayout/>}>

                        <Route index element={<HomePage />} />
                        <Route path='dashboard' element={<DashboardPage />}/>
                        <Route path='documentation' element={<DocumentationPage />}/>
                        <Route path='manage' element={<ManageFeatureFlagsPage />}/>
                        <Route path='features' element={<FeatureFlagsDocsPage />}/>
                        <Route path='settings' element={<SettingsPage />}/>
                    </Route>

                    <Route path="/" element={<Navigate to="/feature-flags"/>}/>
                    <Route path="*" element={<Navigate to="/feature-flags"/>}/>
                </Routes>
            </BrowserRouter>
        </FeatureFlagProvider>
    )
}
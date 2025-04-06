import {Outlet} from "react-router";
import {Header} from "@/components/layout/header.tsx";

export default function FeatureFlagLayout() {
    return (
        <div className="container mx-auto flex flex-col items-center justify-center bg-muted p-6 md:p-10">
            <Header />
            <Outlet />
        </div>

    )
}
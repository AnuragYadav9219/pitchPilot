import { RouterProvider } from "react-router-dom";
import { router } from "./app/routes";
import { AppToaster } from "./components/ui/AppToaster";

function App() {
    return (
        <>
            <RouterProvider router={router} />
            <AppToaster />
        </>
    );
}

export default App;
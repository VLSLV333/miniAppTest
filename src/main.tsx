import {StrictMode, useEffect} from "react";
import {createRoot} from "react-dom/client";
import { ChakraProvider,defaultSystem, Box } from "@chakra-ui/react";
import App from "./App.tsx";
import './index.css';
import { init, miniApp, viewport, useSignal, themeParams} from "@telegram-apps/sdk-react";

init();

function Boot() {
    const insetTop = useSignal(viewport.contentSafeAreaInsetTop);
    const insetBottom = useSignal(viewport.contentSafeAreaInsetBottom);

    useEffect(() => {
        try{
            if (miniApp.ready.isAvailable()) miniApp.ready();

            if (viewport.expand.isAvailable()) viewport.expand();
            if (miniApp.mountSync.isAvailable()) miniApp.mountSync();

            (async () => {
                if (viewport.mount.isAvailable()) {
                    try { await viewport.mount(); } catch (error) {console.error(error);}
                }
            })();

            if (miniApp.bindCssVars.isAvailable()) miniApp.bindCssVars();
            if (themeParams.bindCssVars.isAvailable()) themeParams.bindCssVars()
            if (viewport.bindCssVars.isAvailable()) viewport.bindCssVars();

        } catch (error) {
            console.error('TMA init failed:', error);
        }
    }, [])

    return (
        <ChakraProvider value={defaultSystem}>
            <Box
              id="app-root"
              h="var(--tg-viewport-stable-height, 100dvh)"
              overflowY="auto"
              backgroundImage="linear-gradient(to left, rgb(43, 18, 74), rgb(18, 11, 36))"
              color="white"
              pb={`${insetBottom ?? 0}px`}
              pt={`${insetTop ?? 0}px`}
            >
                <App/>
            </Box>
        </ChakraProvider>
    )
}

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <Boot/>
    </StrictMode>
)

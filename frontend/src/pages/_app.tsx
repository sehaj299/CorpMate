// import '@/styles/globals.css'
import { EmotionCache } from "@emotion/cache";
import type { AppProps } from "next/app";
import { NextPage } from "next";
import WindowWrapper from "src/@core/components/window-wrapper";
import ThemeComponent from "src/@core/theme/ThemeComponent";
import { createEmotionCache } from "src/@core/utils/create-emotion-cache";
import UserLayout from "src/layout/UserLayout";
import {
  SettingsConsumer,
  SettingsProvider,
} from "src/@core/context/settingsContext";
import "../assets/styles.scss";
import "src/styles/globals.css";
import { Provider } from "react-redux";
import { store } from "src/store";
type ExtendedAppProps = AppProps & {
  Component: NextPage;
  emotionCache: EmotionCache;
};
const clientSideEmotionCache = createEmotionCache();
export default function App(props: ExtendedAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  const contentHeightFixed = Component.contentHeightFixed ?? false;
  const getLayout =
    Component.getLayout ??
    ((page: any) => (
      <UserLayout contentHeightFixed={contentHeightFixed}>{page}</UserLayout>
    ));

  const setConfig = Component.setConfig ?? undefined;
  return (
    <Provider store={store}>
      <SettingsProvider {...(setConfig ? { pageSettings: setConfig() } : {})}>
        <SettingsConsumer>
          {({ settings }) => {
            return (
              <ThemeComponent settings={settings}>
                <WindowWrapper>
                  {getLayout(<Component {...pageProps} />)}
                </WindowWrapper>
              </ThemeComponent>
            );
          }}
        </SettingsConsumer>
      </SettingsProvider>
    </Provider>
  );
}

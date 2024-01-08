import deepmerge from 'deepmerge';
import {FC, ReactNode, useContext, createContext} from 'react';

import {ConfigProvider, type ThemeConfig} from 'antd';
import zhCN from 'antd/locale/zh_CN';
import enUS from 'antd/locale/en_US';

import AntdTheme from '@/constant/antd/theme';

import MessageProvider from '@/message';

const antdLocaleMap: any = {
    'zh-CN': zhCN,
    'en-US': enUS
};
export  type LocalType = 'zh-CN' | 'en-US';
export interface ContextProps {
    locale: LocalType;
    theme?: ThemeConfig;
    $t?: (props: string) => string;
    children?: React.ReactNode;
}

const Context = createContext<ContextProps>({
    locale: 'zh-CN',
    theme: {}
});

export const CommonProvider: FC<{children: ReactNode}> = ({children}) => {
    const {theme, locale} = useContext(Context);
    const mergedTheme = deepmerge(AntdTheme, theme || {});
    return (
        <MessageProvider>
            <ConfigProvider theme={mergedTheme} locale={antdLocaleMap[locale]}>
                {children}
            </ConfigProvider>
        </MessageProvider>
    );
};

const LibProvider: FC<ContextProps> = (props) => {
    return (
        <Context.Provider value={props}>
            <CommonProvider>{props.children}</CommonProvider>
        </Context.Provider>
    );
};
export default LibProvider;

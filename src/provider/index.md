# provider

-   封装的 antd ConfigProvider 组件，用于全局配置 antd 组件的国际化、主题等。包含基础的组件主题配置，以及一些常用的组件配置,可覆盖.
-   同时也把 MessageProvider 也包括进去了,一般用于打卡页的信息提示

## Usage

```tsx
import {LibProvider} from 'lib-demo';

<ReactQueryProvider>
    <LibProvider locale={locale}>
        <InterceptorInit>
            <KeepAliveProvider>{children}</KeepAliveProvider>
        </InterceptorInit>
    </LibProvider>
</ReactQueryProvider>;
```

## props

| Name   | Type                        | Default   | Description                                                   |
| ------ | --------------------------- | --------- | ------------------------------------------------------------- |
| locale | `LocalType`                 | zh-CN     | ConfigProvider 的国际化配置,目前只配置了'zh-CN','en-US'两种   |
| theme  | `ThemeConfig`               | {}        | ConfigProvider 的主题配置,以当前 wp 的为基础,会进行 deepmerge |
| $t     | `(props: string) => string` | undefined | 用于组件内部的国际化函数,TODO:                                |

import type { ThemeConfig } from "antd";

import Token from "./theme-token";
import Cascader from "./theme-cascader";
import Date from "./theme-date";
import Select from "./theme-select";
import Table from "./theme-table";
import Popover from "./theme-popover";
import Input from "./theme-input";
import Modal from "./theme-modal";

const Theme: ThemeConfig = {
    token: Token,
    components: {
        Cascader,
        DatePicker: Date,
        Select,
        Table,
        Popover,
        Input,
        Modal,
        InputNumber: Input
    },
};

export default Theme;

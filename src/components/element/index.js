import Vue from 'vue'

import {
  Button,
  Card,
  Tabs,
  TabPane,
  Form,
  FormItem,
  Input,
  Checkbox,
  Link,
  Message,
  Container,
  Header,
  Aside,
  Main,
  Menu,
  Submenu,
  MenuItem,
  MenuItemGroup,
  Breadcrumb,
  BreadcrumbItem,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Row,
  Col,
  tag,
  Select,
  Option,
  DatePicker,
  Cascader,
  Icon,
  Radio,
  RadioGroup,
  Table,
  TableColumn,
  Pagination,
  Dialog,
  Switch,
  Popover
} from 'element-ui'

const coms = [
  Button,
  Card,
  Tabs,
  TabPane,
  Form,
  FormItem,
  Input,
  Checkbox,
  Link,
  Message,
  Container,
  Header,
  Aside,
  Main,
  Menu,
  Submenu,
  MenuItem,
  MenuItemGroup,
  Breadcrumb,
  BreadcrumbItem,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Row,
  Col,
  tag,
  Select,
  Option,
  DatePicker,
  Cascader,
  Icon,
  Radio,
  RadioGroup,
  Table,
  TableColumn,
  Pagination,
  Dialog,
  Switch,
  Popover
]

Vue.prototype.$message = Message

export default {
  install(Vue) {
    coms.map((c) => {
      Vue.component(c.name, c)
    })
  }
}

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
  Message
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
  Message
]

Vue.prototype.$message = Message

export default {
  install(Vue) {
    coms.map((c) => {
      Vue.component(c.name, c)
    })
  }
}

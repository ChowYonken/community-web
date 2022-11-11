import {
  Button,
  Card,
  Tabs,
  TabPane,
  Form,
  FormItem,
  Input,
  Checkbox,
  Link
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
  Link
]

export default {
  install(Vue) {
    coms.map((c) => {
      Vue.component(c.name, c)
    })
  }
}

import DefaultTheme from 'vitepress/theme'
import HomePage from './components/HomePage.vue'
import Layout from './components/Layout.vue'
import './custom.css'

export default {
  extends: DefaultTheme,
  Layout,
  enhanceApp({ app }) {
    app.component('HomePage', HomePage)
  },
}
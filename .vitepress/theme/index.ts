import DefaultTheme from 'vitepress/theme'
import HomePage from './components/HomePage.vue'
import NotFound from './components/NotFound.vue'
import './custom.css'

export default {
  extends: DefaultTheme,
  Layout: NotFound,
  enhanceApp({ app }) {
    app.component('HomePage', HomePage)
  },
}
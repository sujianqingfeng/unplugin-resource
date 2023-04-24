declare module 'virtual:resource/*' {
  import type { FunctionalComponent, ImgHTMLAttributes } from 'vue'
  const component: FunctionalComponent<ImgHTMLAttributes>
  export default component
}

declare module '~resource/*' {
  import type { FunctionalComponent, ImgHTMLAttributes} from 'vue'
  const component: FunctionalComponent<ImgHTMLAttributes>
  export default component
}

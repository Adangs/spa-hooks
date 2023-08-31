# spa-hooks
封装了一些常用的hooks，使用原生语法，不会被框架局限；

`onReady`

`onResize`

`onShow`

`onHide`

`onPageScroll`

`onReachBottom`

持续优化与完善中...

### 引用
```shell
npm i spa-hooks -D
or
yarn add spa-hooks -D
```

### 使用
```js
import { onReady, onResize, onShow, onHide, onPageScroll, onReachBottom } from 'spa-hooks'

onReady(() => {
  console.log('onReady')
})

onResize((e) => {
  console.log('onResize', e)
  // {width: 1920, height: 1228}
})

onShow(() => {
  console.log('onShow')
})


onHide(() => {
  console.log('onHide')
})

onPageScroll((e) => {
  console.log(e)
  // { scrollTop: 88 }
})

onReachBottom(() => {
  console.log(4)
})
```




/**
 * onShow hook
 * @param {function} hook
 * */
export function onShow (hook) {
  if (Object.prototype.toString.call(hook) === '[object Function]') {
    // 第一次onShow
    if (document.visibilityState === 'visible') {
      hook()
    }
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'visible') {
        hook()
      }
    })
  } else {
    return console.warn('onShow->', Object.prototype.toString.call(hook))
  }
}

/**
 * onHide hook
 * @param {function} hook
 * */
export function onHide (hook) {
  if (Object.prototype.toString.call(hook) === '[object Function]') {
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'hidden') {
        hook()
      }
    })
  } else {
    return console.warn('onHide->', Object.prototype.toString.call(hook))
  }
}

/**
 * 页面滚动 hook
 * @param {function} hook
 * */
export function onPageScroll (hook) {
  if (Object.prototype.toString.call(hook) === '[object Function]') {
    window.addEventListener('scroll', () => {
      const scrollTop = window.scrollY || window.pageYOffset
      hook({
        scrollTop
      })
    })
  } else {
    return console.warn('onPageScroll->', Object.prototype.toString.call(hook))
  }
}

/**
 * 页面初次渲染完成时触发 hook
 * @param {function} hook
 * */
export function onReady (hook) {
  if (Object.prototype.toString.call(hook) === '[object Function]') {
    window.addEventListener('load', hook)
  } else {
    return console.warn('onReady->', Object.prototype.toString.call(hook))
  }
}

/**
 * 页面尺寸改变时触发 hook
 * @param {function} hook
 * */
export function onResize (hook) {
  if (Object.prototype.toString.call(hook) === '[object Function]') {
    window.addEventListener('resize', () => {
      const windowWidth = Math.max(
        window.innerWidth,
        document.documentElement.clientWidth
      )
      const windowHeight = Math.max(
        window.innerHeight,
        document.documentElement.clientHeight
      )
      // 返回当前窗口宽、高
      hook({
        width: windowWidth,
        height: windowHeight
      })
    })
  } else {
    return console.warn('onResize->', Object.prototype.toString.call(hook))
  }
}

/**
 * 页面滚动到底 hook
 * @param {function} hook
 * */
export function onReachBottom (hook) {
  if (Object.prototype.toString.call(hook) === '[object Function]') {
    const windowHeight = Math.max(
      window.innerHeight,
      document.documentElement.clientHeight
    )
    let oldScrollTop = 0
    let isHook = false
    onPageScroll(({ scrollTop }) => {
      const pageHeight = document.body.scrollHeight
      // 必须是往底部滚动时才触发，确保滚动到底部时只执行一次
      if (!isHook && scrollTop > oldScrollTop && scrollTop + windowHeight >= pageHeight) {
        isHook = true
        hook()
      }
      // 向上滚动的时候重置isHook状态
      if (isHook && scrollTop < oldScrollTop) {
        isHook = false
      }
      oldScrollTop = scrollTop
    })
  } else {
    return console.warn('onReachBottom->', Object.prototype.toString.call(hook))
  }
}

/**
 * 设置滚动条位置
 * @param {object} options
 * @param {number} options.scrollTop
 * @param {number} options.duration
 * **/
export function pageScrollTo(options = {}) {
  const opts = Object.assign({
    scrollTop: 0,
    duration: 300
  }, options)

  const startPosition = window.scrollY || window.pageYOffset;
  const startTime = performance.now();

  function scrollStep(timestamp) {
    const currentTime = timestamp || performance.now();
    const progress = Math.min((currentTime - startTime) / opts.duration, 1);
    const newPosition = startPosition + (opts.scrollTop - startPosition) * progress;

    window.scrollTo(0, newPosition);

    if (progress < 1) {
      window.requestAnimationFrame(scrollStep);
    }
  }

  window.requestAnimationFrame(scrollStep);
}

<template>
  <div
    class="resize-observer"
    tabindex="-1"
  />
</template>

<script>
// attribution: https://github.com/Akryum/vue-resize
export function getInternetExplorerVersion () {
  const ua = window.navigator.userAgent

  const msie = ua.indexOf('MSIE ')
  if (msie > 0) {
    // IE 10 or older => return version number
    return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10)
  }

  const trident = ua.indexOf('Trident/')
  if (trident > 0) {
    // IE 11 => return version number
    const rv = ua.indexOf('rv:')
    return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10)
  }

  const edge = ua.indexOf('Edge/')
  if (edge > 0) {
    // Edge (IE 12+) => return version number
    return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10)
  }

  // other browser
  return -1
}

let isIE

function initCompat () {
  if (!initCompat.init) {
    initCompat.init = true
    isIE = getInternetExplorerVersion() !== -1
  }
}

export default {
  name: 'ResizeObserver',

  props: {
    emitOnMount: {
      type: Boolean,
      default: false,
    },

    ignoreWidth: {
      type: Boolean,
      default: false,
    },

    ignoreHeight: {
      type: Boolean,
      default: false,
    },
  },

  mounted () {
    initCompat()
    this.$nextTick(() => {
      this._w = this.$el.offsetWidth
      this._h = this.$el.offsetHeight
      if (this.emitOnMount) {
        this.emitSize()
      }
    })
    const object = document.createElement('object')
    this._resizeObject = object
    object.setAttribute('aria-hidden', 'true')
    object.setAttribute('tabindex', -1)
    object.onload = this.addResizeHandlers
    object.type = 'text/html'
    if (isIE) {
      this.$el.appendChild(object)
    }
    object.data = 'about:blank'
    if (!isIE) {
      this.$el.appendChild(object)
    }
  },

  beforeDestroy () {
    this.removeResizeHandlers()
  },

  methods: {
    compareAndNotify () {
      if ((!this.ignoreWidth && this._w !== this.$el.offsetWidth) || (!this.ignoreHeight && this._h !== this.$el.offsetHeight)) {
        this._w = this.$el.offsetWidth
        this._h = this.$el.offsetHeight
        this.emitSize()
      }
    },

    emitSize () {
      this.$emit('notify', {
        width: this._w,
        height: this._h,
      })
    },

    addResizeHandlers () {
      this._resizeObject.contentDocument.defaultView.addEventListener('resize', this.compareAndNotify)
      this.compareAndNotify()
    },

    removeResizeHandlers () {
      if (this._resizeObject && this._resizeObject.onload) {
        if (!isIE && this._resizeObject.contentDocument) {
          this._resizeObject.contentDocument.defaultView.removeEventListener('resize', this.compareAndNotify)
        }
        this.$el.removeChild(this._resizeObject)
        this._resizeObject.onload = null
        this._resizeObject = null
      }
    },
  },
}
</script>

<style scoped>
.resize-observer {
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
  width: 100%;
  height: 100%;
  border: none;
  background-color: transparent;
  pointer-events: none;
  display: block;
  overflow: hidden;
  opacity: 0;
}

.resize-observer >>> object {
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  overflow: hidden;
  pointer-events: none;
  z-index: -1;
}
</style>
import {
  TransitionProps,
  addTransitionClass,
  removeTransitionClass,
  ElementWithTransition,
  getTransitionInfo,
  resolveTransitionProps,
  TransitionPropsValidators
} from './Transition'
import {
  Fragment,
  VNode,
  warn,
  resolveTransitionHooks,
  toRaw,
  useTransitionState,
  getCurrentInstance,
  setTransitionHooks,
  createVNode,
  onUpdated,
  SetupContext
} from '@vue/runtime-core'

interface Position {
  top: number
  left: number
}

const positionMap = new WeakMap<VNode, Position>()
const newPositionMap = new WeakMap<VNode, Position>()

export type TransitionGroupProps = Omit<TransitionProps, 'mode'> & {
  tag?: string
  moveClass?: string
}

const TransitionGroupImpl = {
  setup(props: TransitionGroupProps, { slots }: SetupContext) {
    const instance = getCurrentInstance()!
    const state = useTransitionState()
    let prevChildren: VNode[]
    let children: VNode[]
    let hasMove: boolean | null = null

    onUpdated(() => {
      // children is guaranteed to exist after initial render
      if (!prevChildren.length) {
        return
      }
      const moveClass = props.moveClass || `${props.name || 'v'}-move`
      // Check if move transition is needed. This check is cached per-instance.
      hasMove =
        hasMove === null
          ? (hasMove = hasCSSTransform(
              prevChildren[0].el,
              instance.vnode.el,
              moveClass
            ))
          : hasMove
      if (!hasMove) {
        return
      }

      // we divide the work into three loops to avoid mixing DOM reads and writes
      // in each iteration - which helps prevent layout thrashing.
      prevChildren.forEach(callPendingCbs)
      prevChildren.forEach(recordPosition)
      const movedChildren = prevChildren.filter(applyTranslation)

      // force reflow to put everything in position
      forceReflow()

      movedChildren.forEach(c => {
        const el = c.el
        const style = el.style
        addTransitionClass(el, moveClass)
        style.transform = style.WebkitTransform = style.transitionDuration = ''
        const cb = (el._moveCb = (e: TransitionEvent) => {
          if (e && e.target !== el) {
            return
          }
          if (!e || /transform$/.test(e.propertyName)) {
            el.removeEventListener('transitionend', cb)
            el._moveCb = null
            removeTransitionClass(el, moveClass)
          }
        })
        el.addEventListener('transitionend', cb)
      })
    })

    return () => {
      const rawProps = toRaw(props)
      const cssTransitionProps = resolveTransitionProps(rawProps)
      const tag = rawProps.tag || Fragment
      prevChildren = children
      children = slots.default ? slots.default() : []

      // handle fragment children case, e.g. v-for
      if (children.length === 1 && children[0].type === Fragment) {
        children = children[0].children as VNode[]
      }

      for (let i = 0; i < children.length; i++) {
        const child = children[i]
        if (child.key != null) {
          setTransitionHooks(
            child,
            resolveTransitionHooks(child, cssTransitionProps, state, instance)
          )
        } else if (__DEV__) {
          warn(`<TransitionGroup> children must be keyed.`)
        }
      }

      if (prevChildren) {
        for (let i = 0; i < prevChildren.length; i++) {
          const child = prevChildren[i]
          setTransitionHooks(
            child,
            resolveTransitionHooks(child, cssTransitionProps, state, instance)
          )
          positionMap.set(child, child.el.getBoundingClientRect())
        }
      }

      return createVNode(tag, null, children)
    }
  }
}

export const TransitionGroup = (TransitionGroupImpl as unknown) as {
  new (): {
    $props: TransitionGroupProps
  }
}

if (__DEV__) {
  const props = ((TransitionGroup as any).props = {
    ...TransitionPropsValidators,
    tag: String,
    moveClass: String
  })
  delete props.mode
}

function callPendingCbs(c: VNode) {
  if (c.el._moveCb) {
    c.el._moveCb()
  }
  if (c.el._enterCb) {
    c.el._enterCb()
  }
}

function recordPosition(c: VNode) {
  newPositionMap.set(c, c.el.getBoundingClientRect())
}

function applyTranslation(c: VNode): VNode | undefined {
  const oldPos = positionMap.get(c)!
  const newPos = newPositionMap.get(c)!
  const dx = oldPos.left - newPos.left
  const dy = oldPos.top - newPos.top
  if (dx || dy) {
    const s = c.el.style
    s.transform = s.WebkitTransform = `translate(${dx}px,${dy}px)`
    s.transitionDuration = '0s'
    return c
  }
}

// this is put in a dedicated function to avoid the line from being treeshaken
function forceReflow() {
  return document.body.offsetHeight
}

function hasCSSTransform(
  el: ElementWithTransition,
  root: Node,
  moveClass: string
): boolean {
  // Detect whether an element with the move class applied has
  // CSS transitions. Since the element may be inside an entering
  // transition at this very moment, we make a clone of it and remove
  // all other transition classes applied to ensure only the move class
  // is applied.
  const clone = el.cloneNode() as HTMLElement
  if (el._vtc) {
    el._vtc.forEach(cls => clone.classList.remove(cls))
  }
  clone.classList.add(moveClass)
  clone.style.display = 'none'
  const container = (root.nodeType === 1
    ? root
    : root.parentNode) as HTMLElement
  container.appendChild(clone)
  const { hasTransform } = getTransitionInfo(clone)
  container.removeChild(clone)
  return hasTransform
}

import { Block } from '../block'
import { evaluate } from '../eval'
import { checkAttr } from '../utils'
import { Context } from '../context'

interface Branch {
  exp?: string | null
  el: Element
}

export const _if = (el: Element, exp: string, ctx: Context) => {
  if (import.meta.env.DEV && !exp.trim()) {
    console.warn(`v-if expression cannot be empty.`)
  }

  const parent = (el.parentElement ? el.parentElement : el.parentNode) as Element
  const anchor = new Comment('v-if')
  parent && parent.insertBefore(anchor, el)

  const branches: Branch[] = [
    {
      exp,
      el
    }
  ]

  // locate else branch
  let elseEl: Element | null
  let elseExp: string | null
  while ((elseEl = el.nextElementSibling)) {
    elseExp = null
    if (
      checkAttr(elseEl, 'v-else') === '' ||
      (elseExp = checkAttr(elseEl, 'v-else-if'))
    )
    {
      parent && parent.removeChild(elseEl)
      branches.push({ exp: elseExp, el: elseEl })
    } else {
      break
    }
  }

  const nextNode = el.nextSibling
  parent && parent.removeChild(el)

  let block: Block | undefined
  let activeBranchIndex: number = -1

  const removeActiveBlock = () => {
    if (block) {
      parent && parent.insertBefore(anchor, block.el)
      block.remove()
      block = undefined
    }
  }

  ctx.effect(() => {
    for (let i = 0; i < branches.length; i++) {
      const { exp, el } = branches[i]
      if (!exp || evaluate(ctx.scope, exp)) {
        if (i !== activeBranchIndex) {
          removeActiveBlock()
          block = new Block(el, ctx)
          block.insert(parent, anchor)
          parent && parent.removeChild(anchor)
          activeBranchIndex = i
        }
        return
      }
    }
    // no matched branch.
    activeBranchIndex = -1
    removeActiveBlock()
  })

  return nextNode
}

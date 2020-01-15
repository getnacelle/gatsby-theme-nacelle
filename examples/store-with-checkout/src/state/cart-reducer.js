const initialState = { 
  lineItems: [],
  isCartVisible: true,
  checkoutId: null,
  checkoutComplete: false,
  error: null
}

export default function (state = initialState, action) {
  switch(action.type) {
    case 'ADD_TO_CART': {
      const { lineItems } = state
      const { title, handle, src, variant } = action.payload
      const index = lineItems.findIndex(el => el.variant.id === variant.id)
      const variantInLineItems = index > -1
      const qty = variantInLineItems ? ++lineItems[index].variant.qty : 1
      if (variantInLineItems) {
        return {
          ...state,
          lineItems: [...lineItems].map(
            (el, idx) => (idx === index)
              ? {...el, variant: { ...el.variant, qty }} 
              : el
          )
        }
      } else {
        return {
          ...state,
          lineItems: [...lineItems, 
            { title, handle, src, variant:{ ...variant, qty }}
          ]
        }
      }
    }
    case 'INCREMENT_ITEM': {
      const { lineItems } = state
      const { variant } = action.payload
      const index = lineItems.findIndex(el => el.variant.id === variant.id)
      return {
        ...state,
        lineItems: [...lineItems].map(
          (el, idx) => (idx === index)
            ? {...el, variant: { ...el.variant, qty: ++el.variant.qty }} 
            : el
        )
      }
    }
    case 'DECREMENT_ITEM': {
      const { lineItems } = state
      const { variant } = action.payload
      const index = lineItems.findIndex(el => el.variant.id === variant.id)
      if (variant.qty > 1) {
        return { 
          ...state,
          lineItems: [...lineItems].map(
            (el, idx) => (idx === index)
              ? {...el, variant: { ...el.variant, qty: --el.variant.qty }} 
              : el
          )
        }
      } else {
        return {
          ...state,
          lineItems: [...lineItems].filter(
            (el, idx) => (idx !== index)
          )
        }
      }
    }
    case 'CLEAR_CART': {
      return {
        ...state,
        lineItems: []
      }
    }
    case 'TOGGLE_CART': {
      return {
        ...state,
        isCartVisible: !state.isCartVisible
      }
    }
    default: {
      return state
    }
  }
}

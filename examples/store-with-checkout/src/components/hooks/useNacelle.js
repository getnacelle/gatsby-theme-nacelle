import { useState, useEffect, useCallback, useRef } from 'react';
import axios from 'axios';

function formatCredentials({ credentials = null } = {}) {
  const nacelleSpaceId =
    credentials.nacelle_space_id ||
    credentials['nacelle-space-id'] ||
    credentials.nacelleSpaceID ||
    credentials.nacelleSpaceId;
  const nacelleGraphQLtoken =
    credentials.nacelle_graphql_token ||
    credentials['nacelle-graphql-token'] ||
    credentials.nacelleGraphQLToken ||
    credentials.nacelleGraphqlToken;
  return [nacelleSpaceId, nacelleGraphQLtoken];
}

export function useNacelle({ credentials, query } = {}) {
  //
  // Fetch data from the Hail Frequency API with any valid query
  //
  if (!credentials) {
    throw new Error(
      `useCheckout requires a credentials object containing 
      your nacelle_space_id and nacelle_graphql_token.`
    );
  }
  if (!query) {
    throw new Error(
      'useNacelle requires a query object containing your GraphQL query string.'
    );
  }
  const [nacelleSpaceId, nacelleGraphQLtoken] = formatCredentials({
    credentials
  });
  const [data, setData] = useState(null);
  useEffect(
    (() => {
      async function fetchData() {
        const result = await axios({
          url: 'https://hailfrequency.com/v2/graphql',
          method: 'post',
          headers: {
            'Content-Type': 'application/json',
            'X-Nacelle-Space-ID': nacelleSpaceId,
            'X-Nacelle-Space-Token': nacelleGraphQLtoken
          },
          data: {
            query
          }
        });
        setData(result.data);
      }
      fetchData();
    },
    [])
  );
  return data;
}

export function useCheckout({ credentials, lineItems, checkoutId } = {}) {
  //
  // Fetch checkout data (url, id, etc.) from the Hail Frequency API
  //
  if (!credentials) {
    throw new Error(
      `useCheckout requires a credentials object containing 
      your nacelle_space_id and nacelle_graphql_token.`
    );
  }
  if (!lineItems) {
    throw new Error(
      `useCheckout requires a "lineItems" object containing 
      the "variantId" and "qty" of each item in the cart.`
    );
  }
  const [checkoutData, setCheckoutData] = useState(null);
  const [isSending, setIsSending] = useState(false);
  const isMounted = useRef(true);
  useEffect(
    () => () => {
      isMounted.current = false;
    },
    []
  );
  const [nacelleSpaceId, nacelleGraphQLtoken] = formatCredentials({
    credentials
  });
  const cartItems = lineItems.map((item, idx) => ({
    variantId: item.variant.id,
    cartItemId: `${idx}::${item.variant.id}`,
    quantity: item.variant.qty
  }));
  const getDataCallback = useCallback(async () => {
    if (isSending) return;
    setIsSending(true);
    try {
      const result = await axios({
        url: 'https://hailfrequency.com/v2/graphql',
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          'X-Nacelle-Space-ID': nacelleSpaceId,
          'X-Nacelle-Space-Token': nacelleGraphQLtoken
        },
        data: {
          query: `
          mutation sendCheckout($input: CheckoutInput) {
            processCheckout(input: $input) {
              id
              completed
              url
              source
            }
          }
          `,
          variables: {
            input: {
              cartItems,
              checkoutId
            }
          }
        }
      });
      setCheckoutData(result);
      if (isMounted.current) {
        setIsSending(false);
      }
      return result;
    } catch (error) {
      throw new Error(error);
    }
  }, [cartItems, checkoutId, isSending, nacelleGraphQLtoken, nacelleSpaceId]);
  return [checkoutData, getDataCallback];
}

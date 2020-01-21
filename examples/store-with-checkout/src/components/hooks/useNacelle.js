import { useState, useEffect, useCallback, useRef } from 'react';
import axios from 'axios';

function parseCredentials({ credentials = null } = {}) {
  if (!credentials) {
    throw new Error(
      `A credentials object containing "nacelle_space_id" and 
        "nacelle_graphql_token" properties must be passed in 
        order to fetch data from the Hail Frequency API.`
    );
  }
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

// eslint-disable-next-line prettier/prettier
export async function getHailFrequencyData({ credentials, query, variables } = {}) {
  if (!query) {
    throw new Error(
      `A query object containing a GraphQL query string
        must be passed in order to fetch data from the
        Hail Frequency API.`
    );
  }
  const [nacelleSpaceId, nacelleGraphQLtoken] = parseCredentials({
    credentials
  });
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
        query,
        variables
      }
    });
    return result;
  } catch (error) {
    throw new Error(error);
  }
}

export function useNacelle({ credentials, query, variables } = {}) {
  //
  // Fetch data from the Hail Frequency API with any valid query
  //
  const [data, setData] = useState(null);
  useEffect(() => {
    async function fetchData() {
      try {
        const result = await getHailFrequencyData({
          credentials,
          query,
          variables
        });
        setData(result.data);
      } catch (error) {
        throw new Error(error);
      }
    }
    fetchData();
  }, [credentials, query, variables]);
  return data;
}

// eslint-disable-next-line prettier/prettier
export function useCheckout({ credentials, lineItems, checkoutId = null } = {}) {
  //
  // Fetch checkout data (url, id, etc.) from the Hail Frequency API
  //
  const [checkoutData, setCheckoutData] = useState(null);
  const [isSending, setIsSending] = useState(false);
  const isMounted = useRef(true);
  useEffect(
    // Set isMounted to false when the component is unmounted
    () => () => {
      isMounted.current = false;
    },
    []
  );
  const cartItems = lineItems.map((item, idx) => ({
    variantId: item.variant.id,
    cartItemId: `${idx}::${item.variant.id}`,
    quantity: item.variant.qty
  }));
  const checkoutCallback = useCallback(async () => {
    if (isSending) return; // while sending, don't send again
    setIsSending(true);
    const query = `
      mutation sendCheckout($input: CheckoutInput) {
        processCheckout(input: $input) {
          id
          completed
          url
          source
        }
      }
    `;
    const variables = {
      input: {
        cartItems,
        checkoutId
      }
    };
    try {
      const checkoutResult = await getHailFrequencyData({
        credentials,
        query,
        variables
      });
      setCheckoutData(checkoutResult);
      if (isMounted.current) {
        setIsSending(false); // only update if still mounted
      }
    } catch (error) {
      throw new Error(error);
    }
  }, [cartItems, checkoutId, credentials, isSending]);
  return [checkoutData, checkoutCallback, isSending];
}

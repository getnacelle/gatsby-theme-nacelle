import React from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { Layout } from 'src/components';
import { accountClient } from 'src/util';
import FacebookClient from 'src/components/FacebookClient';
import {
  removeCustomerAccessToken,
  setUserErrors
} from 'src/state/user-actions';
import { CUSTOMER_ACCESS_TOKEN_DELETE } from 'src/queries/account';

const PageLayout = styled.div`
  padding: 0 1em;
  button {
    width: 10em;
    padding: 0.5em;
  }
`;

const CustomerInfo = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 2em;
  div {
    padding-right: 4em;
    ul {
      margin-left: 0;
    }
    li {
      list-style: none;
    }
  }
`;

const Logout = () => {
  const dispatch = useDispatch();
  const accessToken = useSelector(
    state => state.user.customerAccessToken.value
  );
  async function clearCustomer() {
    try {
      const query = CUSTOMER_ACCESS_TOKEN_DELETE;
      const variables = { customerAccessToken: accessToken };
      const response = await accountClient.post(null, { query, variables });
      console.log(JSON.stringify(response));
      const { data } = response.data;
      if (data.errors) {
        throw new Error(data.errors.message);
      }
      const { deletedAccessToken, userErrors } = data.customerAccessTokenDelete;
      if (deletedAccessToken) {
        dispatch(removeCustomerAccessToken());
      }
      if (userErrors && userErrors.length > 0) {
        dispatch(setUserErrors(userErrors));
      }
    } catch (e) {
      throw new Error(e);
    }
  }
  return (
    <button type="button" onClick={clearCustomer}>
      Log Out
    </button>
  );
};

const Dashboard = ({ customer }) => {
  const { email, displayName, addresses } = customer;
  return (
    <>
      <Logout />
      <CustomerInfo>
        <div>
          <h3>Name</h3>
          <p>{displayName}</p>
        </div>
        <div>
          <h3>Email</h3>
          <p>{email}</p>
        </div>
        <div>
          <h3>
            Addresses
            {addresses && addresses.length > 0 ? `(${addresses.length})` : ''}
          </h3>
          <ul>
            {addresses &&
              addresses.map(el => (
                <li>
                  {el.node.formatted.map(item => (
                    <li>{item}</li>
                  ))}
                </li>
              ))}
          </ul>
          <button type="button">Add an Address</button>
        </div>
      </CustomerInfo>
    </>
  );
};

const NotLoggedIn = () => (
  <PageLayout>
    <p>
      Please log in <Link to="/account/login">here</Link>
    </p>
  </PageLayout>
);

const AccountPage = () => {
  const customer = useSelector(state => state.user.customer);
  return (
    <Layout>
      <PageLayout>
        <FacebookClient />
        <h1>Account</h1>
        {customer && <Dashboard customer={customer} />}
        {!customer && <NotLoggedIn />}
      </PageLayout>
    </Layout>
  );
};

export default AccountPage;

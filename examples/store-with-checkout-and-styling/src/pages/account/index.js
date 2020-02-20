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
      const {
        deletedAccessToken,
        userErrors
      } = response.data.data.customerAccessTokenDelete;
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
  const { email, displayName } = customer;
  return (
    <>
      <h3>Name</h3>
      <p>{displayName}</p>
      <h3>Email</h3>
      <p>{email}</p>
      <Logout />
    </>
  );
};

const ToLogin = () => (
  <p>
    Please log in <Link to="/account/login">here</Link>
  </p>
);

const AccountPage = () => {
  const customer = useSelector(state => state.user.customer);
  return (
    <Layout>
      <PageLayout>
        <FacebookClient />
        <h1>Account</h1>
        {customer && <Dashboard customer={customer} />}
        {!customer && <ToLogin />}
      </PageLayout>
    </Layout>
  );
};

export default AccountPage;

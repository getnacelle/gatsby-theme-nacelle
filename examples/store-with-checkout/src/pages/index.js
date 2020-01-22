import React from 'react';
import { Link } from 'gatsby';

const IndexPage = () => (
  <>
    <h1>DEMO: gatsby-theme-nacelle</h1>
    <p>
      Let's fetch from data from Nacelle using <code>gatsby-theme-nacelle</code>{' '}
      <span role="img" aria-label="rocket">
        🚀
      </span>
    </p>
    <nav>
      <ul style={{ listStyleType: 'none' }}>
        <li>
          <Link to="/shop">All Products</Link>
        </li>
        <li>
          <Link to="/collections/beds">Beds</Link>
        </li>
        <li>
          <Link to="/collections/blankets">Blankets</Link>
        </li>
        <li>
          <Link to="/collections/sheets">Sheets</Link>
        </li>
        <li>
          <Link to="/collections/consoles">Consoles</Link>
        </li>
      </ul>
    </nav>
  </>
);

export default IndexPage;

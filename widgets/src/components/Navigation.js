/* Building a Header for Navigation

1. User clicks on list.
2. when URL is changed, don`t do a full page refresh!
3. Each Route should detect the URL is changed.
4. Route can update a piece of state, tracking the current Pathname.
5. Each Route rerenders, showing/hiding components appropriately.
*/
import React from 'react';
import Link from './Link';

const Header = () => {
  return (
    <div className="ui secondary pointing menu">
      <Link href="/" className="item">
        Accordion
      </Link>
      <Link href="/search" className="item">
        Search
      </Link>
      <Link href="/Dropdown" className="item">
        Dropdown
      </Link>
      <Link href="/Translate" className="item">
        Translate
      </Link>
    </div>
  );
};

export default Header;


import React from 'react';

const Link = ({ className, href, children }) => {
  const onClick = (event) => {
    event.preventDefault();
    /* window.history.push will
        change the URL,keep in sync with Content, 
        not refreshing the full page i.e making a new network req.
    */
    window.history.pushState({},'',href);

    //Now we create a navigation event that tells our route component that URL has changed.
    const navEvent= new PopStateEvent('popstate');
    window.dispatchEvent(navEvent);

  };

  return (
    <a onClick={onClick} className={className} href={href}>
      {children}
    </a>
  );
};

export default Link;
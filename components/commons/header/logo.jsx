import React from 'react';

const Logo = ({ }) =>
<a href="/" title="Go to home page">
    <img
        alt="Logo"
        src={require('../../../images/assets/branding/logo-dark.png')}
        style={{ maxHeight: '40px' }}
    />
</a>;

export default Logo;
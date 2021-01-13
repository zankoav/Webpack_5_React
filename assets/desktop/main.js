import './header/header';

import React from 'react';
import {render} from 'react-dom';
import CloseButton from 'c/closeButton';

render(
    <CloseButton/>,
    document.getElementById('close-button')
);
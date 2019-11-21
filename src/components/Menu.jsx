import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome } from '@fortawesome/free-solid-svg-icons' 
import { faFileAlt } from '@fortawesome/free-solid-svg-icons'
import { theme } from '../App.js'

//========================== Styled Components
const MenuStyle = styled.div`
    display: flex;
    justify-content: center;
`;

const LinkStyle = styled(Link)`
    width: 3em;
    color: ${props => props.theme.containerBgColor};
    text-align: center;
    padding: 0.5em 1em;
    box-sizing: border-box;
    transition: all ease-in-out 0.3s;

    &:hover {
        color: ${props => props.theme.activeBtnBorderColor};
        border-bottom: 3px double ${props => props.theme.activeBtnBorderColor};
    }
`;

//========================== Stateless Component
const Menu = React.memo( () => {
    return ( 
        <MenuStyle>
            <LinkStyle to="/" theme={theme}>
                <FontAwesomeIcon icon={faHome} />
            </LinkStyle>
            
            <LinkStyle to="/about" theme={theme}>
                <FontAwesomeIcon icon={faFileAlt} />
            </LinkStyle>
        </MenuStyle>
     );
})

//========================== Exports
export default Menu;
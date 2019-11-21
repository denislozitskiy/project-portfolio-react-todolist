import React from 'react'
import PropTypes from "prop-types";
import styled from 'styled-components'
import { theme } from '../App.js'

//========================== Styled Components
const FilterBtn = styled.button`
    flex: 1;
    font-family: "Raleway", "sans-serif";
    background-color: ${props => props.theme.btnBgColor};
    text-align: center;
    border: 3px double transparent;
    transition: all ease-in-out 0.2s;

    
    &[data-filter-type = ${props => props.activeFilterBtn}] {
        border-color: black;
    }

    &:hover {
        border-color: ${props => props.theme.activeBtnBorderColor};
        cursor: pointer;
    }
    
    &:focus {
        outline: none;
    }
`;

//========================== Stateless Component
const Filter = React.memo((props) => {
    
    //============================ PropTypes
    Filter.propTypes = {
        activeFilterBtn: PropTypes.string.isRequired,
        numberOfTodosLeft: PropTypes.number.isRequired,
        setActiveFilter: PropTypes.func.isRequired
    }
    
    // Destruction
    const { numberOfTodosLeft, setActiveFilter, activeFilterBtn } = props;

    //========================== Return
    return (
        <div 
            style={{
                display: "flex", 
                padding: "1em 0em"
            }}
        >
            <p style={{flex: 1, textAlign: "center"}}>
                { numberOfTodosLeft } left
            </p>
            <div style={{flex: 2, display: "flex"}}>
                <FilterBtn
                    theme={theme} 
                    onClick={e => setActiveFilter(e.target.dataset.filterType)}
                    data-filter-type="All"
                    activeFilterBtn={activeFilterBtn}
                >
                    All
                </FilterBtn>

                <FilterBtn 
                    theme={theme} 
                    onClick={e => setActiveFilter(e.target.dataset.filterType)}
                    data-filter-type="Active"
                    activeFilterBtn={activeFilterBtn}
                >
                    Active
                </FilterBtn>

                <FilterBtn 
                    theme={theme} 
                    onClick={e => setActiveFilter(e.target.dataset.filterType)}
                    data-filter-type="Completed"
                    activeFilterBtn={activeFilterBtn}
                >
                    Completed
                </FilterBtn>
            </div>
        </div>
    );
})

//========================== Exports
export default Filter;
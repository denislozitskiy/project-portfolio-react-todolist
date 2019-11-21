import React from 'react'
import { Container } from '../../App.js'

//========================== Stateless Component
const About = React.memo( () => {
    return ( 
        <Container>
            <p style={{textAlign: "center"}}>
                This App was created as part of the portpolio of <a href="https://github.com/denislozitskiy" target="_blank" rel="noopener noreferrer" alt="Github">Denis Lozitskiy</a>.
            </p>
        </Container>
     );
})

//========================== Exports
export default About;
import React, { useState, useMemo, useEffect } from 'react';

import absences from './absences.json';
import members from './members.json';
import './style.scss';


function App() {
    
    const [absencesWithMembers, setAbsencesWithMembers] = useState([])
    
    /*Task 1: list of absences including the names of the employees.*/
    useEffect(() => {
       
        let newData = absences.payload.map((data, d) => {
            

            return { ...data, memberDetails: members.payload.filter(member => member.userId === data.userId) }

        })
        
        setAbsencesWithMembers(newData)

    }, []);
 

    return (

        <>
    
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Type</th>
                            
                            <th>MemberNote</th>
                            
                            <th>AdminNote</th>
                        </tr>
                    </thead>
                    <tbody>


                    {absencesWithMembers.map(
                            (info, i) => {

                                return (
                                    <tr key={i}>
                                        <td>{info.memberDetails[0].name}</td>
                                        <td>{info.type}</td>
                                         <td>{info.memberNote}</td>
                                        <td>{info.admitterNote}</td>
                                    </tr>
                                );
                            }
                        )}

                    </tbody>
                </table>

               
        </>
    );
}

export default App;

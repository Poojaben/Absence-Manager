import React, { useState, useMemo, useEffect } from 'react';
import Pagination from '../Pagination';
import absences from './absences.json';
import members from './members.json';
import './style.scss';

let PageSize = 10;

function App() {
    const [currentPage, setCurrentPage] = useState(1);
    const [absencesWithMembers, setAbsencesWithMembers] = useState([])
    
    /*Task 1: list of absences including the names of the employees.*/
    useEffect(() => {
       
        let newData = absences.payload.map((data, d) => {
            

            return { ...data, memberDetails: members.payload.filter(member => member.userId === data.userId) }

        })
        
        setAbsencesWithMembers(newData)

    }, []);

   /* Task 2: first 10 absences, with the ability to paginate.*/
    const currentTableData = useMemo(() => {
        const firstPageIndex = (currentPage - 1) * PageSize;
        const lastPageIndex = firstPageIndex + PageSize;
        return absencesWithMembers.slice(firstPageIndex, lastPageIndex);
    }, [currentPage, absencesWithMembers]);


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


                    {currentTableData.map(
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
            <Pagination
                className="pagination-bar"
                currentPage={currentPage}
                totalCount={absences.payload.length}
                pageSize={PageSize}
                onPageChange={page => setCurrentPage(page)}
            />
               
        </>
    );
}

export default App;

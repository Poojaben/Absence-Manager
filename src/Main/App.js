import React, { useState, useMemo, useEffect } from 'react';
import Pagination from '../Pagination';
import absences from './absences.json';
import members from './members.json';
import './style.scss';

let PageSize = 10;

function App() {
    const [currentPage, setCurrentPage] = useState(1);
    const [absencesWithMembers, setAbsencesWithMembers] = useState([])
    const [requested, setRequested] = useState(0);
    const [rejected, setRejected] = useState(0);
    const [confirmed, setConfirmed] = useState(0);
    /*Task 1: list of absences including the names of the employees.*/
    useEffect(() => {
        /*Task 2: see a total number of absences, with total rejected, total requested and total confirmed*/
        //I don´t want to set state every tiome in loop so i used this variables
        let reject = 0
        let request = 0
        let confirm = 0
        let newData = absences.payload.map((data, d) => {
            if (data.rejectedAt) {
                reject += 1
            } else if (data.confirmedAt) {
                confirm += 1
            } else {
                request += 1
            }

            return { ...data, memberDetails: members.payload.filter(member => member.userId === data.userId) }

        })
        setRejected(reject)
        setRequested(request)
        setConfirmed(confirm)
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
            <p>Total Absences = {absencesWithMembers.length}</p>
            <p>Requested = {requested}</p>
            <p>Rejected = {rejected}</p>
            <p>Confirmed = {confirmed}</p>
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

import React, { useState, useMemo, useEffect } from 'react';
import Pagination from '../Pagination';
import absences from './absences.json';
import members from './members.json';
import moment from 'moment';
import './style.scss';

let PageSize = 10;

function App() {
    const [currentPage, setCurrentPage] = useState(1);
    const [absencesWithMembers, setAbsencesWithMembers] = useState([])
    const [requested, setRequested] = useState(0);
    const [rejected, setRejected] = useState(0);
    const [confirmed, setConfirmed] = useState(0);
    const [searchTerm, setSearchTerm] = useState('')
    const [isLoading, setIsLoading] = useState(false);
    const [hasError, setHasError] = useState(false);
    const [dataLength, setDataLength] = useState(0)

    /*Task 1: list of absences including the names of the employees.*/
    useEffect(() => {
        /*Task 3: see a total number of absences, with total rejected, total requested and total confirmed*/
        //I don´t want to set state every tiome in loop so i used this variables
        setIsLoading(true);
        setHasError(false);
        try {
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
        }
        catch (error) {
            setHasError(true);
        }
        setIsLoading(false);
    }, []);

   /* Task 2: first 10 absences, with the ability to paginate.*/
    const currentTableData = useMemo(() => {
        const firstPageIndex = (currentPage - 1) * PageSize;
        const lastPageIndex = firstPageIndex + PageSize;
       /* Task 5, 6: filter absences by type, and date*/
        let filteredData = absencesWithMembers.filter((val) => {
            if (searchTerm == "") {
                return val
            }
            else if (
                val.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
                val.startDate.toLowerCase().includes(searchTerm.toLowerCase()) ||
                val.endDate.toLowerCase().includes(searchTerm.toLowerCase())
            ) {
                return val;
            }
        })
        // set filtered data length to handle pagination
        setDataLength(filteredData.length)

        return filteredData.slice(firstPageIndex, lastPageIndex);
    }, [currentPage, absencesWithMembers, searchTerm]);


    return (
        /*Task 7:loading state until the list is available.*/
        /*Task 8:error state if the list is unavailable.*/
        /*Task 9: empty state if there are no results.*/
        <React.Fragment>
            {hasError && <p>Something went wrong.</p>}
            {isLoading ? (
                <p>Loading ...</p>
            ) : (
        <>
            <p>Total Absences = {absencesWithMembers.length}</p>
            <p>Requested = {requested}</p>
            <p>Rejected = {rejected}</p>
            <p>Confirmed = {confirmed}</p>
            <input type="text" placeholder="search..." onChange={e => setSearchTerm(e.target.value)} />


                <table>
                    <thead>
                        <tr>
                            <th>Member name</th>
                            <th>Type of absence</th>
                            <th>Period(In Days)</th>
                            <th>Member note (when available)</th>
                            <th>Status</th>
                            <th>Admitter note (when available)</th>
                        </tr>
                    </thead>
                    <tbody>

                                {/*Task 4: Each absence with Member name, Type of absence, Period, Member note, Status and Admitter note */}
                                {currentTableData.map(
                                    (info, i) => {

                                return (
                                    <tr key={i}>
                                        <td>{info.memberDetails[0].name}</td>
                                        <td>{info.type}</td>
                                        <td>{moment(info.endDate).diff(moment(info.startDate), "days") + 1}</td>
                                        <td>{info.memberNote}</td>
                                        <td>{info.rejectedAt ? "Rejected" : info.confirmedAt ? "Confirmed" : "Requested"}</td>
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
                totalCount={dataLength}
                pageSize={PageSize}
                onPageChange={page => setCurrentPage(page)}
            />
               
                    </>
            )}
        </React.Fragment>
    );
}

export default App;

# Absence-Manager
Frontend React
## Project Repository Link


[https://github.com/Poojaben/Absence-Manager.git
](https://github.com/Poojaben/Absence-Manager.git)


## To Run Project

Use the package manager [pip](https://pip.pypa.io/en/stable/) to install foobar.


Open terminal and go the location where you want to clone the project.


To install and run project, perform below steps:
```bash
git clone https://github.com/Poojaben/Absence-Manager.git
cd Absence-Manager
npm install
npm start
```
## Project Features

* List of absences including the names of the members.
* Lrst 10 absences, with the ability to paginate.
* Total number of absences, with Total number of confirmed, rejected and reuested absences.
* with each absence:
 1. Member name
 2. Type of absence
 3. Period
 4. Member note (when available)
 5. Status (can be 'Requested', 'Confirmed' or 'Rejected')
 6. Admitter note (when available)

 * Filter absences by type.
 * Filter absences by date.
 * Loading state until the list is available.
* Error state if the list is unavailable.
* Empty state if there are no results.

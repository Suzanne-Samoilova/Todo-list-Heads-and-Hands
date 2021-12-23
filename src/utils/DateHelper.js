export const getDateNowByDDmmyyyy = () => {
    let d = new Date();
    let ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(d);
    let mo = new Intl.DateTimeFormat('en', { month: 'numeric' }).format(d);
    let da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d);
    // return `${ye}-${mo}-${da}`;
    return `${da}.${mo}.${ye}`;
}

// export const getDateDeadlineByDDmmyyyy = () => {
//     let d = new Date();
//
//
//     let ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(d);
//     let mo = new Intl.DateTimeFormat('en', { month: 'numeric' }).format(d);
//     let da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d);
//     // return `${ye}-${mo}-${da}`;
//     return `${da}.${mo}.${ye}`;
// }
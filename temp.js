// function descendingComparator(a, b, orderBy) {
//   if (
//     orderBy === 'updated_on_al' ||
//     orderBy === 'end_date' ||
//     orderBy === 'updated_on'
//   ) {
//     if (b[orderBy] === '' && a[orderBy] !== '') {
//       return -1;
//     }
//     if (b[orderBy] !== '' && a[orderBy] === '') {
//       return 1;
//     }
//     return new Date(b[orderBy]).valueOf() - new Date(a[orderBy]).valueOf();
//   } else {
//     if (b[orderBy] < a[orderBy]) {
//       return -1;
//     }
//     if (b[orderBy] > a[orderBy]) {
//       return 1;
//     }
//   }
//   return 0;
// }

// function getComparator(order, orderBy) {
//   return order === 'desc'
//     ? (a, b) => descendingComparator(a, b, orderBy)
//     : (a, b) => -descendingComparator(a, b, orderBy);
// }

// function stableSort(array, comparator) {
//   const stabilizedThis = array.map((el, index) => [el, index]);
//   stabilizedThis.sort((a, b) => {
//     const order = comparator(a[0], b[0]);
//     if (order !== 0) return order;
//     return a[1] - b[1];
//   });
//   return stabilizedThis.map((el) => el[0]);
// }

// console.log(stableSort(['B', 'A'], 'desc'));

const arr = [
  'A1',
  'A10',
  'A11',
  'A12',
  'A2',
  'A3',
  'A4',
  'B10',
  'B2',
  'F1',
  'F12',
  'F3',
];

const sortAlphaNum = (a, b) => a.localeCompare(b, 'en', { numeric: true });

console.log(arr.sort(sortAlphaNum));

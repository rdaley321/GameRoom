const doughnutChartReducer = (state = {sortBy: 'wins'}, action) => {
  switch (action.type) {
    case 'SORT_BY':
      return {...state, sortBy: action.payload}
    default:
      return state;
  }
}



export default doughnutChartReducer

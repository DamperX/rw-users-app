import Paper from "@mui/material/Paper";
import SearchIcon from '@mui/icons-material/Search';
import {Box, FormControl, InputAdornment, OutlinedInput} from "@mui/material";
import PropTypes from "prop-types";

const FILTER_VALUES = {
  FULL_NAME: 'fullName'
}

const TableFilters = ({filterValues, changeFilterValues}) => {
  const onChangeValueHandler = ({target}) => {
    changeFilterValues(target.name, target.value)
  }

  return (
    <Paper>
      <Box display="flex">
        <FormControl variant="outlined">
          <OutlinedInput
            name={FILTER_VALUES.FULL_NAME}
            value={filterValues[FILTER_VALUES.FULL_NAME]}
            onChange={onChangeValueHandler}
            endAdornment={
              <InputAdornment position="end">
                <SearchIcon/>
              </InputAdornment>
            }
            placeholder="Search by fullname"
          />
        </FormControl>
      </Box>
    </Paper>
  )
}

TableFilters.propTypes = {
  filterValues: PropTypes.shape({
    fullName: PropTypes.string
  }).isRequired,
  changeFilterValues: PropTypes.func.isRequired
}


export default TableFilters;
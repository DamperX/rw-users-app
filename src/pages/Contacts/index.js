import React, {useState} from 'react';
import useContacts from "../../hooks/useContacts";
import {Box, Container, Grid, Typography} from "@mui/material";
import ContactsTable from "../../components/ContactsTable";
import ContactsGrid from "../../components/ContactsGrid";
import ToggleViewMode from "../../components/ToggleViewMode";
import useViewMode from "../../hooks/useViewMode";
import {DATA_VIEW_MOD} from "../../consts";
import TableFilters from "../../components/TableFilters";

const defaultFilterValues = {
  fullName: ''
}

const sortDataByFullName = ({first, last}, fullName) => {
  return first.toLowerCase().includes(fullName.toLowerCase()) || last.toLowerCase().includes(fullName.toLowerCase())
}

const Contacts = () => {
  const contacts = useContacts()
  const [viewMode, setViewMode] = useViewMode()
  const [filtersValues, setFiltersValues] = useState(defaultFilterValues)

  const onChangeFilterValues = (filterName, filterValue) => {
    setFiltersValues({
      ...filtersValues,
      [filterName]: filterValue
    })
  }

  const onHandleChangeView = (_, view) => {
    if (view !== null) {
      setViewMode(view)
    }
  }

  const filteredData = contacts.data.filter(c => {
    return sortDataByFullName(c.name, filtersValues.fullName)
  })

  return (
    <Container>
      <Box marginY={3}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Box display="flex" alignItems="center" justifyContent="space-between">
              <Typography variant="h5" component="h1">Contacts</Typography>
              <ToggleViewMode view={viewMode} onHandleChange={onHandleChangeView} />
            </Box>
          </Grid>
          <Grid item xs={12}>
            <TableFilters filterValues={filtersValues} changeFilterValues={onChangeFilterValues} />
          </Grid>
        </Grid>
      </Box>
      {(() => {
        if (contacts.loading) {
          return <div data-testid="contacts-loader">...loading</div>
        }

        if (contacts.error) {
          return <div data-testid="contacts-data-error">...something went wrong</div>
        }

        if (viewMode === DATA_VIEW_MOD.TABLE) {
          return <ContactsTable data={filteredData} />
        }

        if (viewMode === DATA_VIEW_MOD.GRID) {
          return <ContactsGrid data={filteredData} />
        }

        return null
      })()}
    </Container>
  );
};

export default Contacts;
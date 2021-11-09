import React from 'react';
import useContacts from "../../hooks/useContacts";
import {Box, Container, Grid, Typography} from "@mui/material";
import ContactsTable from "../../components/ContactsTable";
import ContactsGrid from "../../components/ContactsGrid";
import ToggleViewMode from "../../components/ToggleViewMode";
import useViewMode from "../../hooks/useViewMode";
import {DATA_VIEW_MOD} from "../../consts";

const Contacts = () => {
  const contacts = useContacts()
  const [viewMode, setViewMode] = useViewMode()

  const onHandleChangeView = (_, view) => {
    if (view !== null) {
      setViewMode(view)
    }
  }

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
          return <ContactsTable data={contacts.data} />
        }

        if (viewMode === DATA_VIEW_MOD.GRID) {
          return <ContactsGrid data={contacts.data} />
        }

        return null
      })()}
    </Container>
  );
};

export default Contacts;
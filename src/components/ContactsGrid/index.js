import React from 'react';
import {Grid, List, ListItem, ListItemAvatar, ListItemText} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Paper from "@mui/material/Paper";
import moment from "moment";
import CopyToClipBoard from "../CopyToClipBoard";
import Typography from "@mui/material/Typography";
import {NATIONS} from "../../consts/nations";
import Chip from "@mui/material/Chip";

const ContactsGrid = ({data}) => {
  return (
    <Grid container spacing={4}>
      {data.map((contact) => (
        <Grid key={contact.login.uuid} item xs={6}>
          <List component={Paper}>
            <ListItem>
              <ListItemAvatar>
                <Avatar src={contact.picture.thumbnail}
                        alt={`${contact.name.first} ${contact.name.last}` } />
              </ListItemAvatar>
              <ListItemText primary="Full name" secondary={`${contact.name.title} ${contact.name.first} ${contact.name.last}`} />
            </ListItem>
            <ListItem>
              <ListItemText primary="Birthday" secondary={moment(contact.dob.date).format('dddd, M/D/YYYY, H:mm:ss A')} />
            </ListItem>
            <ListItem>
              <ListItemText primary="Years" secondary={contact.dob.age} />
            </ListItem>
            <ListItem>
              <ListItemText>
                <CopyToClipBoard text={contact.email} />
              </ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText>
                <CopyToClipBoard text={contact.phone} />
              </ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText>
                <Typography>Location</Typography>
                <Typography>/{contact.location.country}/</Typography>
                <Typography>{contact.location.street.number} {contact.location.street.name}</Typography>
                <Typography>{contact.location.country} {contact.location.postcode}</Typography>
              </ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText>
                <Typography>Nationality</Typography>
                <Chip variant="outlined" label={NATIONS[contact.nat].title} sx={{
                  ...NATIONS[contact.nat].styles
                }}/>
              </ListItemText>
            </ListItem>
          </List>
        </Grid>
      ))}
    </Grid>
  );
};

export default ContactsGrid;
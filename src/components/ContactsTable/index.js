import moment from 'moment';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import CopyToClipBoard from "../CopyToClipBoard";
import {NATIONS} from "../../consts/nations";

const ContactsTable = ({data}) => {
  return (
    <TableContainer component={Paper} data-testid="contacts-table-container">
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Avatar</TableCell>
            <TableCell>Full name</TableCell>
            <TableCell>Birthday</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Phone</TableCell>
            <TableCell>Location</TableCell>
            <TableCell align="right">Nationality</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((contact) => {
            return (<TableRow
              key={contact.login.uuid}
            >
              <TableCell><Avatar src={contact.picture.thumbnail}
                                 alt={`${contact.name.first} ${contact.name.last}`}/></TableCell>
              <TableCell>{contact.name.title} {contact.name.first} {contact.name.last}</TableCell>
              <TableCell>
                <Typography>{moment(contact.dob.date).format('dddd, M/D/YYYY, H:mm:ss A')}</Typography>
                <Typography>{contact.dob.age} years</Typography>
              </TableCell>
              <TableCell>
                <CopyToClipBoard text={contact.email}/>
              </TableCell>
              <TableCell>
                <CopyToClipBoard text={contact.phone}/>
              </TableCell>
              <TableCell>
                <Typography>/{contact.location.country}/</Typography>
                <Typography>{contact.location.street.number} {contact.location.street.name}</Typography>
                <Typography>{contact.location.country} {contact.location.postcode}</Typography>
              </TableCell>
              <TableCell align="right">
                <Chip variant="outlined" label={NATIONS[contact.nat].title} sx={{
                  ...NATIONS[contact.nat].styles
                }}/>
              </TableCell>
            </TableRow>)
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ContactsTable;
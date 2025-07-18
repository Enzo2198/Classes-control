import {Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography} from "@mui/material";
import type {Member} from "../../../../utils";
import {useOutletContext} from "react-router";

interface MembersContentProps {
  members: Member[]
}

interface HeaderMember {
  name: string
  text: string
}

const headers: HeaderMember[] = [
  {name: 'id', text: 'NO.'},
  {name: 'name', text: 'HỌ TÊN'},
  {name: 'position', text: 'VỊ TRÍ'}
]

export default function MembersContent() {
  const { members } = useOutletContext<MembersContentProps>();
  console.log(members);
  return (
    <Box sx={{mt: 3}}>
      <Typography variant="h4" fontWeight="bold" sx={{mb: 2}}>
        Danh sách thành viên
      </Typography>

      <TableContainer component={Paper} elevation={0} sx={{p: 2}}>
        <Table>
          <TableHead>
            <TableRow>
              {
                headers.map((header: HeaderMember) => {
                  return <TableCell sx={{fontWeight: 'bold', color: '#666'}} key={header.name}>{header.text}</TableCell>
                })
              }
            </TableRow>
          </TableHead>
          <TableBody>
            {members.map((member: Member) => (
              <TableRow
                key={member.id}
                sx={member.id % 2 === 0 ? {} : {backgroundColor: '#f5f9fc'}}
              >
                <TableCell>{member.id}</TableCell>
                <TableCell>{member.name}</TableCell>
                <TableCell>{member.role}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
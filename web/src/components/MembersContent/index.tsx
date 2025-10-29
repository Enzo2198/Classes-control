import {Box, Chip, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography} from "@mui/material";
import type {Member, MembersContentProps} from "../../utils";
import {KeyOutlined as KeyIcon} from '@mui/icons-material';

export default function MembersContent({course}: MembersContentProps) {
  // swapping to have teachers at the head of the array
  const {teachers, students} = course;
  const members: Member[] = [...teachers, ...students];

  return (
    <Box sx={{mt: 3, overflowY: 'auto'}}>
      <TableContainer component={Paper} elevation={0} sx={{p: 2}}>
        <Typography variant="h6" fontWeight="bold" sx={{mb: 1}} color={'primary'}>
          Danh sách thành viên
        </Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{fontWeight: 'bold', color: '#666'}}>NO.</TableCell>
              <TableCell sx={{fontWeight: 'bold', color: '#666'}}>HỌ TÊN</TableCell>
              <TableCell sx={{fontWeight: 'bold', color: '#666'}}>VỊ TRÍ</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {members.map((member: Member, index: number) => (
              <TableRow
                key={member.id}
                sx={index % 2 !== 0 ? {} : {backgroundColor: '#f0f0f0'}}
              >
                <TableCell>{index + 1}</TableCell>
                <TableCell>{member.name}</TableCell>
                <TableCell>
                  <Chip
                    label={member.role === "student"?"Học sinh":"Giáo viên"}
                    size="small"
                    sx={{
                      backgroundColor: member.role === 'teacher' ? 'rgba(255, 118, 117, 0.5)' : 'rgb(46, 204, 113)',
                      color: 'white',
                    }}
                  />
                </TableCell>
                <TableCell align="left" sx={{color: '#f9ca24'}}>
                  {member.role === 'teacher' && (
                    <KeyIcon/>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
// function LeagueStandings(props) {

//     const TeamRow = (props) => {
//         const { team, win, loss, gamesBehind } = props.team
//         return (
//             <div style={rowStyle}>
//                 <div style={rowItem}>{team.name} </div>
//                 <div style={rowItem}>{win.total} - {loss.total}</div>
//                 <div style={rowItem}>-{gamesBehind}</div>
//             </div>
//         )
//     }

//     return (
//         <div>
//             {props.standings.map((row, index) => {
//                 const { team, win, loss, gamesBehind } = row
//                 return (
//                     <TeamRow team={row} key={index} />
//                 )
//             })}
//         </div>
//     )
// }

// const rowStyle = {
//     display: 'flex',
//     flexDirection: 'row',
//     margin: 5
// }

// const rowItem = {
//     marginRight: 10
// }

// export default LeagueStandings

import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export default function BasicTable(props) {

    const sortedStandings = props.standings.sort((a,b) => {
        return (a.win.total - a.loss.total) - (b.win.total - b.loss.total)
    })

    return (
        <TableContainer component={Paper} style={{ width: 450 }}>
            <Table sx={{ minWidth: 200 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Team</TableCell>
                        <TableCell align="right">Win/Loss</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {props.standings.reverse().map((row) => (
                        <TableRow
                            key={row.name}
                        //   sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell align="left">{row.team.name}</TableCell>
                            <TableCell align="right">{row.win.total}-{row.loss.total}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

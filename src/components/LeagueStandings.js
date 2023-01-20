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
import { TopOverallPickOdds, Top4PickOdds } from '../constants/lotteryOdds';

export default function BasicTable(props) {

    const sortedStandings = props.standings.sort((a,b) => {
        if (a.win.percentage === b.win.percentage) {
            return a.loss.total - b.loss.total
        } else {
           return a.win.percentage - b.win.percentage 
        } 
    })

    for (let i = 0; i < sortedStandings.length; i++) {
        let sameCounter = 1
        let topPickOddsTotal = 0
        let top4PickOddsTotal = 0
        for (let j = 0; j < sortedStandings.length; j++) {
            if (i !== j && sortedStandings[i].win.percentage === sortedStandings[j].win.percentage) {
                sameCounter++
                topPickOddsTotal += (TopOverallPickOdds[i] + TopOverallPickOdds[j])
                top4PickOddsTotal += (Top4PickOdds[i] + Top4PickOdds[j])
            }
        }
        if (sameCounter > 1) {
            sortedStandings[i].topPickOdds = topPickOddsTotal / sameCounter
            sortedStandings[i].top4PickOdds = top4PickOddsTotal / sameCounter
        } else {
            sortedStandings[i].topPickOdds = TopOverallPickOdds[i]
            sortedStandings[i].top4PickOdds = Top4PickOdds[i]
        }
    }

    return (
        <TableContainer component={Paper} style={{ width: 450 }}>
            <Table sx={{ minWidth: 200 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Team</TableCell>
                        <TableCell align="right">Win/Loss</TableCell>
                        <TableCell align="right">Number 1 Overall Pick Odds</TableCell>
                        <TableCell align="right">Top 4 Pick Odds</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {props.standings.map((row) => (
                        <TableRow
                            key={row.name}
                        //   sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell align="left">{row.team.name}</TableCell>
                            <TableCell align="right">{row.win.total}-{row.loss.total}</TableCell>
                            <TableCell align="right">{(row.topPickOdds*100).toFixed(1)}%</TableCell>
                            <TableCell align="right">{(row.top4PickOdds*100).toFixed(1)}%</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

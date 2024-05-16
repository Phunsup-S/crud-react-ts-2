import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useEffect, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Link from '@mui/material/Link';
import ButtonGroup from '@mui/material/ButtonGroup';
export default function User() {
    const [items, setItems] = useState<{ id: string, fname: string, lname: string, username: string, avatar: string }[]>([

    ]);
    useEffect(() => {
        UserGet()
    }, [])

    const UserGet = () =>{
        fetch("https://www.melivecode.com/api/users")
        .then(res => res.json())
        .then(
            (result) => {
                setItems(result);
            },
        )
    }
    function handleEdit(id: string){
        window.location.href = '/edit/' + id
    }

    function handleDelete(id: string) {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            "id": id
        });

        const requestOptions = {
            method: "DELETE",
            headers: myHeaders,
            body: raw,
        };

        fetch("https://www.melivecode.com/api/users/delete", requestOptions)
            .then((response) => response.json())
            .then((result) => {
                alert(result['message'])
                if(result['status'] === 'ok'){
                    UserGet()
                }
            })
            .catch((error) => console.error(error));
    }


    return (
        <React.Fragment>
            <CssBaseline />
            <Container maxWidth="lg" sx={{ p: 2 }}>
                <Paper sx={{ p: 2 }}>
                    <Box display="flex">
                        <Box sx={{ flexGrow: 1 }}>
                            <Typography variant="h6" gutterBottom>
                                User
                            </Typography>
                        </Box>
                        <Box>
                            <Link href="create">
                                <Button variant="contained">Create</Button>
                            </Link>
                        </Box>
                    </Box>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Id</TableCell>
                                    <TableCell align="right">First Name</TableCell>
                                    <TableCell align="right">Lastname</TableCell>
                                    <TableCell align="right">Username</TableCell>
                                    <TableCell align="center">Avatar</TableCell>
                                    <TableCell align="right">Action</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {items.map((row) => (
                                    <TableRow
                                        key={row.id}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row">
                                            {row.id}
                                        </TableCell>
                                        <TableCell align="right">{row.fname}</TableCell>
                                        <TableCell align="right">{row.lname}</TableCell>
                                        <TableCell align="right">{row.username}</TableCell>
                                        <TableCell align="center">
                                            <Box display='flex' justifyContent="center">
                                                <Avatar alt={row.fname} src={row.avatar} />
                                            </Box>
                                        </TableCell>
                                        <TableCell align="right">
                                            <ButtonGroup variant="outlined" aria-label="Basic button group">
                            
                                                <Button onClick={() => handleEdit(row.id)}>Edit</Button>
                                            
                                                <Button onClick={() => handleDelete(row.id)} sx={{ backgroundColor: 'red', color: 'white' }}>X</Button>
                                            </ButtonGroup>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>
            </Container>
        </React.Fragment>
    );
}
export { };
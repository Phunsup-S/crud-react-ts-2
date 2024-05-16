import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { Button, Grid, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';

export default function UserCreate() {

    const [fname, setFname] = useState<string>('');
    const [lname, setLname] = useState<string>('');
    const [username, setUsername] = useState<string>('');
    const [email, setemail] = useState<string>('');
    const [avatar, setAvatar] = useState<string>('');
    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();  // เพิ่มการหยุดพฤติกรรมเริ่มต้นของฟอร์ม

        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            fname,
            lname,
            username,
            email,
            avatar
        });

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw
        };
        

        interface MyResponseType {
            message: string;
            status: string;
        }
        
        fetch("https://www.melivecode.com/api/users/create", requestOptions)
            .then((response) => response.json() as Promise<MyResponseType>)
            .then((result) => {
                alert([result.message])
                if(result.status === 'ok'){
                    window.location.href ='/'
                }
            })
            .catch((error) => console.error(error));
    }

    return (
        <React.Fragment>
            <CssBaseline />
            <Container maxWidth="sm" sx={{ p: 2 }}>
                <Typography variant="h6" gutterBottom>
                    Create User
                </Typography>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} >
                            <TextField id="fname" label="First Name" variant="outlined" fullWidth required
                                onChange={(e) => setFname(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12} >
                            <TextField id="lname" label="Last Name" variant="outlined" fullWidth required
                                onChange={(e) => setLname(e.target.value)} />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField id="username" label="Username" variant="outlined" fullWidth required
                                onChange={(e) => setUsername(e.target.value)} />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField id="email" label="Email" variant="outlined" fullWidth required
                                onChange={(e) => setemail(e.target.value)} />
                        </Grid>
                        <Grid item xs={12} >
                            <TextField id="avatar" label="Avatar" variant="outlined" fullWidth required
                                onChange={(e) => setAvatar(e.target.value)} />
                        </Grid>
                        <Grid item xs={12}>
                            <Button type='submit' variant="contained" fullWidth>Create</Button>
                        </Grid>


                    </Grid>
                </form>
            </Container>
        </React.Fragment>
    );
}
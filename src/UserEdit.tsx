import * as React from 'react';
import { useParams } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { Button, Grid, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';

export default function UserEdit() {
    const {id} = useParams();

    useEffect(()=>{
        const requestOptions = {
            method: "GET",
          };
          
          fetch("https://www.melivecode.com/api/users/"+id, requestOptions)
            .then((response) => response.json())
            .then((result) => {
                if(result['status'] === 'ok'){
                    setFname(result['user']['fname'])
                    setLname(result['user']['lname'])
                    setUsername(result['user']['username'])
                    setemail(result['user']['email'])
                    setAvatar(result['user']['avatar'])
                }
            })
            .catch((error) => console.error(error));
    },[id])

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
            id,
            fname,
            lname,
            username,
            email,
            avatar
        });

        const requestOptions = {
            method: "PUT",
            headers: myHeaders,
            body: raw
        };
        

        interface MyResponseType {
            message: string;
            status: string;
        }
        
        fetch(" https://www.melivecode.com/api/users/update", requestOptions)
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
                    Edit User
                </Typography>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} >
                            <TextField id="fname" label="First Name" variant="outlined" fullWidth required
                                onChange={(e) => setFname(e.target.value)} value={fname}
                            />
                        </Grid>
                        <Grid item xs={12} >
                            <TextField id="lname" label="Last Name" variant="outlined" fullWidth required
                                onChange={(e) => setLname(e.target.value)} value={lname} />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField id="username" label="Username" variant="outlined" fullWidth required
                                onChange={(e) => setUsername(e.target.value)} value={username} />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField id="email" label="Email" variant="outlined" fullWidth required
                                onChange={(e) => setemail(e.target.value)} value={email} />
                        </Grid>
                        <Grid item xs={12} >
                            <TextField id="avatar" label="Avatar" variant="outlined" fullWidth required
                                onChange={(e) => setAvatar(e.target.value)} value={avatar} />
                        </Grid>
                        <Grid item xs={12}>
                            <Button type='submit' variant="contained" fullWidth>Edit</Button>
                        </Grid>


                    </Grid>
                </form>
            </Container>
        </React.Fragment>
    );
}
export { };
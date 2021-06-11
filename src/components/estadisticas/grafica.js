import React from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Genero from './genero';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    root: {
      maxWidth: 800,
    },
});

export default function Grafica({estadistica}) {
    const classes = useStyles();

    const component = () => {
        switch (estadistica.componente) {
            case "Genero":
                return <Genero />
        }
    }
    


    return(
        <Card className={classes.root}>
            <CardActionArea>

            <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                Usuarios por genero
                </Typography>
                <Divider />
                
                {component()}
        
            </CardContent>
            </CardActionArea>
        </Card>
    )
}
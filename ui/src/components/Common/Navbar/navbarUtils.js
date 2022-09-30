import { makeStyles } from "@material-ui/core/styles";

export const navbarStyles = makeStyles((theme) => ({ 
    offset: theme.mixins.toolbar,
    title: {
      
    },
    logo: {
      flexDirection: 'column',
    },
    sx: {
      flexGrow: 1,
      display: 'flex',
      flexDirection: 'column',
    }
}))
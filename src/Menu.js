import React from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

function MenuComponent() {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const appBarStyle = {
    backgroundColor: "#b8a3d1", // Cambia el color de fondo aquí
  };

  const typographyStyle = {
    flexGrow: 1,
    color: 'black', // Cambia el color del texto aquí
  };

  const buttonStyle = {
    color: 'black', // Cambia el color del texto del botón aquí
  };

  const menuIconStyle = {
    color: 'black', // Cambia el color del icono del menú aquí
  };

  const isLogged = localStorage.getItem('token'); // Verificar si el usuario está logeado

  return (
    <div>
      <AppBar position="static" style={appBarStyle}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={handleClick}
          >
            <MenuIcon style={menuIconStyle} />
          </IconButton>
          <Typography variant="h6" style={typographyStyle}>
            Apolo Kars
          </Typography>
          {isLogged ? (
            <>

<Button color="inherit" component={Link} to="/" style={buttonStyle}>
                Inicio
              </Button>
              <Button color="inherit" component={Link} to="/registroauto" style={buttonStyle}>
                Registrar Autos
              </Button>

              <Button
                color="inherit"
                aria-controls="user-menu"
                aria-haspopup="true"
                onClick={handleClick}
                style={buttonStyle}
              >
                Usuarios
              </Button>
              <Menu
                id="user-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                getContentAnchorEl={null}
              >
                <MenuItem component={Link} to="/registraruser" style={buttonStyle}>
                  Registrar Usuario
                </MenuItem>
                <MenuItem component={Link} to="/verusuario" style={buttonStyle}>
                  Ver Usuarios
                </MenuItem>
              </Menu>


              <Button color="inherit" component={Link} to="/salir" style={buttonStyle}>
                Salir
              </Button>
              {/* Elementos relacionados con los automóviles */}
              
            </>
          ) : (
            <>
              <Button color="inherit" component={Link} to="/registraruser" style={buttonStyle}>
                Registrar Usuario
              </Button>
              <Button color="inherit" component={Link} to="/login" style={buttonStyle}>
                Login
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default MenuComponent;

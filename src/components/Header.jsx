import { NavLink } from "react-router-dom";
import { useAtom, useAtomValue } from "jotai";
import { cityAtom, isAuthAtom, listingsAtom } from "../app/atoms";
import { redirectTo, removeCookie } from "../app/utils";
import hamburgerIcon from "../assets/hamburgerIcon.svg";
import CitySelection from "./CitySelection";
import { buildRequestOptions } from "../app/api";
import { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  MenuItem,
  Box,
  Button,
  Container,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

export default function Header() {
  const isLoggedIn = useAtomValue(isAuthAtom);
  const [city_id, setCity_id] = useAtom(cityAtom);
  const [requestOptions, setRequestOptions] = useState(
    buildRequestOptions("listings", "index")
  );
  const [, setListings] = useAtom(listingsAtom);
  const [anchorEl, setAnchorEl] = useState(null);

  // déconnexion
  const handleLogout = () => {
    removeCookie();
    redirectTo();
  };

  // selection de la ville
  const selectCity = (e) => {
    setCity_id(parseInt(e.target.value));
  };

  // options de la requête
  useEffect(() => {
    const endpoint = city_id ? "index_per_city" : "index";
    setRequestOptions(
      buildRequestOptions("listings", endpoint, { id: city_id })
    );
  }, [city_id]);

  // exécution de la requête
  useEffect(() => {
    fetch(requestOptions.url, requestOptions.options)
      .then((response) => response.json())
      .then((response) => setListings(response))
      .catch((err) => console.error(err));
  }, [requestOptions]);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="lg">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            La Marketplace de l&apos;immo
          </Typography>
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <Button component={NavLink} to="/" color="inherit">
              Accueil
            </Button>
            {!isLoggedIn && (
              <>
                <Button component={NavLink} to="/login" color="inherit">
                  Connexion
                </Button>
                <Button component={NavLink} to="/register" color="inherit">
                  Inscription
                </Button>
              </>
            )}
            {isLoggedIn && (
              <>
                <Button component={NavLink} to="/profile" color="inherit">
                  Mon profile
                </Button>
                <Button component={NavLink} to="/user_settings" color="inherit">
                  Mes informations
                </Button>
                <Button onClick={handleLogout} color="inherit">
                  Se déconnecter
                </Button>
              </>
            )}
          </Box>
          <CitySelection onChange={selectCity} />
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton edge="start" color="inherit" onClick={handleMenuOpen}>
              <MenuIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </Container>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem component={NavLink} to="/" onClick={handleMenuClose}>
          Accueil
        </MenuItem>
        {!isLoggedIn && (
          <>
            <MenuItem component={NavLink} to="/login" onClick={handleMenuClose}>
              Connexion
            </MenuItem>
            <MenuItem component={NavLink} to="/register" onClick={handleMenuClose}>
              Inscription
            </MenuItem>
          </>
        )}
        {isLoggedIn && (
          <>
            <MenuItem component={NavLink} to="/profile" onClick={handleMenuClose}>
              Mon profile
            </MenuItem>
            <MenuItem component={NavLink} to="/user_settings" onClick={handleMenuClose}>
              Mes informations
            </MenuItem>
            <MenuItem onClick={handleLogout}>Se déconnecter</MenuItem>
          </>
        )}
      </Menu>
    </AppBar>
  );
}

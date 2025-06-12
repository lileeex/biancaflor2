import {
  Avatar,
  Box,
  Button,
  Divider,
  IconButton,
  Link,
  Menu,
  Stack,
  Typography,
} from "@mui/material";
import ProfileImage from "assets/profile.jpg";
import IconifyIcon from "components/base/IconifyIcon";
import { MouseEvent, useState } from "react";
import { Fragment } from "react/jsx-runtime";

// Datos del perfil
const profileData = [
  {
    href: "#!",
    title: "My Profile",
    subtitle: "Account Settings",
    icon: "fa:user-circle-o",
    color: "primary.light",
  },
];

const ProfileDropdown = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleOpenDropdown = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Fragment>
      <IconButton sx={{ p: 0, position: "relative" }} onClick={handleOpenDropdown}>
        <Avatar
          alt="Avatar"
          src={ProfileImage}
          slotProps={{
            img: {
              sx: {
                objectFit: "cover",
                position: "absolute",
                top: "40%",
                left: "50%",
                transform: "translate(-50%, -50%) scale(1.5)",
              },
            },
          }}
          sx={{ width: { xs: 40, md: 45, xl: 60 }, height: { xs: 40, md: 45, xl: 60 } }}
        />
      </IconButton>

      {/* Profile Menu Dropdown*/}
      <Menu
        id="profile-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        sx={{
          "& .MuiMenu-paper": {
            width: 280,
            bgcolor: "common.white",
          },
        }}
      >
        <Box p={3}>
          <Typography variant="subtitle1" color="text.primary">
            User Profile
          </Typography>

          {/* Perfil de Naiara Pérez-Rojas */}
          <Stack direction="row" py={2.5} spacing={1.5} alignItems="center">
            <Avatar src={ProfileImage} alt="Profile Image" sx={{ width: 65, height: 65 }} />
            <Box>
              <Typography variant="subtitle2" color="text.primary" fontWeight={600}>
                Naiara Pérez-Rojas
              </Typography>
              <Typography variant="caption" color="textSecondary">
                Engineer
              </Typography>
              <Typography
                variant="subtitle2"
                color="textSecondary"
                display="flex"
                alignItems="center"
                gap={0.5}
              >
                <IconifyIcon icon="majesticons:mail-line" />
                Naiara@biancaflor.com
              </Typography>
            </Box>
          </Stack>

          {/* Perfil de Dalire Cardona */}
          <Stack direction="row" py={2.5} spacing={1.5} alignItems="center">
            <Avatar src={ProfileImage} alt="Profile Image" sx={{ width: 65, height: 65 }} />
            <Box>
              <Typography variant="subtitle2" color="text.primary" fontWeight={600}>
                Dalire Cardona
              </Typography>
              <Typography variant="caption" color="textSecondary">
                Engineer
              </Typography>
              <Typography
                variant="subtitle2"
                color="textSecondary"
                display="flex"
                alignItems="center"
                gap={0.5}
              >
                <IconifyIcon icon="majesticons:mail-line" />
                Dalire@biancaflor.com
              </Typography>
            </Box>
          </Stack>
          {/* Perfil de Yoisse Melgar */}
          <Stack direction="row" py={2.5} spacing={1.5} alignItems="center">
            <Avatar src={ProfileImage} alt="Profile Image" sx={{ width: 65, height: 65 }} />
            <Box>
              <Typography variant="subtitle2" color="text.primary" fontWeight={600}>
                Yoisse Melgar
              </Typography>
              <Typography variant="caption" color="textSecondary">
                Engineer
              </Typography>
              <Typography
                variant="subtitle2"
                color="textSecondary"
                display="flex"
                alignItems="center"
                gap={0.5}
              >
                <IconifyIcon icon="majesticons:mail-line" />
                Yoisse@biancaflor.com
              </Typography>
            </Box>
          </Stack>
          <Divider />

          {profileData.map((profileItem) => (
            <Box key={profileItem.title} sx={{ py: 1.5, px: 0 }}>
              <Link href={profileItem.href}>
                <Stack direction="row" spacing={1.5}>
                  <Stack
                    direction="row"
                    sx={{
                      width: 45,
                      height: 45,
                      bgcolor: "neutral.light",
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: 1.5,
                    }}
                  >
                    <Avatar
                      variant="rounded"
                      sx={{
                        minwidth: 24,
                        height: 24,
                        bgcolor: "transparent",
                      }}
                    >
                      <IconifyIcon icon={profileItem.icon} color={profileItem.color} />
                    </Avatar>
                  </Stack>
                  <div>
                    <Typography
                      variant="subtitle2"
                      fontWeight={600}
                      noWrap
                      sx={{
                        width: 150,
                      }}
                    >
                      {profileItem.title}
                    </Typography>
                    <Typography
                      variant="subtitle2"
                      sx={{
                        width: 150,
                      }}
                      noWrap
                    >
                      {profileItem.subtitle}
                    </Typography>
                  </div>
                </Stack>
              </Link>
            </Box>
          ))}

          <Box mt={1.25}>
            <Button onClick={handleClose} variant="outlined" color="error" fullWidth>
              Logout
            </Button>
          </Box>
        </Box>
      </Menu>
    </Fragment>
  );
};

export default ProfileDropdown;

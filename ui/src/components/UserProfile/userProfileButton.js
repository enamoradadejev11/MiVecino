import React from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import HomeIcon from "@material-ui/icons/Home";
import StarIcon from "@material-ui/icons/Star";
import Typography from "@material-ui/core/Typography";
import { typographyStyles } from "../../utils/stylesUtils";

const UserProfileButton = ({ id, option, handleOpen }) => {
  const typography = typographyStyles();
  const { label, additionalText } = option;

  const calculateIcon = () => {
    switch (id) {
      case "account":
        return <InsertEmoticonIcon />;
      case "address":
        return <HomeIcon />;
      case "favorites":
        return <StarIcon />;
      default:
        return "";
    }
  };

  return (
    <>
      <Stack p={3} alignItems='flex-start' spacing={2}>
        <Button
          variant='outlined'
          startIcon={calculateIcon()}
          onClick={() => {
            handleOpen(id);
          }}
        >
          <Typography className={typography.section_title}>{label}</Typography>
        </Button>
        <Typography>{additionalText}</Typography>
      </Stack>
    </>
  );
};

export default UserProfileButton;

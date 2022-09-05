import React from "react";
import Typography from "@material-ui/core/Typography";
import { Box } from "@material-ui/core";
import { settingsStyles, sections } from "./settingsUtils";
import { Link } from "wouter";

const getStylesFromTitle = (title) => {
  switch (title) {
    case sections.PROFILE:
      return {
        backgroundColor: "rgb(244, 134, 134, 0.85)",
        router: "/perfil",
        img: "/mi_perfil.png",
      };
    case sections.EMPRENDIMIENTOS:
      return {
        backgroundColor: "rgb(255, 154, 39, 0.75)",
        router: "/emprendimientos",
        img: "/mis_emprendimientos.png",
      };
    case sections.FAVORITES:
      return {
        backgroundColor: "rgb(179, 222, 215, 0.85)",
        router: "/favoritos",
        img: "/mis_favoritos.png",
      };
    default:
      return "/";
  }
};

const SettingsSection = ({ title }) => {
  const styles = settingsStyles();
  const stylesByTitle = getStylesFromTitle(title);

  return (
    <>
      <Box
        p={3}
        sx={{ background: stylesByTitle.backgroundColor, height: "100%" }}
      >
        <Box pb={10}>
          <Typography className={styles.section_title}>{title}</Typography>
          <Link href={stylesByTitle.router}>
            <img
              className={styles.section_image}
              src={stylesByTitle.img}
              alt={title}
            />
          </Link>
        </Box>
      </Box>
    </>
  );
};

export default SettingsSection;

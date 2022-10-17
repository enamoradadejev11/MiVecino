import { Button } from "@material-ui/core";
import { useContext } from "react";
import MapContext from "../../context/map/MapContext";
import { generalStyles } from "../../utils/stylesUtils";

const BtnMyLocation = ({ location }) => {
  const styles = generalStyles();
  const { map, isMapReady } = useContext(MapContext);

  const onClick = () => {
    if (isMapReady) {
      map.flyTo({ zoom: 14, center: location });
    }
  };

  return (
    <Button
      variant='contained'
      className={styles.boton}
      onClick={onClick}
      style={{ position: "fixed", top: "20px", right: "20px", zIndex: 999 }}
    >
      Mi ubicacion
    </Button>
  );
};

export default BtnMyLocation;

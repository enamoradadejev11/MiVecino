import { Button } from "@material-ui/core";
import { generalStyles } from "../../utils/stylesUtils";

const BtnLocationRestore = ({ location, map }) => {
  const styles = generalStyles();

  const onClick = () => {
    if (map) {
      map.flyTo({ zoom: 14, center: location });
    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "end" }}>
      <Button variant='contained' className={styles.boton} onClick={onClick}>
        Mi ubicacion
      </Button>
    </div>
  );
};

export default BtnLocationRestore;

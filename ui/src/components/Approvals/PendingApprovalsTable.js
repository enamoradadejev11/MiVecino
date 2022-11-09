import MaterialTable from "material-table";
import React from "react";
import { updateEmprendimientoApproval } from "../Emprendimientos/emprendimientosServices";

const headers = [
  { title: "Nombre", field: "name" },
  { title: "Descripcion", field: "description" },
  { title: "Tipo", field: "type" },
  { title: "Categorias", field: "categories" },
];

const PendingApprovalsTable = ({ data, setData }) => {
  const handleApprove = (event, rowData) => {
    const approved = {
      status: "Approved",
      message: "Su emprendimiento fue aprobado.",
    };
    updateEmprendimientoApproval(rowData.id, approved).then((resp) =>
      setData(resp)
    );
  };

  const handleReject = (event, rowData) => {
    const reject = {
      status: "Rejected",
      message: "Su emprendimiento no fue aprobado.",
    };
    updateEmprendimientoApproval(rowData.id, reject).then((resp) =>
      setData(resp)
    );
  };

  return (
    <MaterialTable
      columns={headers}
      data={data}
      title='Emprendimientos'
      actions={[
        {
          icon: "checkCircleIcon",
          tooltipo: "Aprobar",
          onClick: handleApprove,
        },
        { icon: "clear", tooltipo: "Rechazar", onClick: handleReject },
      ]}
      options={{ actionsColumnIndex: -1 }}
      localization={{
        header: {
          actions: "Acción",
        },
      }}
    />
  );
};

export default PendingApprovalsTable;

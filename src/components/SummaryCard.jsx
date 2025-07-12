import useApi from "../hooks/useAPI";

function SummaryCard({ title, icon: Icon, endpoint }) {
  const { data, loading, error } = useApi(endpoint);
  const totalData = data.length;

  if (loading)
    return <p className="text-center text-gray-400 mt-8">Cargando datos...</p>;
  if (error)
    return (
      <p className="text-center text-red-500 mt-8">
        Error al cargar los datos.
      </p>
    );

  return (
    <div className="relative">
      {/* Icono sobresaliendo (float) en esquina superior izquierda */}
      <div className="absolute -top-2 left-6 bg-[#FA9F42] rounded-xl p-4 shadow-xl drop-shadow-lg z-10">
        <Icon className="icon w-6 h-6 text-white" />
      </div>

      <div className="summary-card-container w-11/12 sm:w-11/12 hover-effect relative p-6 pt-2 bg-white rounded-xl shadow-sm flex flex-col mt-4">
        {/* Contenedor para título y número, alineado a la derecha */}
        <div className="ml-auto text-right mt-4">
          <p className="title text-sm font-medium text-gray-500 mb-2">
            {title}
          </p>
          <div className="total text-3xl font-bold text-gray-800 mb-2">
            {totalData}
          </div>
          <div className="text-sm text-green-600 font-medium border-t-2 w-full">
            recently updated
          </div>
        </div>
      </div>
    </div>
  );
}

export default SummaryCard;

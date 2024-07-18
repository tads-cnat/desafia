import { useForm } from "react-hook-form";

function Dashboard() {
  const { register, handleSubmit } = useForm();

  function conectar(data) {
    console.log(data);
  }

  return (
    <>
      {/* <h1>Dashboard</h1>
      <div className="min-h-screen flex flex-col align-center items-center">
        <form
          className="w-full max-w-sm flex flex-col justify-center items-center gap-y-1"
          onSubmit={handleSubmit(conectar)}
        >
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Servidor</span>
            </div>
            <input
              {...register("ip")}
              type="text"
              placeholder="http://localhost:3000"
              className="input input-bordered w-full"
            />
          </label>
          <div className="w-full flex flex-row-reverse">
            <button className="btn btn-primary">Conectar</button>
          </div>
        </form>
      </div> */}
      <h1>Dashboard</h1>
    </>
  );
}

export default Dashboard;

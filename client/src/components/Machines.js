import React, { useEffect, useState } from "react";
import axios from "axios";
import LineChart from "./LineChart";

const Machines = () => {
  const [machines, setMachines] = useState();
  const [selectedMachine, setSelectedMachine] = useState(false);
  const [selectedMachineId, setSelectedMachineId] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:5000/makinalar");
        const data = res.data;
        setMachines(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const handleRouting = (machine) => {
    const id = machine.makina_id;
    setSelectedMachine(true);
    setSelectedMachineId(id);
    console.log(id);
  };

  return (
    <div>
      {selectedMachine ? (
        <LineChart
          id={selectedMachineId}
          setSelectedMachine={setSelectedMachine}
        />
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            height: "100%",
            backgroundColor: "#f5f5f5",
            padding: "20px",
            borderRadius: "10px",
            boxShadow: "0 0 10px rgba(0,0,0,0.2)",
          }}
        >
          <h1>Makinalar</h1>
          {machines &&
            machines.map((machine) => (
              <button
                style={{
                  width: "90%",
                  height: "70px",
                  backgroundColor: "#3f51b5",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                  margin: "10px",
                }}
                onClick={() => {
                  handleRouting(machine);
                }}
                key={machine.makina_id}
              >
                {machine.makina_adi}
              </button>
            ))}
        </div>
      )}
    </div>
  );
};

export default Machines;

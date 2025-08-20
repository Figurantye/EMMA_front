import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./DepartmentDetails.module.css";
import type { Department, Employee, Position } from "../types";
import api from "../services/api";

const DepartmentDetails: React.FC = () => {
  const { id } = useParams();
  const [department, setDepartment] = useState<Department | null>(null);
  const [position, setPosition] = useState<Position | null>(null);
  const [employee, setEmployee] = useState<Employee[]>([]);
  const [positions, setPositions] = useState<Position[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPositionsModalOpen, setIsPositionsModalOpen] = useState(false);
  const [isPositionModalOpen, setIsUpdPositionModalOpen] = useState(false);
  const navigate = useNavigate();


  const deleteDepartment = () => {
    if (window.confirm('Tem certeza que deseja deletar este funcionário?')) {
      api.delete('/departments/' + id)
        .then(() => {
          navigate('/departments'); // Redireciona automaticamente após apagar
        })
        .catch(err => console.error(id, "Erro ao deletar funcionário:", err));
    }
  };

  useEffect(() => {
    api
      .get(`/departments/${id}`)
      .then((res) => {
        setDepartment(res.data.data);
      })
      .catch((err) => console.error("Erro ao buscar departamento:", err));
  }, [id]);
  useEffect(() => {
    api
      .get(`/employees`)
      .then((res) => {
        if (employee) {
          setEmployee(res.data.data);
        }
      })
      .catch((err) => console.error("Erro ao buscar funcionários:", err));
  }, [id]);
  useEffect(() => {
    api
      .get(`/positions`)
      .then((res) => {
        if (positions) {
          setPositions(res.data.data);
        }
      })
      .catch((err) => console.error("Erro ao buscar cargos:", err));
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    if (department && position) {
      setDepartment({ ...department, [e.target.name]: e.target.value });
      setPosition({ ...position, [e.target.name]: e.target.value });
    }
  };

  const handleSaveDepartment = () => {
    api
      .put(
        `/departments/${department?.id}`,
        department
      )
      .then((res) => {
        console.log("Departamento atualizado com sucesso:", res.data);
        setIsModalOpen(false);
      })
      .catch((err) => console.error("Erro ao atualizar departamento:", err))
  };

  const handleSavePosition = () => {
    api
      .post(`/positions/${department?.id}`, position)
      .then((res) => {
        console.log("Departamento atualizado com sucesso:", res.data);
        setIsModalOpen(false);
      })
      .catch((err) => console.error("Erro ao atualizar departamento:", err))
  };
  const handleUpdatePosition = () => {
    api
      .put(`/positions/${position?.id}`, position)
      .then((res) => {
        console.log("Departamento atualizado com sucesso:", res.data);
        setIsModalOpen(false);
      })
      .catch((err) => console.error("Erro ao atualizar departamento:", err))
  };

  function createModal() {
    setIsPositionsModalOpen(true);
    setIsModalOpen(false);
  }

  if (!department || !employee || !positions)
    return <p>Carregando dados do departamento...</p>;

  return (
    <div className={styles.detailsContainer}>
      <h2>{department?.department}</h2>
      <p>
        <strong>Chave única:</strong> {department.id}
      </p>
      <p>
        <strong>Nome do departemento</strong>: {department.department}
      </p>
      <p>
        <strong>Informação:</strong> {department.description}
      </p>

      <div className={styles.section}>
        <h3>Cargos</h3>
        {positions.map((pos) => {
          if (pos.department) {
            if (pos.department.id == department.id) {
              return (
                <p onClick={() => setIsUpdPositionModalOpen(true)}>
                  {pos.title}
                </p>
              );
            }
          }
        })}
      </div>
      <div className={styles.section}>
        <h3>Funcionários do {department.department}</h3>
        {employee.map((emp) => {
          if (emp.position?.department?.id == department.id) {
            return (
              <p onClick={() => setIsUpdPositionModalOpen}>
                {emp.first_name} {emp.last_name} {emp.position.title}
              </p>
            );
          }
        })}
      </div>
      <div>
        <button
          style={{
            padding: '8px 20px',
            borderRadius: 6,
            background: '#42474e',
            color: '#fff',
            border: 'none',
            fontWeight: 500,
            cursor: 'pointer',
            width: '100%',
        }}
          onClick={() => setIsModalOpen(true)}>
          Editar Departamento
        </button>
      </div>
      <div style={{ marginTop: 16 }}>
                <button
                    onClick={deleteDepartment}
                    className={styles.deleteButton}
                    style={{
                        padding: '8px 20px',
                        borderRadius: 6,
                        background: '#e74c3c',
                        color: '#fff',
                        border: 'none',
                        fontWeight: 500,
                        cursor: 'pointer',
                        width: '100%',
                    }}
                >
                    Deletar Funcionário
                </button>
            </div>

      {isModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <div className={styles.modalActions}>
              <input name="id" value={department.id} type="hidden" />
              <input
                name="department"
                value={department.department}
                onChange={handleChange}
              />
              <textarea
                name="description"
                value={department.description || ""}
                onChange={handleChange}
              />
              <button onClick={() => createModal()}>Criar novo cargo</button>
              <button onClick={handleSaveDepartment}>Salvar</button>
              <button onClick={() => setIsModalOpen(false)}>Cancelar</button>
            </div>
          </div>
        </div>
      )}
      {isPositionsModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <h2>Criar novo cargo</h2>
            <div className={styles.modalActions}>
              <label>Nome</label>
              <input
                name="title"
                value={position?.title}
                onChange={handleChange}
              />
              <label>Descrição</label>
              <textarea
                name="description"
                value={department.description || ""}
                onChange={handleChange}
              />
              <button onClick={handleSavePosition}>Salvar</button>
              <button onClick={() => setIsPositionsModalOpen(false)}>Cancelar</button>
            </div>
          </div>
        </div>
      )}
      {isPositionModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <h2>Editar cargo</h2>
            <div className={styles.modalActions}>
              <label>Nome</label>
              <label>{position?.title}</label>
              <label>Descrição</label>
              <input name="description" value={position?.description} />
              <button onClick={handleUpdatePosition}>Atualizar</button>
              <button onClick={() => setIsUpdPositionModalOpen(false)}>Cancelar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DepartmentDetails;

// import React, { useState, useEffect } from 'react';
// import { Container, Row, Col, Form, Button, Table, Dropdown } from 'react-bootstrap';
// import { FaEllipsisV } from 'react-icons/fa';
// import { Link, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import Base_Url from '../../ApiUrl/ApiUrl';
// import './ClientManagement.css';

// function ClientManagement() {
//   const navigate = useNavigate();
//   const [clients, setClients] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [statusFilter, setStatusFilter] = useState("All");
//   const [formData, setFormData] = useState({ industry: "Client" });

//   // Pagination
//   const [currentPage, setCurrentPage] = useState(1);
//   const [clientsPerPage] = useState(10);

//   useEffect(() => {
//     const fetchClients = async () => {
//       try {
//         const response = await axios.get(`${Base_Url}/client/getAllClient`);
//         setClients(response.data.data);
//       } catch (error) {
//         console.error('Error fetching clients:', error);
//       }
//     };
//     fetchClients();
//   }, []);
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };
  
//   const handleDelete = async (id) => {
//     if (window.confirm("Are you sure you want to delete this client?")) {
//       try {
//         await axios.delete(`${Base_Url}/client/deleteClient/${id}`);
//         setClients(clients.filter(client => client.id !== id));
//       } catch (err) {
//         console.error("Error deleting client", err);
//       }
//     }
//   };

//   // Filtering logic
//   const filteredClients = clients.filter(client => {
//     const matchesSearch = (client.clientName || "").toLowerCase().includes(searchTerm.toLowerCase());
//     const matchesStatus = statusFilter === 'All' || (client.clientStatus || '').toLowerCase() === statusFilter.toLowerCase();
//     return matchesSearch && matchesStatus;
//   });

//   // Pagination logic
//   const indexOfLastClient = currentPage * clientsPerPage;
//   const indexOfFirstClient = indexOfLastClient - clientsPerPage;
//   const currentClients = filteredClients.slice(indexOfFirstClient, indexOfLastClient);
//   const totalPages = Math.ceil(filteredClients.length / clientsPerPage);

//   const getStatusBadgeClass = (status) => {
//     switch ((status || '').toLowerCase()) {
//       case 'active':
//         return 'bg-success text-white px-2 py-1 rounded';
//       case 'inactive':
//         return 'bg-danger text-white px-2 py-1 rounded';
//       default:
//         return 'bg-secondary text-white px-2 py-1 rounded';
//     }
//   };

//   return (
//     <Container fluid className="p-4">
//       <Row className="align-items-center p-3" style={{ backgroundColor: "white", borderRadius: "10px" }}>
//       <Row className="mb-4 align-items-center">
//       <Col>
//     <h4>Client/Supplier</h4>
//   </Col>
  
// </Row>


//         <Row className="mb-4 align-items-center">
//           <Col md={3}>
//             <Form.Control
//               type="search"
//               placeholder="Search clients..."
//               value={searchTerm}
//               onChange={(e) => {
//                 setSearchTerm(e.target.value);
//                 setCurrentPage(1);
//               }}
//             />
//           </Col>

//           <Col md={2}>
//             <Form.Select
//               value={statusFilter}
//               onChange={(e) => {
//                 setStatusFilter(e.target.value);
//                 setCurrentPage(1);
//               }}
//             >
//               <option value="All">All</option>
//               <option value="Active">Active</option>
//               <option value="Inactive">Inactive</option>
//             </Form.Select>
//           </Col>
//           <Col >
//     <Form.Select name="industry" value={formData.industry} onChange={handleChange}>
//       <option value="Client">Client</option>
//       <option value="Sup">Suppliers</option>
//       <option value="Other">Other</option>
//     </Form.Select>
//   </Col>
//           <Col className='me-5 d-flex justify-content-end'>
//             <Link to="/AddClientManagement">
//               <Button id='All_btn' variant="primary">
//                 + Add Client
//               </Button>
//             </Link>
//           </Col>
          
//         </Row>

//         <div className="table-responsive">
//           <Table responsive className="align-middle client-table">
//             <thead>
//               <tr>
//                 <th>SL</th>
//                 <th>Client Name</th>
//                 <th>Contact Person</th>
//                 <th>Email</th>
//                 <th>Status</th>
//                 <th>Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {currentClients.length > 0 ? (
//                 currentClients.map((client, index) => (
//                   <tr key={client._id}>
//                     <td>{indexOfFirstClient + index + 1}</td>
//                     <td>
//                       <div>{client.clientName || 'N/A'}</div>
//                       <small className="text-muted">{client.email || 'No email'}</small>
//                     </td>
//                     <td>
//                       <div>{client.contactName || 'N/A'}</div>
//                       <small className="text-muted">{client.phone || 'No phone'}</small>
//                     </td>
//                     <td>{client.email || 'N/A'}</td>
//                     <td>
//                       <span className={getStatusBadgeClass(client.clientStatus)}>
//                         {client.clientStatus || 'Unknown'}
//                       </span>
//                     </td>
//                     <td>
//                       <Dropdown align="end">
//                         <Dropdown.Toggle variant="link" className="text-dark no-caret">
//                           <FaEllipsisV />
//                         </Dropdown.Toggle>
//                         <Dropdown.Menu>
//                           <Dropdown.Item onClick={() => navigate(`/client-details/${client._id}`)}>
//                             View Details
//                           </Dropdown.Item>
//                           <Dropdown.Item onClick={() => handleDelete(client.id)}>
//                             Delete
//                           </Dropdown.Item>
//                         </Dropdown.Menu>
//                       </Dropdown>
//                     </td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td colSpan="6" className="text-center">No clients found.</td>
//                 </tr>
//               )}
//             </tbody>
//           </Table>
//         </div>

//         {/* Pagination */}
//         {totalPages > 1 && (
//           <div className="d-flex justify-content-center mt-3">
//             <Button
//               variant="light"
//               disabled={currentPage === 1}
//               onClick={() => setCurrentPage(currentPage - 1)}>
//               Previous
//             </Button>
//             <span className="mx-3 align-self-center">
//               Page {currentPage} of {totalPages}
//             </span>
//             <Button
//               variant="light"
//               disabled={currentPage === totalPages}
//               onClick={() => setCurrentPage(currentPage + 1)}
//             >
//               Next
//             </Button>
//           </div>
//         )}
//       </Row>
//     </Container>
//   );
// }

// export default ClientManagement;









import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Table, Dropdown } from 'react-bootstrap';
import { FaEllipsisV } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Base_Url from '../../ApiUrl/ApiUrl';
import './ClientManagement.css';

function ClientManagement() {
  const navigate = useNavigate();
  const [clients, setClients] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [formData, setFormData] = useState({ industry: "Client" });

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [clientsPerPage] = useState(10);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await axios.get( `${Base_Url}`/client/getAllClient);
        setClients(response.data.data);
      } catch (error) {
        console.error('Error fetching clients:', error);
      }
    };
    fetchClients();
  }, []);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this client?")) {
      try {
        await axios.delete(`${Base_Url}/client/deleteClient/${id}`);
        setClients(clients.filter(client => client.id !== id));
      } catch (err) {
        console.error("Error deleting client", err);
      }
    }
  };

  // Filtering logic
  const filteredClients = clients.filter(client => {
    const matchesSearch = (client.clientName || "").toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || (client.clientStatus || '').toLowerCase() === statusFilter.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  // Pagination logic
  const indexOfLastClient = currentPage * clientsPerPage;
  const indexOfFirstClient = indexOfLastClient - clientsPerPage;
  const currentClients = filteredClients.slice(indexOfFirstClient, indexOfLastClient);
  const totalPages = Math.ceil(filteredClients.length / clientsPerPage);

  const getStatusBadgeClass = (status) => {
    switch ((status || '').toLowerCase()) {
      case 'active':
        return 'bg-success text-white px-2 py-1 rounded';
      case 'inactive':
        return 'bg-danger text-white px-2 py-1 rounded';
      default:
        return 'bg-secondary text-white px-2 py-1 rounded';
    }
  };

  return (
    <Container fluid className="p-4">
      <Row className="align-items-center p-3" style={{ backgroundColor: "white", borderRadius: "10px" }}>
      <Row className="mb-4 align-items-center">
      <Col>
    <h4>Client/Supplier</h4>
  </Col>
  
</Row>


        <Row className="mb-4 align-items-center">
          <Col md={3}>
            <Form.Control
              type="search"
              placeholder="Search clients..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
            />
          </Col>

          <Col md={2}>
            <Form.Select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setCurrentPage(1);
              }}
            >
              <option value="All">All</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </Form.Select>
          </Col>
          <Col >
    <Form.Select name="industry" value={formData.industry} onChange={handleChange}>
      <option value="Client">Client</option>
      <option value="Sup">Suppliers</option>
      <option value="Other">Other</option>
    </Form.Select>
  </Col>
          <Col className='me-5 d-flex justify-content-end'>
            <Link to="/AddClientManagement">
              <Button id='All_btn' variant="primary">
                + Add Company
              </Button>
            </Link>
          </Col>
          
        </Row>

        <div className="table-responsive">
          <Table responsive className="align-middle client-table">
            <thead>
              <tr>
                <th>SL</th>
                <th>Client Name</th>
                <th>Contact Person</th>
                <th>Email</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentClients.length > 0 ? (
                currentClients.map((client, index) => (
                  <tr key={client._id}>
                    <td>{indexOfFirstClient + index + 1}</td>
                    <td>
                      <div>{client.clientName || 'N/A'}</div>
                      <small className="text-muted">{client.email || 'No email'}</small>
                    </td>
                    <td>
                      <div>{client.contactName || 'N/A'}</div>
                      <small className="text-muted">{client.phone || 'No phone'}</small>
                    </td>
                    <td>{client.email || 'N/A'}</td>
                    <td>
                      <span className={getStatusBadgeClass(client.clientStatus)}>
                        {client.clientStatus || 'Unknown'}
                      </span>
                    </td>
                    <td>
                      <Dropdown align="end">
                        <Dropdown.Toggle variant="link" className="text-dark no-caret">
                          <FaEllipsisV />
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                          <Dropdown.Item onClick={() => navigate(`/client-details/${client._id}`)}>
                            View Details
                          </Dropdown.Item>
                          <Dropdown.Item onClick={() => handleDelete(client.id)}>
                            Delete
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center">No clients found.</td>
                </tr>
              )}
            </tbody>
          </Table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="d-flex justify-content-center mt-3">
            <Button
              variant="light"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}>
              Previous
            </Button>
            <span className="mx-3 align-self-center">
              Page {currentPage} of {totalPages}
            </span>
            <Button
              variant="light"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(currentPage + 1)}
            >
              Next
            </Button>
          </div>
        )}
      </Row>
    </Container>
  );
}

export default ClientManagement;




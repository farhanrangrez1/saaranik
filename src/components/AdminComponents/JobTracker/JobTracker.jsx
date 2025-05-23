import React, { useState } from "react";
import { Button, Form, Table, Dropdown } from "react-bootstrap";
import {
  FaFilePdf,
  FaUpload,
  FaLink,
  FaClock,
  FaEdit,
  FaTrash,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { MdDeleteOutline } from 'react-icons/md';

function JobTracker() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProject, setSelectedProject] = useState("All Projects");
  const [selectedPriority, setSelectedPriority] = useState("All Priorities");
  const [selectedStatus, setSelectedStatus] = useState("All Status");
  const [selectedStage, setSelectedStage] = useState("All Stages");
  const [selectedJobs, setSelectedJobs] = useState({});

  const jobData = [
    {
      jobNumber: "00001",
      projectName: "Project A",
      brandName: "Brand1",
      subBrand: "SubBrand1",
      flavour: "Flavour1",
      packType: "Type 1",
      packSize: "Size 1ml",
      packCode: "Code1",
      priority: "High",
      status: "In Progress",
      timeLogged: "12h 30m",
      stage: "Production",
    },
    {
      jobNumber: "00002",
      projectName: "Project B",
      brandName: "Brand2",
      subBrand: "SubBrand2",
      flavour: "Flavour2",
      packType: "Type 2",
      packSize: "Size 2ml",
      packCode: "Code2",
      priority: "Medium",
      status: "Review",
      timeLogged: "8h 45m",
      stage: "Home",
    },
    {
      jobNumber: "00003",
      projectName: "Project C",
      brandName: "Brand3",
      subBrand: "SubBrand3",
      flavour: "Flavour3",
      packType: "Type 3",
      packSize: "Size 3ml",
      packCode: "Code3",
      priority: "Low",
      status: "Not Started",
      timeLogged: "0h 0m",
      stage: "Production",
    },
  ];

  const getPriorityClass = (priority) => {
    switch (priority.toLowerCase()) {
      case "high":
        return "text-danger";
      case "medium":
        return "text-warning";
      case "low":
        return "text-success";
      default:
        return "";
    }
  };

  const getStatusClass = (status) => {
    switch (status.toLowerCase()) {
      case "in progress":
        return "bg-warning text-dark";
      case "review":
        return "bg-info text-dark";
      case "not started":
        return "bg-secondary text-white";
      default:
        return "bg-light";
    }
  };

  const handleCheckboxChange = (jobNumber) => {
    setSelectedJobs((prevSelectedJobs) => ({
      ...prevSelectedJobs,
      [jobNumber]: !prevSelectedJobs[jobNumber],
    }));
  };

  const filteredJobs = jobData.filter((job) => {
    const search = searchQuery.toLowerCase();
    const matchesSearch =
      job.jobNumber.toLowerCase().includes(search) ||
      job.projectName.toLowerCase().includes(search) ||
      job.brandName.toLowerCase().includes(search) ||
      job.subBrand.toLowerCase().includes(search) ||
      job.flavour.toLowerCase().includes(search) ||
      job.packType.toLowerCase().includes(search) ||
      job.packSize.toLowerCase().includes(search);

    const matchesProject =
      selectedProject === "All Projects" || job.projectName === selectedProject;
    const matchesPriority =
      selectedPriority === "All Priorities" ||
      job.priority === selectedPriority;
    const matchesStatus =
      selectedStatus === "All Status" || job.status === selectedStatus;
    const matchesStage =
      selectedStage === "All Stages" || job.stage === selectedStage;

    return (
      matchesSearch &&
      matchesProject &&
      matchesPriority &&
      matchesStatus &&
      matchesStage
    );
  });

  return (
    <div
      className="p-4 m-3"
      style={{ backgroundColor: "white", borderRadius: "10px" }}
    >
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="job-title mb-0">Job Tracker</h2>
      </div>

      {/* Filters */}
      <div className="filters d-flex flex-wrap gap-2 mb-4">
        {/* <Form.Control 
          type="search"
          placeholder="Search by Job #, Project Name, Brand, etc..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-grow-1 "
        /> */}

        <Form.Control
          type="search"
          placeholder="Search by Job #, Project Name, Brand, etc..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ width: "250px" }} // ✅ Custom width
          className="search-input"
        />

        <Dropdown>
          <Dropdown.Toggle
            variant="light"
            id="project-dropdown"
            className="custom-dropdown"
          >
            {selectedProject}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item onClick={() => setSelectedProject("All Projects")}>
              All Projects
            </Dropdown.Item>
            <Dropdown.Item onClick={() => setSelectedProject("Project A")}>
              Project A
            </Dropdown.Item>
            <Dropdown.Item onClick={() => setSelectedProject("Project B")}>
              Project B
            </Dropdown.Item>
            <Dropdown.Item onClick={() => setSelectedProject("Project C")}>
              Project C
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>

        <Dropdown>
          <Dropdown.Toggle
            variant="light"
            id="priority-dropdown"
            className="custom-dropdown"
          >
            {selectedPriority}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item
              onClick={() => setSelectedPriority("All Priorities")}
            >
              All Priorities
            </Dropdown.Item>
            <Dropdown.Item onClick={() => setSelectedPriority("High")}>
              High
            </Dropdown.Item>
            <Dropdown.Item onClick={() => setSelectedPriority("Medium")}>
              Medium
            </Dropdown.Item>
            <Dropdown.Item onClick={() => setSelectedPriority("Low")}>
              Low
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>

        <Dropdown>
          <Dropdown.Toggle
            variant="light"
            id="status-dropdown"
            className="custom-dropdown"
          >
            {selectedStatus}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item onClick={() => setSelectedStatus("All Status")}>
              All Status
            </Dropdown.Item>
            <Dropdown.Item onClick={() => setSelectedStatus("In Progress")}>
              In Progress
            </Dropdown.Item>
            <Dropdown.Item onClick={() => setSelectedStatus("Review")}>
              Review
            </Dropdown.Item>
            <Dropdown.Item onClick={() => setSelectedStatus("Not Started")}>
              Not Started
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>

        <Dropdown>
          <Dropdown.Toggle
            variant="light"
            id="stage-dropdown"
            className="custom-dropdown"
          >
            {selectedStage}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item onClick={() => setSelectedStage("All Stages")}>
              All Stages
            </Dropdown.Item>
            <Dropdown.Item onClick={() => setSelectedStage("Production")}>
              Production
            </Dropdown.Item>
            <Dropdown.Item onClick={() => setSelectedStage("Home")}>
              Home
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>

        {/* ❌ Add New Job button removed */}
        {/* ❌ Date Field removed */}
      </div>

      {/* Table */}
      <div
        className="table-responsive"
        style={{ maxHeight: "500px", overflowY: "auto" }}
      >
        <Table hover className="align-middle sticky-header">
          <thead className="bg-light">
            <tr>
              <th>
                <input type="checkbox" />
              </th>
              <th>JobNo</th>
              <th>ProjectName</th>
              <th>Brand</th>
              <th>SubBrand</th>
              <th>Flavour</th>
              <th>PackType</th>
              <th>PackSize</th>
              <th>Priority</th>
              <th>Status</th>
              <th>Stage</th>
              <th>TimeLogged</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredJobs.map((job, index) => (
              <tr key={index}>
                <td>
                  <input
                    type="checkbox"
                    checked={selectedJobs[job.jobNumber] || false}
                    onChange={() => handleCheckboxChange(job.jobNumber)}
                  />
                </td>
                <td>
                  <Link to={"/OvervieJobsTracker"}>{job.jobNumber}</Link>
                </td>
                <td>{job.projectName}</td>
                <td>{job.brandName}</td>
                <td>{job.subBrand}</td>
                <td>{job.flavour}</td>
                <td>{job.packType}</td>
                <td>{job.packSize}</td>
                <td>
                  <span className={getPriorityClass(job.priority)}>
                    {job.priority}
                  </span>
                </td>
                <td>
                  <span
                    className={`badge ${getStatusClass(job.status)} px-2 py-1`}
                  >
                    {job.status}
                  </span>
                </td>
                <td>{job.stage}</td>
                <td>{job.timeLogged}</td>
                <td>
                  <div className="d-flex gap-2">
                    <Button variant="outline-secondary" size="sm">
                      <FaFilePdf />
                    </Button>
                    <Button variant="outline-secondary" size="sm">
                      <FaUpload />
                    </Button>
                    <Button variant="outline-secondary" size="sm">
                      <FaLink />
                    </Button>
                    <Button variant="outline-secondary" size="sm">
                      <FaClock />
                    </Button>
                    <Button variant="outline-secondary" size="sm">
                      <Link to={"/updateJobTracker"}>
                        <FaEdit />
                      </Link>
                    </Button>
                    {/* <Button variant="outline-secondary" size="sm">
                    <MdDeleteOutline />
                    </Button> */}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
}

export default JobTracker;

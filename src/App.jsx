import React, { useState } from "react";
import ResponsibilityChart from "./components/ResponsibilityChart";
import { SERVICE_MODELS, DEPLOYMENT_MODELS } from "./data/cloudModels";

export default function App() {
  const [selectedModels, setSelectedModels] = useState(["OnPrem", "IaaS", "PaaS", "SaaS"]);
  const [selectedDeployment, setSelectedDeployment] = useState("all");

  const toggleModel = (key) => {
    setSelectedModels((prev) =>
      prev.includes(key) ? prev.filter((m) => m !== key) : [...prev, key]
    );
  };

  const filteredDeployments =
    selectedDeployment === "all"
      ? DEPLOYMENT_MODELS
      : DEPLOYMENT_MODELS.filter((d) => d.id === selectedDeployment);

  return (
    <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "24px", fontFamily: "system-ui, sans-serif", color: "#0f172a" }}>
      <h1>Cloud Service & Deployment Model Explorer</h1>
      <p style={{ color: "#475569" }}>
        Toggle cloud service models below to compare shared responsibility layers and operational trade-offs.
      </p>

      <div style={{ display: "flex", gap: "10px", margin: "20px 0", flexWrap: "wrap" }}>
        {Object.keys(SERVICE_MODELS).map((key) => {
          const active = selectedModels.includes(key);
          return (
            <button
              key={key}
              onClick={() => toggleModel(key)}
              style={{
                padding: "8px 16px",
                borderRadius: "20px",
                border: "1px solid #cbd5e1",
                background: active ? "#0f172a" : "#f8fafc",
                color: active ? "#ffffff" : "#0f172a",
                cursor: "pointer",
                fontWeight: "600"
              }}
            >
              {SERVICE_MODELS[key].name}
            </button>
          );
        })}
      </div>

      <div style={{ background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "12px", padding: "20px" }}>
        <ResponsibilityChart selectedModels={selectedModels} />
      </div>

      <h2 style={{ marginTop: "32px" }}>Service Model Comparison Matrix</h2>
      <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
        <thead>
          <tr style={{ borderBottom: "2px solid #cbd5e1" }}>
            <th style={{ padding: "10px" }}>Model</th>
            <th style={{ padding: "10px" }}>Cost Structure</th>
            <th style={{ padding: "10px" }}>Maintenance</th>
            <th style={{ padding: "10px" }}>Customization</th>
            <th style={{ padding: "10px" }}>Examples</th>
          </tr>
        </thead>
        <tbody>
          {selectedModels.map((key) => {
            const m = SERVICE_MODELS[key];
            return (
              <tr key={key} style={{ borderBottom: "1px solid #e2e8f0" }}>
                <td style={{ padding: "10px", fontWeight: "600" }}>{m.name}</td>
                <td style={{ padding: "10px" }}>{m.specs.cost}</td>
                <td style={{ padding: "10px" }}>{m.specs.maintenance}</td>
                <td style={{ padding: "10px" }}>{m.specs.customization}</td>
                <td style={{ padding: "10px", color: "#475569" }}>{m.examples}</td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "36px" }}>
        <h2>Cloud Deployment Models</h2>
        <select
          value={selectedDeployment}
          onChange={(e) => setSelectedDeployment(e.target.value)}
          style={{ padding: "8px 12px", borderRadius: "8px", border: "1px solid #cbd5e1" }}
        >
          <option value="all">Show All Deployment Models</option>
          {DEPLOYMENT_MODELS.map((d) => (
            <option key={d.id} value={d.id}>{d.name}</option>
          ))}
        </select>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "16px", marginTop: "12px" }}>
        {filteredDeployments.map((dep) => (
          <div key={dep.id} style={{ border: "1px solid #e2e8f0", borderRadius: "10px", padding: "16px", background: "#f8fafc" }}>
            <h3 style={{ margin: "0 0 8px 0" }}>{dep.name}</h3>
            <p style={{ fontSize: "14px", margin: "4px 0" }}><strong>Ownership:</strong> {dep.ownership}</p>
            <p style={{ fontSize: "14px", margin: "4px 0" }}><strong>Security:</strong> {dep.security}</p>
            <p style={{ fontSize: "14px", margin: "4px 0" }}><strong>Scalability:</strong> {dep.scalability}</p>
            <p style={{ fontSize: "14px", margin: "4px 0" }}><strong>Best For:</strong> {dep.useCase}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function CertificateTemplate({ data }) {
  return (
    <div
      id="certificate"
      style={{
        width: "800px",
        height: "900px",
        padding: "30px",
        background: "#ffffff",
        color: "#111",
        border: "5px solid #000",
        fontFamily: "Georgia, serif",
        position: "relative"
      }}
    >
      <div
        style={{
          border: "2px solid #000",
          height: "100%",
          padding: "25px"
        }}
      >
        {/* HEADER */}
        <img
          src="/uh-logo.png"
          alt="University Hub"
          style={{
            width: "70px",
            display: "block",
            margin: "0 auto 8px"
          }}
        />

        <h1 style={{ textAlign: "center", fontSize: "34px", letterSpacing: "2px" }}>
          UNIVERSITY HUB
        </h1>

        <p style={{ textAlign: "center", fontSize: "16px", marginTop: "4px" }}>
          Certificate of Contribution
        </p>

        <hr style={{ margin: "20px 0" }} />

        {/* BODY */}
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <p style={{ fontSize: "16px" }}>This is to certify that</p>

          <h2 style={{ fontSize: "30px", margin: "14px 0" }}>
            {data.name}
          </h2>

          <p style={{ fontSize: "16px" }}>
            has successfully contributed to
          </p>

          <p style={{ fontSize: "20px", fontWeight: "bold", marginTop: "8px" }}>
            {data.task}
          </p>

          <p style={{ marginTop: "22px", fontSize: "16px" }}>
            and is hereby recognized as an
          </p>

          <p style={{ fontSize: "18px", fontWeight: "bold", marginTop: "6px" }}>
            {data.level}
          </p>

          <p style={{ marginTop: "22px", fontSize: "14px" }}>
            Contributions: {data.contributions}
          </p>
        </div>

        {/* FOOTER */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "70px"
          }}
        >
          <div>
            <p style={{ fontSize: "14px" }}>Issued By</p>
            <p style={{ fontWeight: "bold", marginTop: "14px" }}>
              University Hub
            </p>
            <p style={{ fontSize: "14px" }}>
              Academic Contributions Program
            </p>
          </div>

          <div style={{ textAlign: "right" }}>
            <p style={{ fontSize: "14px" }}>Certificate ID</p>
            <p style={{ fontFamily: "monospace", marginTop: "14px" }}>
              {data.id}
            </p>
          </div>
        </div>

        <hr style={{ margin: "30px 0" }} />

        <div style={{ textAlign: "center", fontSize: "13px" }}>
          Issued on {new Date().toLocaleDateString()}
          <br />
          University Hub is a registered MSME under Govt. of India
          <br />
          Udyam Registration No: UDYAM-TS-32-0037106
        </div>
      </div>
    </div>
  );
}

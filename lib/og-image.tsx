import React from "react";

export const size = {
  width: 1200,
  height: 630,
};

export function getSharedOGImageJSX() {
  return (
    <div
      style={{
        background: "linear-gradient(to bottom right, #09090b, #030712)",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "sans-serif",
        color: "#f4f4f5",
        padding: "80px",
        position: "relative",
      }}
    >
      {/* Glow effect 1 */}
      <div
        style={{
          position: "absolute",
          top: "-150px",
          left: "-150px",
          width: "500px",
          height: "500px",
          background: "rgba(99, 102, 241, 0.15)",
          borderRadius: "50%",
          filter: "blur(80px)",
          display: "flex",
        }}
      />
      {/* Glow effect 2 */}
      <div
        style={{
          position: "absolute",
          bottom: "-150px",
          right: "-150px",
          width: "500px",
          height: "500px",
          background: "rgba(20, 184, 166, 0.15)",
          borderRadius: "50%",
          filter: "blur(80px)",
          display: "flex",
        }}
      />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          maxWidth: "900px",
          zIndex: 1,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            marginBottom: "24px",
          }}
        >
          <div
            style={{
              width: "12px",
              height: "12px",
              borderRadius: "50%",
              background: "#6366f1",
              boxShadow: "0 0 12px #6366f1",
            }}
          />
          <span
            style={{
              fontSize: "16px",
              fontWeight: "bold",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "#a1a1aa",
            }}
          >
            Portfolio
          </span>
        </div>

        <h1
          style={{
            fontSize: "64px",
            fontWeight: 900,
            letterSpacing: "-0.02em",
            margin: 0,
            color: "#ffffff",
            lineHeight: 1.1,
          }}
        >
          Ayush Kumar Bhadani
        </h1>

        <p
          style={{
            fontSize: "28px",
            color: "#818cf8",
            marginTop: "16px",
            marginBottom: "24px",
            fontWeight: "600",
          }}
        >
          AI/ML Developer & CS Student
        </p>

        <p
          style={{
            fontSize: "22px",
            color: "#a1a1aa",
            lineHeight: 1.5,
            margin: 0,
            maxWidth: "750px",
          }}
        >
          Building high-performance, production-ready AI systems: multi-agent workflows, optimized RAG pipelines, and applied machine learning.
        </p>
      </div>
    </div>
  );
}

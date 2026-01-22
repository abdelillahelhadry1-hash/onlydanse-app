"use client";

export default function Home() {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "2rem",
        textAlign: "center",
        fontFamily: "sans-serif",
      }}
    >
      <h1 style={{ fontSize: "3rem", marginBottom: "1rem" }}>
        OnlyDanse
      </h1>

      <p style={{ fontSize: "1.25rem", marginBottom: "2rem", maxWidth: "600px" }}>
        The world’s first and only global dance platform.
        <br />
        Launching soon — join the movement.
      </p>

      <form
        style={{ display: "flex", gap: "0.5rem" }}
        onSubmit={(e) => {
          e.preventDefault();
          alert("Email captured (placeholder).");
        }}
      >
        <input
          type="email"
          placeholder="Enter your email"
          required
          style={{
            padding: "0.75rem 1rem",
            borderRadius: "6px",
            border: "1px solid #ccc",
            minWidth: "250px",
          }}
        />
        <button
          type="submit"
          style={{
            padding: "0.75rem 1.25rem",
            borderRadius: "6px",
            border: "none",
            background: "black",
            color: "white",
            cursor: "pointer",
          }}
        >
          Notify Me
        </button>
      </form>
    </main>
  );
}

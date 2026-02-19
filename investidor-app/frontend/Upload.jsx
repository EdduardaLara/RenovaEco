import React, { useState, useRef } from "react";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;600;700;800&family=DM+Sans:wght@300;400;500&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --teal:       #1a5c5c;
    --teal-dark:  #0f3d3d;
    --teal-mid:   #256b6b;
    --lime:       #c8d400;
    --lime-light: #dde84a;
    --lime-glow:  rgba(200, 212, 0, 0.18);
    --white:      #f5f9f5;
    --gray:       #8aa8a8;
    --bg:         #0c2e2e;
  }

  body {
    font-family: 'DM Sans', sans-serif;
    background: var(--bg);
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
  }

  .page {
    position: relative;
    width: 100vw;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 40px 20px;
  }

  /* Background decorative blobs */
  .blob {
    position: fixed;
    border-radius: 50%;
    filter: blur(80px);
    opacity: 0.25;
    pointer-events: none;
    z-index: 0;
  }
  .blob-1 {
    width: 500px; height: 500px;
    background: var(--teal-mid);
    top: -100px; left: -100px;
  }
  .blob-2 {
    width: 350px; height: 350px;
    background: var(--lime);
    bottom: -80px; right: -80px;
  }
  .blob-3 {
    width: 200px; height: 200px;
    background: var(--lime);
    top: 40%; left: 60%;
    opacity: 0.10;
  }

  .card {
    position: relative;
    z-index: 1;
    background: linear-gradient(145deg, rgba(26,92,92,0.55), rgba(15,61,61,0.75));
    backdrop-filter: blur(20px);
    border: 1px solid rgba(200,212,0,0.18);
    border-radius: 28px;
    padding: 52px 48px 44px;
    width: 100%;
    max-width: 520px;
    box-shadow: 0 32px 80px rgba(0,0,0,0.45), 0 0 0 1px rgba(255,255,255,0.04);
    animation: fadeUp 0.7s cubic-bezier(.22,.68,0,1.2) both;
  }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(32px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  /* Logo */
  .logo-area {
    display: flex;
    align-items: center;
    gap: 14px;
    margin-bottom: 36px;
  }

  .logo-icon {
    width: 48px;
    height: 48px;
    flex-shrink: 0;
  }

  .logo-text {
    font-family: 'Sora', sans-serif;
    font-size: 1.55rem;
    font-weight: 700;
    color: var(--white);
    letter-spacing: -0.5px;
    line-height: 1;
  }
  .logo-text span {
    color: var(--lime);
  }
  .logo-sub {
    font-size: 0.7rem;
    font-weight: 400;
    color: var(--gray);
    letter-spacing: 1.5px;
    text-transform: uppercase;
    margin-top: 3px;
  }

  /* Heading */
  .heading {
    font-family: 'Sora', sans-serif;
    font-size: 1.6rem;
    font-weight: 800;
    color: var(--white);
    line-height: 1.2;
    margin-bottom: 8px;
  }
  .heading span {
    color: var(--lime);
  }
  .subheading {
    font-size: 0.9rem;
    color: var(--gray);
    margin-bottom: 36px;
    line-height: 1.5;
  }

  /* Drop zone */
  .dropzone {
    border: 2px dashed rgba(200,212,0,0.35);
    border-radius: 18px;
    padding: 36px 24px;
    text-align: center;
    cursor: pointer;
    transition: all 0.25s ease;
    background: rgba(200,212,0,0.04);
    margin-bottom: 28px;
    position: relative;
    overflow: hidden;
  }
  .dropzone:hover, .dropzone.dragging {
    border-color: var(--lime);
    background: var(--lime-glow);
    transform: scale(1.01);
  }
  .dropzone input[type="file"] {
    position: absolute;
    inset: 0;
    opacity: 0;
    cursor: pointer;
    width: 100%;
    height: 100%;
  }

  .dz-icon {
    font-size: 2.4rem;
    margin-bottom: 12px;
    display: block;
    filter: drop-shadow(0 0 12px rgba(200,212,0,0.4));
  }
  .dz-title {
    font-family: 'Sora', sans-serif;
    font-size: 1rem;
    font-weight: 600;
    color: var(--white);
    margin-bottom: 4px;
  }
  .dz-hint {
    font-size: 0.78rem;
    color: var(--gray);
  }
  .dz-filename {
    margin-top: 14px;
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: rgba(200,212,0,0.12);
    border: 1px solid rgba(200,212,0,0.3);
    border-radius: 8px;
    padding: 6px 14px;
    font-size: 0.82rem;
    color: var(--lime-light);
    font-weight: 500;
  }

  /* Button */
  .btn {
    width: 100%;
    padding: 16px;
    border-radius: 14px;
    border: none;
    background: linear-gradient(135deg, var(--lime) 0%, #a8b800 100%);
    color: var(--teal-dark);
    font-family: 'Sora', sans-serif;
    font-size: 1rem;
    font-weight: 700;
    letter-spacing: 0.3px;
    cursor: pointer;
    transition: all 0.2s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    position: relative;
    overflow: hidden;
    box-shadow: 0 8px 24px rgba(200,212,0,0.25);
  }
  .btn:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 14px 32px rgba(200,212,0,0.4);
    background: linear-gradient(135deg, var(--lime-light) 0%, var(--lime) 100%);
  }
  .btn:active:not(:disabled) {
    transform: translateY(0);
  }
  .btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  /* Loading spinner */
  .spinner {
    width: 18px; height: 18px;
    border: 2.5px solid rgba(15,61,61,0.3);
    border-top-color: var(--teal-dark);
    border-radius: 50%;
    animation: spin 0.7s linear infinite;
  }
  @keyframes spin { to { transform: rotate(360deg); } }

  /* Status messages */
  .status {
    margin-top: 18px;
    padding: 12px 16px;
    border-radius: 10px;
    font-size: 0.85rem;
    display: flex;
    align-items: center;
    gap: 10px;
    animation: fadeIn 0.3s ease;
  }
  @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }

  .status.success {
    background: rgba(200,212,0,0.1);
    border: 1px solid rgba(200,212,0,0.3);
    color: var(--lime-light);
  }
  .status.error {
    background: rgba(255,80,80,0.1);
    border: 1px solid rgba(255,80,80,0.3);
    color: #ff9090;
  }

  /* Divider */
  .divider {
    display: flex;
    align-items: center;
    gap: 12px;
    margin: 28px 0 20px;
  }
  .divider::before, .divider::after {
    content: '';
    flex: 1;
    height: 1px;
    background: rgba(255,255,255,0.08);
  }
  .divider span {
    font-size: 0.72rem;
    color: var(--gray);
    text-transform: uppercase;
    letter-spacing: 1.2px;
  }

  /* Info row */
  .info-row {
    display: flex;
    gap: 12px;
  }
  .info-chip {
    flex: 1;
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(255,255,255,0.07);
    border-radius: 10px;
    padding: 10px 12px;
    text-align: center;
  }
  .info-chip .chip-icon { font-size: 1.1rem; }
  .info-chip .chip-label {
    font-size: 0.68rem;
    color: var(--gray);
    margin-top: 3px;
    letter-spacing: 0.5px;
  }
`;

// RenovaEco SVG Logo (simplified recreation)
function LogoSVG() {
  return (
    <svg className="logo-icon" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="24" cy="24" r="22" fill="rgba(200,212,0,0.12)" stroke="rgba(200,212,0,0.3)" strokeWidth="1"/>
      {/* Leaf / wave shapes inspired by the logo */}
      <path d="M14 28 Q20 16 26 24 Q32 32 24 34 Q16 36 14 28Z" fill="#c8d400" opacity="0.9"/>
      <path d="M22 20 Q28 10 34 18 Q38 24 30 26 Q24 28 22 20Z" fill="#1a5c5c" opacity="0.8"/>
      <circle cx="24" cy="26" r="3.5" fill="#c8d400"/>
    </svg>
  );
}

export default function Upload() {
  const [file, setFile]         = useState(null);
  const [loading, setLoading]   = useState(false);
  const [status, setStatus]     = useState(null); // { type: 'success'|'error', msg }
  const [dragging, setDragging] = useState(false);
  const inputRef                = useRef();

  const handleFile = (f) => {
    if (!f) return;
    setFile(f);
    setStatus(null);
  };

  const enviarArquivo = async () => {
    if (!file) {
      setStatus({ type: "error", msg: "Selecione um arquivo Excel antes de continuar." });
      return;
    }

    setLoading(true);
    setStatus(null);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("http://localhost:8000/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.erro || "Erro ao gerar relatório.");
      }

      const blob = await response.blob();
      const url  = window.URL.createObjectURL(blob);
      const a    = document.createElement("a");
      a.href     = url;
      a.download = "relatorio_investidor.xlsx";
      a.click();
      window.URL.revokeObjectURL(url);

      setStatus({ type: "success", msg: "Relatório gerado com sucesso! O download iniciou automaticamente." });
    } catch (e) {
      setStatus({ type: "error", msg: e.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{styles}</style>
      <div className="page">
        {/* Background blobs */}
        <div className="blob blob-1" />
        <div className="blob blob-2" />
        <div className="blob blob-3" />

        <div className="card">
          {/* Logo */}
          <div className="logo-area">
            <LogoSVG />
            <div>
              <div className="logo-text">renova<span>E</span>co</div>
              <div className="logo-sub">Energia Solar Cooperativa</div>
            </div>
          </div>

          {/* Heading */}
          <div className="heading">
            Gerador de<br /><span>Relatório Investidor</span>
          </div>
          <p className="subheading">
            Envie a planilha de cobranças e receba o relatório formatado pronto para repasse.
          </p>

          {/* Drop zone */}
          <div
            className={`dropzone ${dragging ? "dragging" : ""}`}
            onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
            onDragLeave={() => setDragging(false)}
            onDrop={(e) => { e.preventDefault(); setDragging(false); handleFile(e.dataTransfer.files[0]); }}
            onClick={() => inputRef.current?.click()}
          >
            <input
              ref={inputRef}
              type="file"
              accept=".xlsx,.xls"
              onChange={(e) => handleFile(e.target.files[0])}
              onClick={(e) => e.stopPropagation()}
            />
            <span className="dz-icon">📊</span>
            <div className="dz-title">
              {dragging ? "Solte o arquivo aqui" : "Clique ou arraste o arquivo Excel"}
            </div>
            <div className="dz-hint">.xlsx ou .xls • Planilha de cobranças RenovaEco</div>

            {file && (
              <div className="dz-filename">
                ✓ {file.name}
              </div>
            )}
          </div>

          {/* Generate button */}
          <button className="btn" onClick={enviarArquivo} disabled={loading || !file}>
            {loading ? (
              <><div className="spinner" /> Gerando relatório...</>
            ) : (
              <> ⚡ Gerar Relatório</>
            )}
          </button>

          {/* Status */}
          {status && (
            <div className={`status ${status.type}`}>
              {status.type === "success" ? "✅" : "⚠️"}
              {status.msg}
            </div>
          )}

          {/* Info chips */}
          <div className="divider"><span>Informações</span></div>
          <div className="info-row">
            <div className="info-chip">
              <div className="chip-icon">🔒</div>
              <div className="chip-label">Seguro</div>
            </div>
            <div className="info-chip">
              <div className="chip-icon">⚡</div>
              <div className="chip-label">Instantâneo</div>
            </div>
            <div className="info-chip">
              <div className="chip-icon">📄</div>
              <div className="chip-label">XLSX</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

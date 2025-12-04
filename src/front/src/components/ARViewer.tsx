import '@google/model-viewer';

interface ARViewerProps {
  model: string;
}

export function ARViewer({ model }: ARViewerProps) {
  if (!model) {
    return <p>Nenhum modelo foi carregado.</p>;
  }

  const usdz = model.replace(".glb", ".usdz");

  return (
    <div style={{ width: "100%", height: "100vh", background: "#000" }}>
      <model-viewer
        src={`/models/${model}`}
        ios-src={`/models/${usdz}`}
        ar
        ar-modes="scene-viewer quick-look webxr"
        camera-controls
        auto-rotate
        style={{ width: "100%", height: "100%" }}
      ></model-viewer>
    </div>
  );
}
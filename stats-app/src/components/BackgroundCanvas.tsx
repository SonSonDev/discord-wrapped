import React, { useEffect, useRef } from "react";

const colors = {
  "dark": "#514E3F",
  "yellow-1": "#B4AF9B",
  "yellow-2": "#CBC6B0",
};

const BackgroundCanvas: React.FC = (props): JSX.Element => {
  const canvasRef = useRef<HTMLCanvasElement|null>(null);

  const fillBackground = (ctx: CanvasRenderingContext2D) => {
    // ctx.fillStyle = colors["yellow-1"];
    // ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    const step = 5;
    ctx.lineWidth = 0.06;
    ctx.strokeStyle = colors["dark"];
    let i = 1;
    while (i < ctx.canvas.width) {
      ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, ctx.canvas.height); ctx.stroke(); i += step;
    }
    i = 1;
    while (i < ctx.canvas.height) {
      ctx.beginPath(); ctx.moveTo(0, i); ctx.lineTo(ctx.canvas.width, i); ctx.stroke(); i += step;
    }
  };

  const drawCircles = (ctx: CanvasRenderingContext2D) => {
    const circleR = (120 / 216) * Math.min(ctx.canvas.width, ctx.canvas.height);
    const circleDiff = 20;
    const posDiff = -20;
    const pos = [[ -posDiff, -posDiff ], [ ctx.canvas.width + posDiff, ctx.canvas.height + posDiff ]];
    ctx.lineWidth = 0.2;
    ctx.strokeStyle = colors["dark"];
    pos.forEach(([ x, y ]) => {
      [ 0, circleDiff ].forEach((dr) => {
        ctx.beginPath();
        ctx.arc(x, y, circleR + dr, 0, 2 * Math.PI);
        ctx.stroke();
      });
    });
  };

  const drawLines = (ctx: CanvasRenderingContext2D) => {
    const [ w, h ] = [ ctx.canvas.width, ctx.canvas.height ];
    const dim = 1 * Math.min(w, h);
    const posDiff = -120;
    const positions = [
      [ -80, -140, 1 ],
      [ 0, 0, 1 ],
      [ -80, -20, 1 ],
      [ w + 20, h + 80, -1 ],
      [ w + 0, h + 0, -1 ],
      [ w + 140, h + 80, -1 ],
    ];
    ctx.lineWidth = 0.2;
    ctx.strokeStyle = colors["dark"];
    positions.forEach(([ x, y, d ]) => {
      ctx.beginPath();
      x += d * posDiff; y += d * posDiff;
      ctx.moveTo(x, y); ctx.lineTo(x + (d * dim), y + (d * dim));
      ctx.stroke();
    });
  };

  const drawBorder = (ctx: CanvasRenderingContext2D) => {
    const [ w, h ] = [ ctx.canvas.width, ctx.canvas.height ];
    const margin = 40;
    const step = 80; const tipW = 8; const tipH = 5; const dotR = 1.6;
    const d = step - tipW;
    const start = margin + (w - (2 * margin) - Math.floor((w - (2 * margin)) / step) * step) / 2 - (tipW / 2);

    ctx.lineWidth = 2;
    [ 30, h - 40 ].forEach(lineH =>{
      ctx.strokeStyle = colors["dark"];
      ctx.beginPath(); ctx.moveTo(0, lineH); ctx.lineTo(w, lineH); ctx.stroke();
      w;
      let i = start;
      while (i <= w - margin) {
        ctx.fillStyle = colors["dark"];
        ctx.beginPath(); ctx.fillRect(i, lineH, tipW, tipH);

        if (i + step <= w - margin)
          [[ 0.4 * d, 10 ], [ 0.6 * d, 10 ], [ 0.5 * d, 19 ]]
            .forEach(([ x, y ]) => {
              ctx.strokeStyle = colors["dark"]; ctx.fillStyle = colors["dark"];
              ctx.beginPath();
              ctx.arc(i + tipW + x, lineH + y, dotR, 0, 2 * Math.PI);
              ctx.stroke();ctx.fill();
            });
        i += step;
      }
    });
  };

  const draw = (ctx: CanvasRenderingContext2D) => {
    fillBackground(ctx);
    drawBorder(ctx);
    const r = ctx.canvas.width / ctx.canvas.height;
    if (r < 0.7 || r > 1.5) {
      drawCircles(ctx);
      drawLines(ctx);
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        requestAnimationFrame(() => draw(ctx));
        const handleResize = () => {
          ctx.canvas.height = window.innerHeight; ctx.canvas.width = window.innerWidth;
          draw(ctx);
        };
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
      }
    }
  }, []);

  return (
    <canvas className="background-canvas"
            ref={canvasRef}
            {...props} />
  );
};
export default BackgroundCanvas;

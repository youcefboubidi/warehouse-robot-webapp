import React, { useRef, useEffect, useState } from "react";

const CanvasMap = () => {
  const canvasRef = useRef(null);
  const [location, setLocation] = useState("");

  // 1) Poll the JSON file every second for currentShelf
  useEffect(() => {
    let last = "";
    const fetchShelf = async () => {
      try {
        const res = await fetch("../../../public/data.json", {
          cache: "no-store",
        });
        if (!res.ok) throw new Error(res.statusText);
        const json = await res.json();
        const cur = json.robot.currentShelf; // e.g. "tag1", "tag2", ...
        if (cur !== last) {
          last = cur;
          setLocation(cur);
        }
      } catch (err) {
        console.error("Failed to load shelves.json:", err);
      }
    };

    fetchShelf();
    const id = setInterval(fetchShelf, 1000);
    return () => clearInterval(id);
  }, []);

  // 2) Draw whenever `location` changes
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const scale = 4; // px per cm
    const segLeft = 45 * scale; // 180px
    const segMid = 45 * scale; // 180px
    const segRight = 30 * scale; // 120px
    const leftX = (canvas.width - (segLeft + segMid + segRight)) / 2;
    const topY = 100;
    const bottomY = topY + 100 * scale;

    // clear
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // frame style
    ctx.strokeStyle = "#000";
    ctx.lineWidth = 10;
    ctx.lineCap = "butt";

    const totalW = segLeft + segMid + segRight;
    const rightX = leftX + totalW;

    // draw outer rectangle & middle line
    [
      [
        [leftX, topY],
        [rightX, topY],
      ],
      [
        [leftX, topY],
        [leftX, bottomY],
      ],
      [
        [rightX, topY],
        [rightX, bottomY],
      ],
      [
        [leftX, bottomY],
        [rightX, bottomY],
      ],
    ].forEach(([from, to]) => {
      ctx.beginPath();
      ctx.moveTo(from[0], from[1]);
      ctx.lineTo(to[0], to[1]);
      ctx.stroke();
    });

    // middle vertical up to tag box
    const tag1X = leftX + segLeft + segMid / 2;
    ctx.beginPath();
    ctx.moveTo(tag1X, topY);
    ctx.lineTo(tag1X, bottomY - 200);
    ctx.stroke();

    // tag1 box
    const halfW = 125;
    const tagLX = tag1X - halfW;
    const tagRX = tag1X + halfW;
    const tagTop = bottomY - 200;
    [
      [
        [tagLX, tagTop],
        [tagRX, tagTop],
      ],
      [
        [tagLX, tagTop],
        [tagLX, bottomY],
      ],
      [
        [tagRX, tagTop],
        [tagRX, bottomY],
      ],
    ].forEach(([from, to]) => {
      ctx.beginPath();
      ctx.moveTo(from[0], from[1]);
      ctx.lineTo(to[0], to[1]);
      ctx.stroke();
    });

    // draw the red marker at the requested `location`
    const positions = {
      tag1: { x: tag1X, y: topY },
      tag2: { x: rightX, y: bottomY * 0.6 },
      tag3: { x: tag1X * 1.38, y: bottomY },
      tag4: { x: tag1X * 0.62, y: bottomY },
    };

    const pos = positions[location];
    if (pos) {
      ctx.fillStyle = "red";
      ctx.beginPath();
      ctx.arc(pos.x, pos.y, 10, 0, Math.PI * 2);
      ctx.fill();
    }
  }, [location]);

  return <canvas ref={canvasRef} width={600} height={600} />;
};

export default CanvasMap;

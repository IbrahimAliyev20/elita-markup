import React from "react";

interface ProjectVideoProps {
  videoUrl: string;
}

function ProjectVideo({ videoUrl }: ProjectVideoProps) {
  return (
    <div className="w-full h-[300px] md:h-[640px] overflow-hidden">
      <video
        src={videoUrl}
        autoPlay
        muted
        loop
        playsInline
        className="w-full h-full object-cover"
      />
    </div>
  );
}

export default ProjectVideo;

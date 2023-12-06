// jshint esversion:6
import UnderDevelopmentImg from "@/assets/global/underDevelopment.png";

export const ComingSoonPage: React.FC = () => {
    return (
      <div className="h-[80vh] flex flex-col justify-center items-center gap-">
            <img src={UnderDevelopmentImg} className="w-[300px] h-[300px]" alt="Page coming soon..." />

            <p className="mt-2 text-gray-500 text-lg">Page under development....</p>
      </div>
    )
}
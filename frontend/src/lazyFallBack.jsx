import { OrbitProgress } from "react-loading-indicators";

function Fallback() {
  return (
    <div className="h-screen w-screen flex items-center justify-center bg-gray-50">
      <OrbitProgress dense color="#4f46e5" size="medium" />
    </div>
  );
}
export default Fallback;

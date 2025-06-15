import api from "@/network/api_config";
import Navbar from "./components/ui/navbar/Navbar";
import UrlShortener from "./components/ui/shortner_section/UrlShortener";
import ToolInformation from "./components/ui/tool_information/ToolInformation";

export default async function Home() {

  const res = await fetch("http://localhost:8000/api/v1/health", {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json"
    },
    cache: "no-store"
  });

  const data = await res.json();
  console.log("Health response:", data);


  return (
    <div>

      {/* navbar bar  */}
      <Navbar />

      {/* main url shortner content  */}
      <UrlShortener />

      {/* some information section of the tool  */}
      <ToolInformation />

    </div>
  );
}

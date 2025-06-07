import Navbar from "./components/ui/navbar/Navbar";
import UrlShortener from "./components/ui/shortner_section/UrlShortener";
import ToolInformation from "./components/ui/tool_information/ToolInformation";

export default function Home() {
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

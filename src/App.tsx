import { FormSection } from "./components/form-section";
import TemplateResult from "./components/template-result";

function App() {
  return (
    <div className="grid h-lvh w-lvw grid-cols-2 overscroll-none">
      <div className="container relative h-full w-full overflow-auto py-6">
        <FormSection />
      </div>
      <div className="container relative h-full w-full overflow-auto py-6 bg-secondary">
        <TemplateResult />
      </div>
    </div>
  );
}

export default App;
